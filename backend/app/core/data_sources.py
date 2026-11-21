"""Registry of allowed data sources. base_url values come from env where needed."""

from app.core.config import settings

DATA_SOURCES: dict[str, dict] = {
    "ndat_extension": {
        "key": "ndat_extension",
        "name": "NDUAT Directorate of Extension",
        "owner": "NDUAT",
        "type": "manual_import",
        "base_url": "https://www.nduat.org/",
        "refresh": "manual",
        "used_for": ["advisories", "trainings", "kvk_directory"],
    },
    "ndat_departments": {
        "key": "ndat_departments",
        "name": "NDUAT Departments",
        "owner": "NDUAT",
        "type": "manual_import",
        "base_url": "https://www.nduat.org/",
        "refresh": "manual",
        "used_for": ["crops"],
    },
    "agmarknet": {
        "key": "agmarknet",
        "name": "Agmarknet / data.gov.in",
        "owner": "Government of India",
        "type": "api",
        "base_url": settings.data_gov_mandi_api_url or "https://api.data.gov.in/",
        "refresh": "twice_daily",
        "used_for": ["mandi_prices"],
    },
    "imd": {
        "key": "imd",
        "name": "India Meteorological Department",
        "owner": "IMD",
        "type": "link_only",
        "base_url": "https://mausam.imd.gov.in/",
        "refresh": "daily",
        "used_for": ["weather"],
    },
    "up_agri": {
        "key": "up_agri",
        "name": "UP Agriculture Department",
        "owner": "Govt. of Uttar Pradesh",
        "type": "link_only",
        "base_url": "https://agriculture.up.gov.in/",
        "refresh": "monthly_check",
        "used_for": ["schemes"],
    },
    "agridarshan": {
        "key": "agridarshan",
        "name": "Agri Darshan Uttar Pradesh",
        "owner": "Govt. of Uttar Pradesh",
        "type": "link_only",
        "base_url": "https://agridarshan.up.gov.in/",
        "refresh": "monthly_check",
        "used_for": ["schemes", "announcements"],
    },
    "pm_kisan": {
        "key": "pm_kisan",
        "name": "PM-Kisan",
        "owner": "Government of India",
        "type": "link_only",
        "base_url": "https://pmkisan.gov.in/",
        "refresh": "monthly_check",
        "used_for": ["schemes"],
    },
    "mkisan": {
        "key": "mkisan",
        "name": "mKisan Portal",
        "owner": "Government of India",
        "type": "link_only",
        "base_url": "https://mkisan.gov.in/",
        "refresh": "monthly_check",
        "used_for": ["advisories"],
    },
}


ALLOWED_LINK_SUFFIXES = (".gov.in", ".nic.in", "nduat.org")


def is_allowed_official_url(url: str) -> bool:
    lower = url.lower().strip()
    if not lower.startswith(("https://", "http://")):
        return False
    host = lower.split("/")[2]
    return any(host == s or host.endswith(s) for s in ("gov.in", "nic.in", "nduat.org"))
