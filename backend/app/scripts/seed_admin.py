"""Seed script to bootstrap Super Admin account for Akhil Yadav."""

import asyncio
import os
import sys
from datetime import datetime

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.core.config import settings
from app.core.security import hash_password
from app.db.mongo import get_db, close_mongo


async def seed_super_admin() -> None:
    db = get_db()
    admin_email = settings.admin_email or "akhil78026@gmail.com"
    raw_password = os.environ.get("ADMIN_INITIAL_PASSWORD") or settings.admin_initial_password or "MCAET@123"

    password_hash = hash_password(raw_password)
    admin_doc = {
        "full_name": "Akhil Yadav",
        "username": "akhilyadav",
        "email": admin_email.lower(),
        "phone": "9794945167",
        "password_hash": password_hash,
        "role": "super_admin",
        "email_verified": True,
        "status": "approved",
        "designation": "Lead Developer & System Architect",
        "institution": "MCAET, NDUAT",
        "state": "Uttar Pradesh",
        "district": "अयोध्या",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }

    result = await db.users.update_one(
        {"email": admin_email.lower()},
        {"$set": admin_doc},
        upsert=True
    )
    print(f"[SEED SUCCESS] Super Admin account ensured for {admin_email} with role super_admin.")
    await close_mongo()


if __name__ == "__main__":
    asyncio.run(seed_super_admin())
