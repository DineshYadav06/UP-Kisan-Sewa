"""Standalone CLI script for OTP email dispatch.
Can be invoked by FastAPI or Next.js Route Handlers.
"""

import sys
import json
from pathlib import Path

# Ensure backend root is on sys.path
backend_dir = Path(__file__).resolve().parent.parent.parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.services.email_service import send_email_otp


def main():
    if len(sys.argv) < 4:
        print(json.dumps({"status": "error", "message": "Usage: dispatch_email.py <email> <name> <otp>"}))
        sys.exit(1)

    to_email = sys.argv[1].strip()
    farmer_name = sys.argv[2].strip() or "किसान मित्र"
    otp_code = sys.argv[3].strip()

    result = send_email_otp(to_email, farmer_name, otp_code)
    print(json.dumps(result))


if __name__ == "__main__":
    main()
