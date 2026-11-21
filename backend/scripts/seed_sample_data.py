"""Seed clearly labeled SAMPLE content only. Never invent real farming advice."""

from __future__ import annotations

import asyncio
from datetime import datetime, timedelta, timezone

from app.db.indexes import ensure_indexes
from app.db.mongo import close_mongo, get_db

NOW = datetime.now(timezone.utc)
SAMPLE = "Sample content - pending approval from NDUAT"


async def main() -> None:
    await ensure_indexes()
    db = get_db()

    await db.announcements.delete_many({"permission_ref": "SEED-SAMPLE"})
    await db.crops.delete_many({"permission_ref": "SEED-SAMPLE"})
    await db.schemes.delete_many({"permission_ref": "SEED-SAMPLE"})
    await db.trainings.delete_many({"permission_ref": "SEED-SAMPLE"})
    await db.advisories.delete_many({"permission_ref": "SEED-SAMPLE"})
    await db.kvk_directory.delete_many({"permission_ref": "SEED-SAMPLE"})
    await db.videos.delete_many({"permission_ref": "SEED-SAMPLE"})

    base = {
        "source_name": "NDUAT (sample seed)",
        "source_url": "https://www.nduat.org/",
        "provided_by": "seed_sample_data.py",
        "permission_ref": "SEED-SAMPLE",
        "approved_by": "system-seed",
        "approved_at": NOW,
        "imported_at": NOW,
        "updated_at": NOW,
        "status": "published",
        "created_at": NOW,
    }

    await db.announcements.insert_many(
        [
            {
                **base,
                "title_hi": "पोर्टल विकास सूचना",
                "body_hi": "यू पी किसान सेवा पोर्टल एनडीयूएटी के अंतर्गत विकसित हो रहा है।",
                "show_from": NOW - timedelta(days=1),
                "show_to": NOW + timedelta(days=90),
                "pinned": True,
            },
            {
                **base,
                "title_hi": "सामग्री अनुमोदन आवश्यक",
                "body_hi": "फसल/योजना की वास्तविक सामग्री प्रकाशित करने से पहले एनडीयूएटी नोडल अधिकारी की लिखित अनुमति आवश्यक है।",
                "show_from": NOW,
                "show_to": NOW + timedelta(days=180),
                "pinned": False,
            },
        ]
    )

    await db.crops.insert_many(
        [
            {
                **base,
                "slug": "gehu-sample",
                "name_hi": "गेहूँ (नमूना)",
                "name_en": "Wheat (sample)",
                "category": "cereal",
                "seasons": ["rabi"],
                "zones": ["Eastern Plain Zone"],
                "summary_hi": SAMPLE,
                "sections": [
                    {
                        "key": "varieties",
                        "title_hi": "किस्में",
                        "body_hi": SAMPLE,
                        "images": [],
                    },
                    {
                        "key": "sowing",
                        "title_hi": "बुवाई",
                        "body_hi": SAMPLE,
                        "images": [],
                    },
                ],
            },
            {
                **base,
                "slug": "dhan-sample",
                "name_hi": "धान (नमूना)",
                "name_en": "Paddy (sample)",
                "category": "cereal",
                "seasons": ["kharif"],
                "zones": ["North Eastern Plain Zone"],
                "summary_hi": SAMPLE,
                "sections": [
                    {
                        "key": "varieties",
                        "title_hi": "किस्में",
                        "body_hi": SAMPLE,
                        "images": [],
                    }
                ],
            },
        ]
    )

    await db.schemes.insert_many(
        [
            {
                **base,
                "slug": "pm-kisan-link",
                "name_hi": "पीएम-किसान (लिंक आउट)",
                "department": "Government of India",
                "eligibility_hi": "पात्रता आधिकारिक पोर्टल पर जाँचें। " + SAMPLE,
                "benefits_hi": SAMPLE,
                "documents_required": ["आधार", "बैंक विवरण"],
                "how_to_apply_hi": "केवल आधिकारिक पोर्टल पर आवेदन करें।",
                "official_link": "https://pmkisan.gov.in/",
                "category": "central",
                "source_name": "PM-Kisan",
                "source_url": "https://pmkisan.gov.in/",
            },
            {
                **base,
                "slug": "up-agri-portal-link",
                "name_hi": "उ.प्र. कृषि विभाग सेवाएँ (लिंक आउट)",
                "department": "Agriculture Department, U.P.",
                "eligibility_hi": SAMPLE,
                "benefits_hi": SAMPLE,
                "documents_required": [],
                "how_to_apply_hi": "कृषि दर्शन / कृषि विभाग पोर्टल पर जाएँ।",
                "official_link": "https://agridarshan.up.gov.in/",
                "category": "state",
                "source_name": "Agri Darshan U.P.",
                "source_url": "https://agridarshan.up.gov.in/",
            },
        ]
    )

    await db.trainings.insert_one(
        {
            **base,
            "title_hi": "नमूना किसान प्रशिक्षण",
            "type": "training",
            "start_date": (NOW + timedelta(days=30)).date().isoformat(),
            "end_date": (NOW + timedelta(days=32)).date().isoformat(),
            "venue": "एनडीयूएटी कुमारगंज (नमूना)",
            "district": "Ayodhya",
            "fee": "सूचना अनुमोदन के बाद",
            "seats": 0,
            "registration_required": True,
            "brochure_url": None,
            "contact_office": "Directorate of Extension, NDUAT",
        }
    )

    await db.advisories.insert_one(
        {
            **base,
            "title_hi": "खेती संदेश (नमूना)",
            "body_hi": SAMPLE,
            "crop_ids": [],
            "season": "rabi",
            "zone_or_district": "Eastern U.P.",
            "valid_from": NOW.date().isoformat(),
            "valid_to": (NOW + timedelta(days=14)).date().isoformat(),
            "author": "Sample — pending NDUAT",
            "attachments": [],
        }
    )

    await db.kvk_directory.insert_one(
        {
            **base,
            "name": "KVK Sample — Ayodhya (pending official list)",
            "district": "Ayodhya",
            "address": SAMPLE,
            "office_phone": "",
            "office_email": "",
            "website": "https://www.nduat.org/",
            "services": ["extension"],
        }
    )

    await db.videos.insert_one(
        {
            **base,
            "title_hi": "नमूना वीडियो प्रविष्टि",
            "youtube_id": None,
            "channel_name": "Pending official NDUAT/ICAR channel",
            "crop_ids": [],
            "language": "hi",
            "published_year": None,
            "category": "extension",
            "note": "Embed only after official channel approval. No re-upload.",
        }
    )

    print("Sample data seeded (labeled pending NDUAT approval).")
    await close_mongo()


if __name__ == "__main__":
    asyncio.run(main())
