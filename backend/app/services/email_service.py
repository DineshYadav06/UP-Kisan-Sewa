"""Branded Email Service for Awadh Kisan Seva OTP Delivery & Notifications."""

import email.message
import hashlib
import os
import smtplib
from datetime import datetime
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Any

from app.core.config import settings


def generate_otp_email_html(otp_code: str, farmer_name: str) -> str:
    """Generate responsive branded HTML email template for Awadh Kisan Seva."""
    return f"""<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>अवध किसान सेवा - ईमेल सत्यापन</title>
  <style>
    body {{
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f8faf5;
      margin: 0;
      padding: 0;
      color: #1f2937;
    }}
    .email-container {{
      max-width: 580px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      border: 1px solid #e5e7eb;
    }}
    .header {{
      background: linear-gradient(135deg, #14532d 0%, #15803d 100%);
      padding: 24px 20px;
      text-align: center;
      color: #ffffff;
    }}
    .header h1 {{
      margin: 8px 0 0;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 0.5px;
    }}
    .header p {{
      margin: 4px 0 0;
      font-size: 13px;
      color: #dcfce7;
    }}
    .content {{
      padding: 30px 24px;
      text-align: center;
    }}
    .greeting {{
      font-size: 16px;
      font-weight: 600;
      color: #14532d;
      margin-bottom: 12px;
    }}
    .instruction {{
      font-size: 14px;
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 24px;
    }}
    .otp-box {{
      background: #f0fdf4;
      border: 2px dashed #15803d;
      border-radius: 12px;
      padding: 16px 24px;
      display: inline-block;
      margin: 10px 0 24px;
    }}
    .otp-code {{
      font-size: 32px;
      font-weight: 900;
      letter-spacing: 6px;
      color: #14532d;
      font-family: 'Courier New', Courier, monospace;
    }}
    .expiry-note {{
      font-size: 12px;
      color: #dc2626;
      font-weight: 600;
      margin-bottom: 16px;
    }}
    .security-warning {{
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 12px;
      color: #92400e;
      text-align: left;
      margin-top: 20px;
    }}
    .footer {{
      background: #f8faf5;
      padding: 20px 24px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
    }}
    .footer a {{
      color: #15803d;
      text-decoration: none;
      font-weight: 600;
    }}
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div style="font-size: 36px; line-height: 1;">🌱</div>
      <h1>अवध किसान सेवा (Awadh Kisan Seva)</h1>
      <p>किसान की प्रगति, प्रदेश की समृद्धि • सम्पूर्ण उत्तर प्रदेश</p>
    </div>
    
    <div class="content">
      <div class="greeting">नमस्ते {farmer_name},</div>
      <div class="instruction">
        अवध किसान सेवा पोर्टल पर आपके किसान पंजीकरण हेतु ईमेल सत्यापन कोड (OTP) नीचे दिया गया है:
      </div>
      
      <div class="otp-box">
        <div class="otp-code">{otp_code}</div>
      </div>
      
      <div class="expiry-note">
        ⏰ यह सत्यापन कोड 10 मिनट के लिए मान्य है।
      </div>
      
      <div class="security-warning">
        🔒 <strong>सुरक्षा सूचना:</strong> यह OTP गोपनीय है। कृपया इसे किसी के साथ साझा न करें। अवध किसान सेवा का कोई भी प्रतिनिधि आपसे कभी भी OTP नहीं मांगता।
      </div>
    </div>
    
    <div class="footer">
      <p style="margin: 0 0 6px;">आधिकारिक डिजिटल कृषि सहायता मंच | उ.प्र. कृषि संदर्शिका</p>
      <p style="margin: 0;">सहायता हेल्पलाइन: 1800-180-1551 (टोल-फ्री)</p>
    </div>
  </div>
</body>
</html>"""


def send_email_otp(to_email: str, farmer_name: str, otp_code: str) -> dict[str, Any]:
    """Send branded OTP email via configured SMTP (Gmail / Brevo / Standard SMTP)."""
    html_body = generate_otp_email_html(otp_code, farmer_name)
    subject = f"{otp_code} - अवध किसान सेवा ईमेल सत्यापन कोड (Verification OTP)"

    # Check for SMTP password / app password from settings
    smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USERNAME") or settings.contact_email or "linknrjanduat@gmail.com"
    # Support EMAIL_API_KEY as SMTP password if user pasted 16-digit Google App Password
    smtp_pass = os.environ.get("SMTP_PASSWORD") or settings.email_api_key

    # Strip spaces from 16-character google app password
    if smtp_pass:
        smtp_pass = smtp_pass.replace(" ", "")

    if not smtp_pass:
        # Development / Fallback mode: log clearly
        print(f"[DEV EMAIL LOG] To: {to_email} | OTP: {otp_code} | Note: SMTP credentials not set in .env")
        return {
            "status": "delivered_dev",
            "message": "OTP generated successfully (in test mode).",
            "to": to_email,
            "dev_otp": otp_code
        }

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"Awadh Kisan Seva <{smtp_user}>"
        msg["To"] = to_email

        part_text = MIMEText(f"आपका अवध किसान सेवा OTP है: {otp_code}। यह 10 मिनट के लिए मान्य है।", "plain", "utf-8")
        part_html = MIMEText(html_body, "html", "utf-8")
        msg.attach(part_text)
        msg.attach(part_html)

        if smtp_port == 465:
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10) as server:
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, to_email, msg.as_string())
        else:
            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, to_email, msg.as_string())

        return {"status": "sent", "message": "OTP successfully delivered to email."}
    except Exception as exc:
        print(f"[EMAIL SEND ERROR] {exc}")
        # Return structured delivery failure
        raise RuntimeError(f"ईमेल भेजने में त्रुटि: {str(exc)}")
