import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { loadDB, saveDB, hashOtp } from "@/lib/server-store";

const FASTAPI_URL = "http://127.0.0.1:8000/api/v1/auth/verify-email-otp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cleanEmail = (body.email || "").trim().toLowerCase();
    const cleanOtp = (body.otp || "").trim();

    if (!cleanEmail || !cleanOtp || cleanOtp.length !== 6) {
      return NextResponse.json({ detail: "कृपया 6-अंकीय मान्य OTP कोड दर्ज करें।" }, { status: 400 });
    }

    // Try proxy to live FastAPI first
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(FASTAPI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, otp: cleanOtp }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        return NextResponse.json(await res.json());
      }
      if (res.status === 400) {
        return NextResponse.json(await res.json(), { status: 400 });
      }
    } catch (proxyErr) {
      // Backend offline, proceed with local handler
    }

    const store = loadDB();
    if (!store.email_verifications) store.email_verifications = [];

    const rec = store.email_verifications.find(
      (r: any) => r.email?.toLowerCase() === cleanEmail
    );

    if (!rec) {
      return NextResponse.json(
        { detail: "सत्यापन कोड नहीं मिला। कृपया 'Verify Email' पर क्लिक कर नया OTP मांगें।" },
        { status: 400 }
      );
    }

    const now = Date.now();
    if (rec.expires_at && new Date(rec.expires_at).getTime() < now) {
      store.email_verifications = store.email_verifications.filter(
        (r: any) => r.email?.toLowerCase() !== cleanEmail
      );
      saveDB(store);
      return NextResponse.json(
        { detail: "सत्यापन कोड समाप्त (Expired) हो चुका है। कृपया 'Resend OTP' करें।" },
        { status: 400 }
      );
    }

    if ((rec.attempts || 0) >= 5) {
      store.email_verifications = store.email_verifications.filter(
        (r: any) => r.email?.toLowerCase() !== cleanEmail
      );
      saveDB(store);
      return NextResponse.json(
        { detail: "अधिकतम 5 गलत प्रयास पूरे हो चुके हैं। कृपया नया OTP मांगें।" },
        { status: 400 }
      );
    }

    const inputHash = hashOtp(cleanOtp);
    if (inputHash !== rec.otp_hash) {
      rec.attempts = (rec.attempts || 0) + 1;
      saveDB(store);
      const remaining = 5 - rec.attempts;
      return NextResponse.json(
        { detail: `गलत OTP कोड। कृपया सही 6-अंकीय कोड दर्ज करें। (शेष प्रयास: ${remaining})` },
        { status: 400 }
      );
    }

    // Success: Generate verification token valid for 30 minutes
    const verificationToken = crypto.randomBytes(32).toString("hex");
    rec.verified = true;
    rec.verification_token = verificationToken;
    rec.verified_at = new Date(now).toISOString();
    rec.token_expires_at = new Date(now + 30 * 60 * 1000).toISOString();
    delete rec.otp_hash;

    saveDB(store);

    return NextResponse.json({
      status: "verified",
      message: "ईमेल सफलतापूर्वक सत्यापित हुआ! (Email Verified Successfully)",
      email: cleanEmail,
      verification_token: verificationToken,
    });
  } catch (err: any) {
    console.error("[VERIFY EMAIL OTP ROUTE ERROR]", err);
    return NextResponse.json({ detail: err.message || "सत्यापन में त्रुटि आई।" }, { status: 500 });
  }
}
