from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, Field, HttpUrl

ContentStatus = Literal["draft", "in_review", "published", "archived"]


class SourceFields(BaseModel):
    source_name: str
    source_url: str | None = None
    provided_by: str | None = None
    permission_ref: str | None = None
    approved_by: str | None = None
    approved_at: datetime | None = None
    imported_at: datetime | None = None
    status: ContentStatus = "draft"
    updated_at: datetime | None = None


class Paginated(BaseModel):
    items: list[Any]
    total: int
    page: int = 1
    page_size: int = 20


class MessageOut(BaseModel):
    message: str


class ErrorOut(BaseModel):
    detail: str
    code: str | None = None
