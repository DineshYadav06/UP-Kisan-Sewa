from app.db.mongo import get_db


async def ensure_indexes() -> None:
    db = get_db()
    await db.users.create_index("email", unique=True)
    await db.crops.create_index("slug", unique=True)
    await db.schemes.create_index("slug", unique=True)
    await db.mandi_prices.create_index(
        [("market", 1), ("commodity", 1), ("variety", 1), ("arrival_date", 1)],
        unique=True,
    )
    await db.otp_codes.create_index("expires_at", expireAfterSeconds=0)
    await db.content_register.create_index([("source_key", 1), ("imported_at", -1)])
    await db.settings.create_index("key", unique=True)
