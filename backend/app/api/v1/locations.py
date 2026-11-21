"""Location & PIN Code APIs for Uttar Pradesh (75 Districts, 18 Divisions)."""

from typing import Any
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from app.data.up_locations import UP_DIVISIONS, ALL_75_UP_DISTRICTS, UP_PINCODE_MAP

router = APIRouter(prefix="/locations", tags=["locations"])


class ReverseGeocodeIn(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    accuracy: float | None = None


class ReverseGeocodeOut(BaseModel):
    state: str = "Uttar Pradesh"
    division: str | None = None
    district: str | None = None
    tehsil: str | None = None
    block: str | None = None
    village: str | None = None
    pincode: str | None = None
    post_office: str | None = None
    formatted_address: str | None = None
    source: str = "gps_reverse_geocode"


@router.get("/divisions")
async def get_divisions() -> list[dict[str, Any]]:
    """Return all 18 administrative divisions of Uttar Pradesh."""
    return UP_DIVISIONS


@router.get("/districts")
async def get_districts(division: str | None = None) -> list[dict[str, Any]]:
    """Return all 75 districts of Uttar Pradesh, optionally filtered by division."""
    if division:
        return [d for d in ALL_75_UP_DISTRICTS if division.lower() in d["division"].lower()]
    return ALL_75_UP_DISTRICTS


@router.get("/pincode/{pincode}")
async def get_pincode_info(pincode: str) -> dict[str, Any]:
    """Validate and resolve 6-digit postal PIN code for Uttar Pradesh."""
    clean_pin = pincode.strip()
    if not clean_pin.isdigit() or len(clean_pin) != 6:
        raise HTTPException(status_code=400, detail="पिन कोड 6 अंकों का होना चाहिए (PIN code must be 6 digits)")

    # Known UP PIN code prefixes: 20xxxx to 28xxxx
    first_two = int(clean_pin[:2])
    if first_two < 20 or first_two > 28:
        raise HTTPException(
            status_code=400, 
            detail="यह पिन कोड उत्तर प्रदेश का नहीं प्रतीत होता (PIN Code does not appear to belong to Uttar Pradesh. UP ranges: 20xxxx - 28xxxx)"
        )

    # Check verified map
    if clean_pin in UP_PINCODE_MAP:
        return {
            "pincode": clean_pin,
            "is_valid": True,
            "state": "Uttar Pradesh",
            **UP_PINCODE_MAP[clean_pin]
        }

    # Fallback heuristic for unlisted valid UP PIN code
    matched_district = None
    prefix_3 = clean_pin[:3]
    for dist in ALL_75_UP_DISTRICTS:
        if dist["pincode_prefix"] == prefix_3:
            matched_district = dist
            break

    return {
        "pincode": clean_pin,
        "is_valid": True,
        "state": "Uttar Pradesh",
        "district": matched_district["name_hi"] if matched_district else "उत्तर प्रदेश",
        "division": matched_district["division"] if matched_district else "उत्तर प्रदेश",
        "tehsil": "सदर",
        "post_offices": [f"Post Office ({clean_pin})"],
        "is_verified": bool(matched_district)
    }


@router.get("/pincode/{pincode}/post-offices")
async def get_post_offices(pincode: str) -> list[str]:
    """Retrieve post offices for a 6-digit PIN code."""
    data = await get_pincode_info(pincode)
    return data.get("post_offices", [])


@router.post("/reverse-geocode", response_model=ReverseGeocodeOut)
async def reverse_geocode_location(payload: ReverseGeocodeIn) -> ReverseGeocodeOut:
    """Reverse geocode GPS coordinates to UP administrative location."""
    lat = payload.latitude
    lng = payload.longitude

    # Verify if within approximate bounding box of Uttar Pradesh:
    # Latitude ~ 23.8° N to 30.4° N, Longitude ~ 77.0° E to 84.7° E
    is_up = (23.5 <= lat <= 30.8) and (76.8 <= lng <= 84.9)
    if not is_up:
        return ReverseGeocodeOut(
            state="Outside Uttar Pradesh",
            formatted_address=f"Lat: {lat:.4f}, Lng: {lng:.4f} (Outside UP)",
            source="gps_warning"
        )

    # Nearest district heuristic based on latitude & longitude centers:
    district_name = "अयोध्या"
    division_name = "अयोध्या मण्डल"
    pincode = "224001"
    tehsil = "सदर"

    if lat > 28.0 and lng < 78.5:
        district_name = "मेरठ"
        division_name = "मेरठ मण्डल"
        pincode = "250001"
    elif lat > 28.0 and lng >= 78.5:
        district_name = "बरेली"
        division_name = "बरेली मण्डल"
        pincode = "243001"
    elif 26.5 <= lat <= 27.5 and 80.5 <= lng <= 81.5:
        district_name = "लखनऊ"
        division_name = "लखनऊ मण्डल"
        pincode = "226001"
    elif 26.0 <= lat <= 27.2 and 81.5 <= lng <= 82.5:
        district_name = "अयोध्या"
        division_name = "अयोध्या मण्डल"
        pincode = "224001"
    elif 26.0 <= lat <= 27.0 and 79.8 <= lng <= 80.6:
        district_name = "कानपुर नगर"
        division_name = "कानपुर मण्डल"
        pincode = "208001"
    elif lat < 26.0 and lng > 82.5:
        district_name = "वाराणसी"
        division_name = "वाराणसी मण्डल"
        pincode = "221001"
    elif 26.5 <= lat <= 27.5 and lng > 83.0:
        district_name = "गोरखपुर"
        division_name = "गोरखपुर मण्डल"
        pincode = "273001"
    elif lat < 26.0 and 81.0 <= lng <= 82.5:
        district_name = "प्रयागराज"
        division_name = "प्रयागराज मण्डल"
        pincode = "211001"

    return ReverseGeocodeOut(
        state="Uttar Pradesh",
        division=division_name,
        district=district_name,
        tehsil=tehsil,
        block="सदर ब्लॉक",
        village="ग्राम / वार्ड",
        pincode=pincode,
        post_office="मुख्य डाकघर",
        formatted_address=f"{tehsil}, {district_name}, {division_name}, उत्तर प्रदेश - {pincode}",
        source="gps_detected"
    )
