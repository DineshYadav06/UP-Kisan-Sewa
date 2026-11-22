"""Seed script to populate realistic Uttar Pradesh farmers for testing and admin dashboard."""

import asyncio
import os
import sys
from datetime import datetime, timezone

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.core.security import hash_password
from app.db.mongo import get_db, close_mongo


async def seed_farmers() -> None:
    db = get_db()
    pwd = hash_password("Farmer@123")
    now = datetime.now(timezone.utc).isoformat()

    farmers = [
        {
            "full_name": "Ramkishan Verma",
            "email": "ramkishan.verma@gmail.com",
            "phone": "9839123456",
            "password_hash": pwd,
            "role": "farmer",
            "email_verified": True,
            "status": "active",
            "state": "Uttar Pradesh",
            "division": "Ayodhya",
            "district": "Ayodhya",
            "tehsil": "Milkipur",
            "block": "Amaniganj",
            "village": "Deokali",
            "post_office": "Amaniganj",
            "pincode": "224164",
            "created_at": now,
            "updated_at": now,
        },
        {
            "full_name": "Santosh Kumar Maurya",
            "email": "santosh.maurya@gmail.com",
            "phone": "9415678901",
            "password_hash": pwd,
            "role": "farmer",
            "email_verified": True,
            "status": "active",
            "state": "Uttar Pradesh",
            "division": "Ayodhya",
            "district": "Barabanki",
            "tehsil": "Ram Sanehi Ghat",
            "block": "Bani Kodar",
            "village": "Badosarai",
            "post_office": "Bani Kodar",
            "pincode": "225409",
            "created_at": now,
            "updated_at": now,
        },
        {
            "full_name": "Arvind Pratap Singh",
            "email": "arvind.singh@gmail.com",
            "phone": "9125345678",
            "password_hash": pwd,
            "role": "farmer",
            "email_verified": True,
            "status": "active",
            "state": "Uttar Pradesh",
            "division": "Ayodhya",
            "district": "Ambedkar Nagar",
            "tehsil": "Akbarpur",
            "block": "Katehari",
            "village": "Mijhaura",
            "post_office": "Mijhaura",
            "pincode": "224122",
            "created_at": now,
            "updated_at": now,
        },
        {
            "full_name": "Virendra Kumar",
            "email": "virendra.k@gmail.com",
            "phone": "9918765432",
            "password_hash": pwd,
            "role": "farmer",
            "email_verified": False,
            "status": "pending_verification",
            "state": "Uttar Pradesh",
            "division": "Ayodhya",
            "district": "Sultanpur",
            "tehsil": "Kadipur",
            "block": "Kadipur",
            "village": "Aldemau",
            "post_office": "Kadipur",
            "pincode": "228145",
            "created_at": now,
            "updated_at": now,
        },
        {
            "full_name": "Rajendra Prasad Tiwari",
            "email": "rajendra.tiwari@gmail.com",
            "phone": "9876543210",
            "password_hash": pwd,
            "role": "farmer",
            "email_verified": True,
            "status": "active",
            "state": "Uttar Pradesh",
            "division": "Lucknow",
            "district": "Lucknow",
            "tehsil": "Mohanlalganj",
            "block": "Gosainganj",
            "village": "Amethi",
            "post_office": "Gosainganj",
            "pincode": "226501",
            "created_at": now,
            "updated_at": now,
        },
        {
            "full_name": "Dharmendra Singh Yadav",
            "email": "dharmendra.yadav@gmail.com",
            "phone": "9450123789",
            "password_hash": pwd,
            "role": "farmer",
            "email_verified": True,
            "status": "active",
            "state": "Uttar Pradesh",
            "division": "Varanasi",
            "district": "Varanasi",
            "tehsil": "Pindra",
            "block": "Pindra",
            "village": "Sindhora",
            "post_office": "Pindra",
            "pincode": "221206",
            "created_at": now,
            "updated_at": now,
        },
        {
            "full_name": "Manoj Kumar Shukla",
            "email": "manoj.shukla@gmail.com",
            "phone": "9335123987",
            "password_hash": pwd,
            "role": "farmer",
            "email_verified": True,
            "status": "active",
            "state": "Uttar Pradesh",
            "division": "Gorakhpur",
            "district": "Gorakhpur",
            "tehsil": "Sahjanwa",
            "block": "Sahjanwa",
            "village": "Ghaghsara",
            "post_office": "Sahjanwa",
            "pincode": "273209",
            "created_at": now,
            "updated_at": now,
        }
    ]

    for f in farmers:
        # Delete any stub and insert clean
        await db.users.delete_many({"email": f["email"]})
        await db.users.insert_one(f)

    print(f"Successfully seeded {len(farmers)} farmer accounts with full addresses.")
    await close_mongo()


if __name__ == "__main__":
    asyncio.run(seed_farmers())
