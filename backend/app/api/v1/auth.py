"""Authentication, Registration & Email OTP Router for Farmers and Administrators."""

import hashlib
import secrets
from datetime import datetime, timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Header, status
from pydantic import BaseModel, EmailStr, Field

from app.core.security import create_access_token, decode_token, hash_password, verify_password
from app.db.mongo import get_db
from app.services.email_service import send_email_otp

router = APIRouter(prefix="/auth", tags=["auth"])


class RegisterIn(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r"^[6-9]\d{9}$")
    state: str = "Uttar Pradesh"
    division: str | None = None
    district: str
    tehsil: str | None = None
    block: str | None = None
    village: str | None = None
    post_office: str | None = None
    pincode: str = Field(..., min_length=6, max_length=6)
    password: str = Field(..., min_length=6)
    confirm_password: str
    latitude: float | None = None
    longitude: float | None = None
    location_source: str = "manual"


class VerifyOtpIn(BaseModel):
    email: EmailStr
    otp: str = Field(..., min_length=6, max_length=6)


class ResendOtpIn(BaseModel):
    email: EmailStr


class LoginIn(BaseModel):
    identifier: str  # email or phone
    password: str


class AdminLoginIn(BaseModel):
    username_or_email: str
    password: str


def _hash_otp(code: str) -> str:
    return hashlib.sha256(code.encode("utf-8")).hexdigest()


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_farmer(payload: RegisterIn) -> dict[str, Any]:
    """Register a new farmer across any of UP's 75 districts and initiate email OTP."""
    if payload.password != payload.confirm_password:
        raise HTTPException(status_code=400, detail="पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते (Passwords do not match)")

    if not payload.pincode.isdigit() or len(payload.pincode) != 6:
        raise HTTPException(status_code=400, detail="पिन कोड 6 अंकों का होना चाहिए (PIN code must be 6 digits)")

    db = get_db()

    # Check for existing user
    clean_email = payload.email.lower().strip()
    clean_phone = payload.phone.strip()
    existing = await db.users.find_one({"$or": [{"email": clean_email}, {"phone": clean_phone}]})
    if existing:
        if existing.get("email") == clean_email:
            raise HTTPException(status_code=400, detail="यह ईमेल पहले से पंजीकृत है (Email already registered)")
        raise HTTPException(status_code=400, detail="यह मोबाइल नंबर पहले से पंजीकृत है (Mobile number already registered)")

    # Generate 6-digit cryptographically secure OTP
    otp_code = str(secrets.randbelow(900000) + 100000)
    otp_hash = _hash_otp(otp_code)
    now = datetime.utcnow()
    expires_at = now + timedelta(minutes=10)

    # Invalidate any prior OTPs for this email
    await db.otp_codes.delete_many({"email": clean_email})

    # Save OTP record
    await db.otp_codes.insert_one({
        "email": clean_email,
        "otp_hash": otp_hash,
        "attempts": 0,
        "created_at": now,
        "expires_at": expires_at,
    })

    # Create User Record
    password_hash = hash_password(payload.password)
    user_doc = {
        "full_name": payload.full_name.strip(),
        "email": clean_email,
        "phone": clean_phone,
        "password_hash": password_hash,
        "role": "farmer",
        "email_verified": False,
        "status": "pending_verification",
        "state": payload.state,
        "division": payload.division,
        "district": payload.district,
        "tehsil": payload.tehsil,
        "block": payload.block,
        "village": payload.village,
        "post_office": payload.post_office,
        "pincode": payload.pincode,
        "location": {
            "latitude": payload.latitude,
            "longitude": payload.longitude,
            "source": payload.location_source,
            "updated_at": now.isoformat() + "Z" if payload.latitude else None
        },
        "created_at": now,
        "updated_at": now,
    }
    await db.users.insert_one(user_doc)

    # Trigger Email OTP
    delivery = send_email_otp(clean_email, payload.full_name, otp_code)

    return {
        "status": "otp_sent",
        "message": f"सत्यापन कोड (OTP) {clean_email} पर भेज दिया गया है। कृपया 10 मिनट के भीतर सत्यापित करें।",
        "email": clean_email,
        "dev_otp": delivery.get("dev_otp")  # included only when running without live SMTP credentials
    }


