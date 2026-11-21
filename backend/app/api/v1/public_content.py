from datetime import datetime
from typing import Any

from fastapi import APIRouter, Query

from app.core.data_sources import DATA_SOURCES
from app.db.mongo import get_db

router = APIRouter(tags=["public"])


def _public_filter() -> dict[str, Any]:
    return {"status": "published"}


@router.get("/sources")
async def list_sources() -> list[dict]:
    return list(DATA_SOURCES.values())


@router.get("/announcements")
async def announcements() -> list[dict]:
    db = get_db()
    cursor = (
        db.announcements.find(_public_filter(), {"_id": 0})
        .sort("show_from", -1)
        .limit(20)
    )
    return await cursor.to_list(20)


@router.get("/crops")
async def list_crops(
    q: str | None = None,
    season: str | None = None,
    category: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
) -> dict:
    db = get_db()
    filt: dict[str, Any] = _public_filter()
    if q:
        filt["$or"] = [
            {"name_hi": {"$regex": q, "$options": "i"}},
            {"name_en": {"$regex": q, "$options": "i"}},
        ]
    if season:
        filt["seasons"] = season
    if category:
        filt["category"] = category
    total = await db.crops.count_documents(filt)
    items = (
        await db.crops.find(filt, {"_id": 0})
        .skip((page - 1) * page_size)
        .limit(page_size)
        .to_list(page_size)
    )
    return {"items": items, "total": total, "page": page, "page_size": page_size}


@router.get("/crops/{slug}")
async def crop_detail(slug: str) -> dict:
    db = get_db()
    doc = await db.crops.find_one({**_public_filter(), "slug": slug}, {"_id": 0})
    if not doc:
        return {"detail": "not_found"}
    return doc


@router.get("/schemes")
async def list_schemes(
    q: str | None = None,
    category: str | None = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
) -> dict:
    db = get_db()
    filt: dict[str, Any] = _public_filter()
    if q:
        filt["name_hi"] = {"$regex": q, "$options": "i"}
    if category:
        filt["category"] = category
    total = await db.schemes.count_documents(filt)
    items = (
        await db.schemes.find(filt, {"_id": 0})
        .skip((page - 1) * page_size)
        .limit(page_size)
        .to_list(page_size)
    )
    return {"items": items, "total": total, "page": page, "page_size": page_size}


@router.get("/schemes/{slug}")
async def scheme_detail(slug: str) -> dict:
    db = get_db()
    doc = await db.schemes.find_one({**_public_filter(), "slug": slug}, {"_id": 0})
    return doc or {"detail": "not_found"}


@router.get("/trainings")
async def list_trainings() -> list[dict]:
    db = get_db()
    return await db.trainings.find(_public_filter(), {"_id": 0}).sort("start_date", 1).to_list(50)


@router.get("/advisories")
async def list_advisories() -> list[dict]:
    db = get_db()
    return await db.advisories.find(_public_filter(), {"_id": 0}).sort("valid_from", -1).to_list(50)


@router.get("/videos")
async def list_videos() -> list[dict]:
    db = get_db()
    return await db.videos.find(_public_filter(), {"_id": 0}).to_list(50)


@router.get("/kvk")
async def list_kvk(district: str | None = None) -> list[dict]:
    db = get_db()
    filt: dict[str, Any] = _public_filter()
    if district:
        filt["district"] = {"$regex": district, "$options": "i"}
    return await db.kvk_directory.find(filt, {"_id": 0}).to_list(100)


@router.get("/mandi/prices")
async def mandi_prices(
    district: str | None = None,
    commodity: str | None = None,
    limit: int = Query(50, ge=1, le=200),
) -> dict:
    db = get_db()
    filt: dict[str, Any] = {"state": "Uttar Pradesh"}
    if district:
        filt["district"] = {"$regex": district, "$options": "i"}
    if commodity:
        filt["commodity"] = {"$regex": commodity, "$options": "i"}
    items = (
        await db.mandi_prices.find(filt, {"_id": 0})
        .sort("arrival_date", -1)
        .limit(limit)
        .to_list(limit)
    )
    return {
        "items": items,
        "source_name": DATA_SOURCES["agmarknet"]["name"],
        "source_url": "https://www.data.gov.in/",
        "fetched_note": "Prices show arrival_date; empty if sync not run yet.",
    }


@router.get("/weather/{district}")
async def weather_link(district: str) -> dict:
    return {
        "district": district,
        "mode": "link_only",
        "source_name": DATA_SOURCES["imd"]["name"],
        "source_url": DATA_SOURCES["imd"]["base_url"],
        "message_hi": "मौसम की आधिकारिक जानकारी आईएमडी साइट पर देखें।",
        "message_en": "Check official weather on the IMD website.",
        "fetched_at": datetime.utcnow().isoformat() + "Z",
    }


@router.get("/home")
async def home_payload() -> dict:
    """Aggregated home widgets for AgriDarshan-style landing."""
    db = get_db()
    announcements = (
        await db.announcements.find(_public_filter(), {"_id": 0})
        .sort("show_from", -1)
        .limit(8)
        .to_list(8)
    )
    schemes = await db.schemes.find(_public_filter(), {"_id": 0}).limit(8).to_list(8)
    advisories = (
        await db.advisories.find(_public_filter(), {"_id": 0})
        .sort("valid_from", -1)
        .limit(5)
        .to_list(5)
    )
    trainings = (
        await db.trainings.find(_public_filter(), {"_id": 0})
        .sort("start_date", 1)
        .limit(5)
        .to_list(5)
    )
    mandi = (
        await db.mandi_prices.find({"state": "Uttar Pradesh"}, {"_id": 0})
        .sort("arrival_date", -1)
        .limit(6)
        .to_list(6)
    )
    return {
        "announcements": announcements,
        "schemes": schemes,
        "advisories": advisories,
        "trainings": trainings,
        "mandi_highlights": mandi,
        "official_portals": [
            {"name_hi": "कृषि दर्शन (उ.प्र.)", "url": "https://agridarshan.up.gov.in/"},
            {"name_hi": "कृषि विभाग उ.प्र.", "url": "https://agriculture.up.gov.in/"},
            {"name_hi": "एनडीयूएटी", "url": "https://www.nduat.org/"},
            {"name_hi": "एमकिसान", "url": "https://mkisan.gov.in/"},
            {"name_hi": "पीएम-किसान", "url": "https://pmkisan.gov.in/"},
        ],
    }
