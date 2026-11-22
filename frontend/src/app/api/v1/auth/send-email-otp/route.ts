import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { loadDB, saveDB, hashOtp, sendOtpEmail } from "@/lib/server-store";

const FASTAPI_URL = "http://127.0.0.1:8000/api/v1/auth/send-email-otp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cleanEmail = (body.email || "").trim().toLowerCase();
    const fullName = (body.full_name || "").trim() || "किसान मित्र";

    if (!cleanEmail || !cleanEmail.includes("@") || !cleanEmail.includes(".")) {
      return NextResponse.json({ detail: "कृपया एक मान्य ईमेल पता दर्ज करें।" }, { status: 400 });
    }

    // Attempt proxy to live FastAPI backend first
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(FASTAPI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, full_name: fullName }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
      if (res.status === 400 || res.status === 429) {
        const errData = await res.json();
        return NextResponse.json(errData, { status: res.status });
      }
    } catch (proxyErr) {
      // Backend offline or timeout, proceed with local server-store handler
    }

    const store = loadDB();
    if (!store.users) store.users = [];
    if (!store.email_verifications) store.email_verifications = [];

    // Check if already registered & verified
    const existingUser = store.users.find(
      (u: any) => u.email?.toLowerCase() === cleanEmail && u.email_verified === true
    );
    if (existingUser) {
      return NextResponse.json(
        { detail: "यह ईमेल पहले से पंजीकृत है। कृपया लॉगिन करें। (Email is already registered. Please login)" },
        { status: 400 }
      );
    }

    // Cooldown check (45 seconds)
    const now = Date.now();
    const recent = store.email_verifications.find(
      (r: any) => r.email?.toLowerCase() === cleanEmail && !r.verified
    );
    if (recent && recent.created_at) {
      const deltaSec = (now - new Date(recent.created_at).getTime()) / 1000;
      if (deltaSec < 45) {
        const remaining = Math.ceil(45 - deltaSec);
        return NextResponse.json(
          { detail: `कृपया ${remaining} सेकंड प्रतीक्षा करें (Please wait ${remaining}s before resending OTP)` },
          { status: 429 }
        );
      }
    }

    // Generate 6-digit cryptographically secure OTP
    const otpInt = crypto.randomInt(100000, 999999);
    const otpCode = otpInt.toString();
    const otpHash = hashOtp(otpCode);

    // Filter out old records for this email
    store.email_verifications = store.email_verifications.filter(
      (r: any) => r.email?.toLowerCase() !== cleanEmail
    );

    store.email_verifications.push({
      email: cleanEmail,
      otp_hash: otpHash,
      attempts: 0,
      verified: false,
      created_at: new Date(now).toISOString(),
      expires_at: new Date(now + 5 * 60 * 1000).toISOString(),
    });

    saveDB(store);

    // Dispatch real email via smtplib
    const delivery = await sendOtpEmail(cleanEmail, fullName, otpCode);

    return NextResponse.json({
      status: "otp_sent",
      message: `सत्यापन कोड (OTP) ${cleanEmail} पर भेज दिया गया है। कृपया अपना ईमेल चेक करें।`,
      email: cleanEmail,
      cooldown_seconds: 45,
      expires_in_minutes: 5,
    });
  } catch (err: any) {
    console.error("[SEND EMAIL OTP ROUTE ERROR]", err);
    return NextResponse.json({ detail: err.message || "OTP भेजने में त्रुटि आई।" }, { status: 500 });
  }
}