@router.post("/verify-otp")
async def verify_otp(payload: VerifyOtpIn) -> dict[str, Any]:
    """Verify email OTP and set account status to pending admin approval."""
    clean_email = payload.email.lower().strip()
    clean_otp = payload.otp.strip()

    db = get_db()
    otp_record = await db.otp_codes.find_one({"email": clean_email})

    if not otp_record:
        raise HTTPException(status_code=400, detail="सत्यापन कोड नहीं मिला अथवा समाप्त हो चुका है (OTP not found or expired)")

    if otp_record.get("expires_at") < datetime.utcnow():
        await db.otp_codes.delete_one({"_id": otp_record["_id"]})
        raise HTTPException(status_code=400, detail="यह OTP समाप्त हो गया है। कृपया नया OTP मांगें (OTP has expired)")

    if otp_record.get("attempts", 0) >= 5:
        await db.otp_codes.delete_one({"_id": otp_record["_id"]})
        raise HTTPException(status_code=400, detail="अधिकतम 5 प्रयास पूरे हो चुके हैं। कृपया पुनः OTP मांगें (Too many invalid attempts)")

    if _hash_otp(clean_otp) != otp_record["otp_hash"]:
        await db.otp_codes.update_one({"_id": otp_record["_id"]}, {"$inc": {"attempts": 1}})
        remaining = 4 - otp_record.get("attempts", 0)
        raise HTTPException(status_code=400, detail=f"गलत OTP कोड दर्ज किया गया। शेष प्रयास: {remaining}")

    # Mark user as verified
    await db.users.update_one(
        {"email": clean_email},
        {"$set": {"email_verified": True, "status": "approved", "verified_at": datetime.utcnow()}}
    )
    await db.otp_codes.delete_one({"_id": otp_record["_id"]})

    return {
        "status": "verified",
        "message": "ईमेल सफलतापूर्वक सत्यापित हुआ! अब आप अवध किसान सेवा पोर्टल पर लॉगिन कर सकते हैं।"
    }


@router.post("/resend-otp")
async def resend_otp(payload: ResendOtpIn) -> dict[str, Any]:
    """Resend email verification OTP with 60s cooldown."""
    clean_email = payload.email.lower().strip()
    db = get_db()

    user = await db.users.find_one({"email": clean_email})
    if not user:
        raise HTTPException(status_code=404, detail="उपयोगकर्ता नहीं मिला (User not found)")

    recent = await db.otp_codes.find_one({"email": clean_email})
    if recent and (datetime.utcnow() - recent["created_at"]).total_seconds() < 60:
        remaining = int(60 - (datetime.utcnow() - recent["created_at"]).total_seconds())
        raise HTTPException(status_code=429, detail=f"कृपया {remaining} सेकंड प्रतीक्षा करें (Please wait {remaining} seconds before resending)")

    otp_code = str(secrets.randbelow(900000) + 100000)
    now = datetime.utcnow()
    await db.otp_codes.delete_many({"email": clean_email})
    await db.otp_codes.insert_one({
        "email": clean_email,
        "otp_hash": _hash_otp(otp_code),
        "attempts": 0,
        "created_at": now,
        "expires_at": now + timedelta(minutes=10)
    })

    delivery = send_email_otp(clean_email, user.get("full_name", "किसान मित्र"), otp_code)
    return {
        "status": "resent",
        "message": "नया OTP कोड आपके ईमेल पर प्रेषित कर दिया गया है।",
        "dev_otp": delivery.get("dev_otp")
    }


@router.post("/login")
async def login(payload: LoginIn) -> dict[str, Any]:
    """Farmer and General User Login."""
    ident = payload.identifier.strip().lower()
    db = get_db()
    user = await db.users.find_one({"$or": [{"email": ident}, {"phone": ident}]})

    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="अमान्य मोबाइल/ईमेल अथवा गलत पासवर्ड")

    if not user.get("email_verified", False):
        raise HTTPException(status_code=403, detail="ईमेल सत्यापन लंबित है। कृपया पंजीकरण के दौरान भेजे गए OTP से सत्यापित करें।")

    token = create_access_token({"sub": str(user["_id"]), "email": user["email"], "role": user.get("role", "farmer")})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "full_name": user.get("full_name"),
            "email": user.get("email"),
            "role": user.get("role"),
            "district": user.get("district")
        }
    }


@router.post("/admin/login")
async def admin_login(payload: AdminLoginIn) -> dict[str, Any]:
    """Dedicated Super Admin Login API for Footer /admin/login."""
    ident = payload.username_or_email.strip().lower()
    db = get_db()
    admin = await db.users.find_one({"$or": [{"email": ident}, {"username": ident}]})

    if not admin or not verify_password(payload.password, admin.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="अमान्य व्यवस्थापक क्रेडेंशियल (Invalid Admin Credentials)")

    if admin.get("role") not in ["super_admin", "admin", "content_admin"]:
        raise HTTPException(status_code=403, detail="प्रशासनिक पहुँच अस्वीकृत - केवल अधिकृत व्यवस्थापक लॉगिन कर सकते हैं")

    token = create_access_token({"sub": str(admin["_id"]), "email": admin["email"], "role": admin.get("role")})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "full_name": admin.get("full_name", "Akhil Yadav"),
            "email": admin.get("email"),
            "role": admin.get("role")
        }
    }
