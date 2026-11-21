"""Password hashing, JWT tokens, and cryptographic security utilities."""

import hashlib
import hmac
import os
import secrets
from datetime import datetime, timedelta
from typing import Any

from jose import jwt
from app.core.config import settings

ALGORITHM = "HS256"
SECRET_KEY = settings.jwt_secret or "awadh-kisan-seva-secure-jwt-secret-key-2026"


def hash_password(password: str) -> str:
    """Hash password using PBKDF2 HMAC SHA-256 with random salt."""
    salt = secrets.token_hex(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100000)
    return f"pbkdf2:sha256:100000${salt}${key.hex()}"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password hash against plain text password."""
    try:
        parts = hashed_password.split("$")
        if len(parts) == 3:
            salt = parts[1]
            stored_key = parts[2]
            computed = hashlib.pbkdf2_hmac("sha256", plain_password.encode("utf-8"), salt.encode("utf-8"), 100000)
            return hmac.compare_digest(stored_key, computed.hex())
        return False
    except Exception:
        return False


def create_access_token(data: dict[str, Any], expires_delta: timedelta | None = None) -> str:
    """Generate signed JWT access token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(hours=24))
    to_encode.update({"exp": expire, "iat": datetime.utcnow()})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> dict[str, Any] | None:
    """Decode and validate JWT access token."""
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        return None
