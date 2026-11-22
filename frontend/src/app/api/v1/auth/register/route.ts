import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { loadDB, saveDB, hashPassword, generateToken } from "@/lib/server-store";

const FASTAPI_URL = "http://127.0.0.1:8000/api/v1/auth/register";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cleanEmail = (body.email || "").trim().toLowerCase();
    const cleanPhone = (body.phone || "").trim();
    const fullName = (body.full_name || "").trim();
    const password = body.password || "";
    const confirmPassword = body.confirm_password || "";
    const pincode = (body.pincode || "").trim();
    const verificationToken = body.verification_token || "";

    // 1. Password validation
    if (!password || password !== confirmPassword) {
      return NextResponse.json(
        { detail: "पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते (Passwords do not match)" },
        { status: 400 }
      );
    }

    // 2. PIN code validation
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        { detail: "पिन कोड 6 अंकों का होना चाहिए (PIN code must be exactly 6 numeric digits)" },
        { status: 400 }
      );
    }

    // Try proxy to live FastAPI first
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);
      const res = await fetch(FASTAPI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (res.ok) {
        return NextResponse.json(await res.json(), { status: 201 });
      }
    } catch (proxyErr) {
      // Backend offline, proceed with local handler
    }

    const store = loadDB();
    if (!store.users) store.users = [];
    if (!store.email_verifications) store.email_verifications = [];

    // 3. Verification Token Validation
    const now = Date.now();
    const verRec = store.email_verifications.find(
      (r: any) =>
        r.email?.toLowerCase() === cleanEmail &&
        r.verified === true &&
        new Date(r.token_expires_at).getTime() > now
    );

    if (!verRec) {
      const existingVerified = store.users.find(
        (u: any) => u.email?.toLowerCase() === cleanEmail && u.email_verified === true
      );
      if (!existingVerified) {
        return NextResponse.json(
          { detail: "कृपया पंजीकरण से पहले अपना ईमेल OTP द्वारा सत्यापित करें (Please verify your email via OTP)" },
          { status: 400 }
        );
      }
    } else if (verificationToken && verRec.verification_token !== verificationToken) {
      return NextResponse.json(
        { detail: "अमान्य अथवा जाली ईमेल सत्यापन टोकन (Invalid verification token)" },
        { status: 400 }
      );
    }

    // 4. Duplicate checks
    const existing = store.users.find(
      (u: any) => u.email?.toLowerCase() === cleanEmail || u.phone === cleanPhone
    );
    if (existing && existing.email_verified) {
      if (existing.email?.toLowerCase() === cleanEmail) {
        return NextResponse.json({ detail: "यह ईमेल पहले से पंजीकृत है (Email already registered)" }, { status: 400 });
      }
      if (existing.phone === cleanPhone) {
        return NextResponse.json({ detail: "यह मोबाइल नंबर पहले से पंजीकृत है (Mobile number already registered)" }, { status: 400 });
      }
    }

    const passwordHash = hashPassword(password);
    const userId = existing?._id || crypto.randomBytes(12).toString("hex");

    const userDoc = {
      _id: userId,
      full_name: fullName,
      email: cleanEmail,
      phone: cleanPhone,
      password_hash: passwordHash,
      role: "farmer",
      email_verified: true,
      status: "active",
      state: body.state || "Uttar Pradesh",
      division: body.division || "अयोध्या मण्डल",
      district: body.district,
      tehsil: body.tehsil || "सदर",
      block: body.block || "सदर ब्लॉक",
      village: body.village || "ग्राम",
      post_office: body.post_office || "मुख्य डाकघर",
      pincode: pincode,
      created_at: new Date(now).toISOString(),
      updated_at: new Date(now).toISOString(),
    };

    if (existing) {
      const idx = store.users.findIndex((u: any) => u._id === existing._id);
      if (idx !== -1) store.users[idx] = { ...existing, ...userDoc };
    } else {
      store.users.push(userDoc);
    }

    // Consume verification token
    store.email_verifications = store.email_verifications.filter(
      (r: any) => r.email?.toLowerCase() !== cleanEmail
    );

    saveDB(store);

    const token = generateToken({ sub: userId, email: cleanEmail, role: "farmer" });

    return NextResponse.json(
      {
        status: "success",
        message: "किसान खाता सफलतापूर्वक पंजीकृत हो गया है (Farmer account registered successfully)",
        access_token: token,
        token_type: "bearer",
        user: {
          id: userId,
          full_name: fullName,
          email: cleanEmail,
          phone: cleanPhone,
          role: "farmer",
          district: body.district,
          tehsil: body.tehsil,
          block: body.block,
          village: body.village,
          post_office: body.post_office,
          pincode: pincode,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[REGISTER ROUTE ERROR]", err);
    return NextResponse.json({ detail: err.message || "पंजीकरण विफल रहा।" }, { status: 500 });
  }
}
