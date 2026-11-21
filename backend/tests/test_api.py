"""Unit tests for Awadh Kisan Seva API and Core Configuration."""

import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.data_sources import DATA_SOURCES, is_allowed_official_url
from app.core.config import settings
from app.data.up_locations import ALL_75_UP_DISTRICTS, UP_DIVISIONS, UP_PINCODE_MAP
from app.core.security import hash_password, verify_password, create_access_token, decode_token
from app.services.email_service import generate_otp_email_html


class TestBackendCore(unittest.TestCase):
    def test_data_sources_registry(self):
        sources = list(DATA_SOURCES.values())
        self.assertIsInstance(sources, list)
        self.assertGreater(len(sources), 0)
        source_keys = [s["key"] for s in sources]
        self.assertIn("ndat_extension", source_keys)
        self.assertIn("agmarknet", source_keys)
        self.assertIn("imd", source_keys)
        self.assertIn("pm_kisan", source_keys)

    def test_official_url_whitelist(self):
        # Valid official UP gov and NDUAT links
        self.assertTrue(is_allowed_official_url("https://agriculture.up.gov.in/schemes"))
        self.assertTrue(is_allowed_official_url("https://agmarknet.gov.in/price"))
        self.assertTrue(is_allowed_official_url("https://www.nduat.org/research"))
        self.assertTrue(is_allowed_official_url("https://kisan.nic.in/login"))
        # Untrusted external or malicious links
        self.assertFalse(is_allowed_official_url("https://fake-agriculture-gov.com"))
        self.assertFalse(is_allowed_official_url("http://untrusted-site.org"))
        self.assertFalse(is_allowed_official_url("javascript:alert(1)"))

    def test_up_statewide_coverage(self):
        # Must have all 75 UP districts
        self.assertEqual(len(ALL_75_UP_DISTRICTS), 75)
        # Must have all 18 UP divisions
        self.assertEqual(len(UP_DIVISIONS), 18)
        # Check Ayodhya and Lucknow in PIN code map
        self.assertIn("224001", UP_PINCODE_MAP)
        self.assertIn("226001", UP_PINCODE_MAP)
        self.assertEqual(UP_PINCODE_MAP["224229"]["district"], "अयोध्या")

    def test_password_hashing(self):
        pw = "MCAET@123"
        hashed = hash_password(pw)
        self.assertTrue(verify_password(pw, hashed))
        self.assertFalse(verify_password("WrongPassword", hashed))

    def test_jwt_token_handling(self):
        payload = {"sub": "user_123", "role": "super_admin", "email": "akhil78026@gmail.com"}
        token = create_access_token(payload)
        decoded = decode_token(token)
        self.assertIsNotNone(decoded)
        self.assertEqual(decoded["sub"], "user_123")
        self.assertEqual(decoded["role"], "super_admin")

    def test_email_template_generation(self):
        html = generate_otp_email_html("489201", "रामेश्वर यादव")
        self.assertIn("489201", html)
        self.assertIn("अवध किसान सेवा", html)
        self.assertIn("10 मिनट", html)

    def test_settings_loaded(self):
        self.assertIsNotNone(settings.mongodb_uri)
        self.assertIsNotNone(settings.mongodb_db)


if __name__ == "__main__":
    unittest.main()
