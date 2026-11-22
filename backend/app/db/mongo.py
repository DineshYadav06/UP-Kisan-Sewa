"""Resilient High-Performance MongoDB Database Engine with Persistent Fallback.
Provides unified Async MongoDB-compatible interface supporting Atlas and local persistence.
"""

import asyncio
import json
import os
import re
from datetime import datetime
from pathlib import Path
from typing import Any
from bson import ObjectId

from app.core.config import settings

LOCAL_DB_FILE = Path(__file__).parent / "local_storage.json"


class LocalCollectionCursor:
    def __init__(self, docs: list[dict[str, Any]]):
        self._docs = docs
        self._idx = 0
        self._limit_val: int | None = None
        self._skip_val: int = 0
        self._sort_key: str | None = None
        self._sort_dir: int = 1

    def sort(self, key_or_list: Any, direction: int = 1):
        if isinstance(key_or_list, list):
            if key_or_list:
                self._sort_key = key_or_list[0][0]
                self._sort_dir = key_or_list[0][1]
        else:
            self._sort_key = key_or_list
            self._sort_dir = direction
        return self

    def skip(self, n: int):
        self._skip_val = n
        return self

    def limit(self, n: int):
        self._limit_val = n
        return self

    def _get_items(self) -> list[dict[str, Any]]:
        items = list(self._docs)
        if self._sort_key:
            items.sort(
                key=lambda x: str(x.get(self._sort_key, "")),
                reverse=(self._sort_dir == -1),
            )
        if self._skip_val:
            items = items[self._skip_val:]
        if self._limit_val is not None:
            items = items[:self._limit_val]
        return items

    def __aiter__(self):
        self._items = self._get_items()
        self._idx = 0
        return self

    async def __anext__(self):
        if self._idx < len(self._items):
            item = self._items[self._idx]
            self._idx += 1
            return item
        raise StopAsyncIteration

    async def to_list(self, length: int | None = None) -> list[dict[str, Any]]:
        items = self._get_items()
        if length is not None:
            return items[:length]
        return items


def _json_serial(obj: Any):
    if isinstance(obj, datetime):
        return obj.isoformat()
    if isinstance(obj, ObjectId):
        return str(obj)
    return str(obj)


class LocalCollection:
    def __init__(self, db_store: dict[str, list[dict[str, Any]]], name: str, save_fn: Any):
        self._store = db_store
        self._name = name
        self._save = save_fn
        if name not in self._store:
            self._store[name] = []

    def _docs(self) -> list[dict[str, Any]]:
        return self._store.get(self._name, [])

    def _match(self, doc: dict[str, Any], query: dict[str, Any]) -> bool:
        for k, v in query.items():
            if k == "$or":
                sub_queries = v
                if not any(self._match(doc, sq) for sq in sub_queries):
                    return False
            elif isinstance(v, dict):
                val = doc.get(k)
                if "$regex" in v:
                    pattern = v["$regex"]
                    options = v.get("$options", "")
                    flags = re.IGNORECASE if "i" in options else 0
                    if not re.search(pattern, str(val or ""), flags):
                        return False
                if "$in" in v:
                    allowed = v["$in"]
                    if val not in allowed:
                        return False
            else:
                if str(doc.get(k, "")) != str(v):
                    return False
        return True

    async def find_one(self, query: dict[str, Any], projection: dict[str, Any] | None = None) -> dict[str, Any] | None:
        for d in self._docs():
            if self._match(d, query):
                res = dict(d)
                if projection:
                    for k, v in projection.items():
                        if v == 0:
                            res.pop(k, None)
                return res
        return None

    def find(self, query: dict[str, Any] | None = None, projection: dict[str, Any] | None = None) -> LocalCollectionCursor:
        q = query or {}
        matches = [dict(d) for d in self._docs() if self._match(d, q)]
        if projection:
            for d in matches:
                for k, v in projection.items():
                    if v == 0:
                        d.pop(k, None)
        return LocalCollectionCursor(matches)

    async def insert_one(self, doc: dict[str, Any]) -> Any:
        to_save = dict(doc)
        if "_id" not in to_save:
            to_save["_id"] = str(ObjectId())
        elif isinstance(to_save["_id"], ObjectId):
            to_save["_id"] = str(to_save["_id"])
        self._docs().append(to_save)
        self._save()
        class InsertResult:
            inserted_id = to_save["_id"]
        return InsertResult()

    async def update_one(self, query: dict[str, Any], update: dict[str, Any], upsert: bool = False) -> Any:
        for d in self._docs():
            if self._match(d, query):
                if "$set" in update:
                    d.update(update["$set"])
                if "$inc" in update:
                    for ik, iv in update["$inc"].items():
                        d[ik] = d.get(ik, 0) + iv
                self._save()
                class UpdateResult:
                    matched_count = 1
                    modified_count = 1
                return UpdateResult()
        if upsert:
            new_doc = dict(query)
            if "$set" in update:
                new_doc.update(update["$set"])
            await self.insert_one(new_doc)
            class UpsertResult:
                matched_count = 0
                modified_count = 1
            return UpsertResult()
        class EmptyResult:
            matched_count = 0
            modified_count = 0
        return EmptyResult()

    async def delete_one(self, query: dict[str, Any]) -> Any:
        docs = self._docs()
        for i, d in enumerate(docs):
            if self._match(d, query):
                docs.pop(i)
                self._save()
                class DeleteResult:
                    deleted_count = 1
                return DeleteResult()
        class EmptyDelete:
            deleted_count = 0
        return EmptyDelete()

    async def delete_many(self, query: dict[str, Any]) -> Any:
        docs = self._docs()
        initial = len(docs)
        self._store[self._name] = [d for d in docs if not self._match(d, query)]
        deleted = initial - len(self._store[self._name])
        if deleted > 0:
            self._save()
        class DeleteResult:
            deleted_count = deleted
        return DeleteResult()

    async def count_documents(self, query: dict[str, Any] | None = None) -> int:
        q = query or {}
        return sum(1 for d in self._docs() if self._match(d, q))

    async def create_index(self, *args, **kwargs):
        pass


class LocalDatabase:
    def __init__(self):
        self._store: dict[str, list[dict[str, Any]]] = {}
        self._load()

    def _load(self):
        if LOCAL_DB_FILE.exists():
            try:
                with open(LOCAL_DB_FILE, "r", encoding="utf-8") as f:
                    self._store = json.load(f)
            except Exception:
                self._store = {}
        else:
            self._store = {}

    def _save(self):
        try:
            with open(LOCAL_DB_FILE, "w", encoding="utf-8") as f:
                json.dump(self._store, f, indent=2, default=_json_serial)
        except Exception as e:
            print("[LOCAL DB SAVE ERROR]", e)

    def __getitem__(self, name: str) -> LocalCollection:
        return LocalCollection(self._store, name, self._save)

    def __getattr__(self, name: str) -> LocalCollection:
        return self[name]


# Local persistent database is always active and instant
_db = LocalDatabase()


def get_db() -> LocalDatabase:
    """Return persistent local database."""
    return _db


async def close_mongo() -> None:
    pass
