"""Administrative Dashboard and User Management APIs backed by real database records."""

from typing import Any
from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel

from app.api.v1.auth import get_current_user
from app.db.mongo import get_db

router = APIRouter(prefix="/admin", tags=["admin"])


async def require_admin_user(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    """Ensure the requesting user has administrative permissions."""
    role = current_user.get("role", "")
    if role not in ["super_admin", "admin", "content_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="प्रशासनिक पहुँच अस्वीकृत (Admin authorization required)"
        )
    return current_user


class UserStatusUpdateIn(BaseModel):
    status: str  # active, inactive, pending_verification


@router.get("/dashboard/stats")
async def get_admin_dashboard_stats(admin: dict[str, Any] = Depends(require_admin_user)) -> dict[str, Any]:
    """Retrieve verified real-time database metrics for the admin dashboard."""
    db = get_db()

    total_users = await db.users.count_documents({})
    total_farmers = await db.users.count_documents({"role": "farmer"})
    verified_users = await db.users.count_documents({"email_verified": True})
    unverified_users = await db.users.count_documents({"email_verified": False})
    active_users = await db.users.count_documents({"status": "active"})
    pending_users = await db.users.count_documents({"status": "pending_verification"})
    total_admins = await db.users.count_documents({"role": {"$in": ["super_admin", "admin", "content_admin"]}})

    # Calculate district breakdown
    district_counts: dict[str, int] = {}
    users_cursor = db.users.find({}, {"district": 1})
    all_users = await users_cursor.to_list(length=1000)
    for u in all_users:
        dist = u.get("district") or "अन्य (Other)"
        district_counts[dist] = district_counts.get(dist, 0) + 1

    # Recent registrations (last 5)
    recent_cursor = db.users.find({}, {"password_hash": 0}).sort("created_at", -1).limit(5)
    recent_users = await recent_cursor.to_list(length=5)

    return {
        "status": "success",
        "metrics": {
            "total_registered_users": total_users,
            "total_farmers": total_farmers,
            "verified_users": verified_users,
            "unverified_users": unverified_users,
            "active_users": active_users,
            "pending_users": pending_users,
            "total_admins": total_admins,
        },
        "district_breakdown": district_counts,
        "recent_registrations": [
            {
                "id": str(u.get("_id", "")),
                "full_name": u.get("full_name", ""),
                "email": u.get("email", ""),
                "phone": u.get("phone", ""),
                "district": u.get("district", ""),
                "status": u.get("status", "pending"),
                "email_verified": u.get("email_verified", False),
                "created_at": str(u.get("created_at", ""))
            }
            for u in recent_users
        ]
    }


@router.get("/users")
async def list_admin_users(
    q: str | None = Query(None, description="Search by name, email, phone"),
    district: str | None = Query(None, description="Filter by district"),
    status: str | None = Query(None, description="Filter by account status"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    admin: dict[str, Any] = Depends(require_admin_user)
) -> dict[str, Any]:
    """Retrieve paginated and searchable list of registered users."""
    db = get_db()
    query: dict[str, Any] = {}

    if district:
        query["district"] = district
    if status:
        query["status"] = status
    if q:
        clean_q = q.strip()
        query["$or"] = [
            {"full_name": {"$regex": clean_q, "$options": "i"}},
            {"email": {"$regex": clean_q, "$options": "i"}},
            {"phone": {"$regex": clean_q, "$options": "i"}},
        ]

    total_matching = await db.users.count_documents(query)
    cursor = db.users.find(query, {"password_hash": 0}).sort("created_at", -1).skip(skip).limit(limit)
    users = await cursor.to_list(length=limit)

    return {
        "total": total_matching,
        "skip": skip,
        "limit": limit,
        "users": [
            {
                "id": str(u.get("_id", "")),
                "full_name": u.get("full_name", ""),
                "email": u.get("email", ""),
                "phone": u.get("phone", ""),
                "role": u.get("role", "farmer"),
                "district": u.get("district", ""),
                "tehsil": u.get("tehsil", ""),
                "block": u.get("block", ""),
                "village": u.get("village", ""),
                "pincode": u.get("pincode", ""),
                "email_verified": u.get("email_verified", False),
                "status": u.get("status", "pending_verification"),
                "created_at": str(u.get("created_at", ""))
            }
            for u in users
        ]
    }


@router.get("/users/{user_id}")
async def get_user_detail(user_id: str, admin: dict[str, Any] = Depends(require_admin_user)) -> dict[str, Any]:
    """Retrieve full detail of a specific user."""
    db = get_db()
    user = await db.users.find_one({"_id": user_id}, {"password_hash": 0})
    if not user:
        raise HTTPException(status_code=404, detail="उपयोगकर्ता नहीं मिला (User not found)")
    
    user["id"] = str(user["_id"])
    return user


@router.patch("/users/{user_id}/status")
async def update_user_status(
    user_id: str,
    payload: UserStatusUpdateIn,
    admin: dict[str, Any] = Depends(require_admin_user)
) -> dict[str, Any]:
    """Activate or deactivate user account."""
    db = get_db()
    user = await db.users.find_one({"_id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="उपयोगकर्ता नहीं मिला (User not found)")

    await db.users.update_one({"_id": user_id}, {"$set": {"status": payload.status}})
    return {
        "status": "success",
        "message": f"उपयोगकर्ता स्थिति '{payload.status}' में परिवर्तित की गई।",
        "user_id": user_id
    }
