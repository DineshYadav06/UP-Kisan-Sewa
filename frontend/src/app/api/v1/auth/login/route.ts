import { NextRequest, NextResponse } from "next/server";
import { loadDB, verifyPassword, generateToken } from "@/lib/server-store";

const FASTAPI_URL = "http://127.0.0.1:8000/api/v1/auth/login";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const ident = (body.identifier || "").trim().toLowerCase();
    const password = body.password || "";

    if (!ident || !password) {
      return NextResponse.json(
        { detail: "कृपया मोबाइल/ईमेल एवं पासवर्ड दर्ज करें।" },
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
        return NextResponse.json(await res.json());
      }
    } catch (proxyErr) {
      // Backend offline, proceed with local handler
    }

    const store = loadDB();
    const user = (store.users || []).find(
      (u: any) => u.email?.toLowerCase() === ident || u.phone === ident
    );

    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json(
        { detail: "अमान्य मोबाइल/ईमेल अथवा गलत पासवर्ड (Invalid credentials)" },
        { status: 401 }
      );
    }

    if (!user.email_verified) {
      return NextResponse.json(
        { detail: "ईमेल सत्यापन लंबित है। कृपया पंजीकरण के दौरान भेजे गए OTP से सत्यापित करें।" },
        { status: 403 }
      );
    }

    const token = generateToken({ sub: user._id, email: user.email, role: user.role || "farmer" });

    return NextResponse.json({
      access_token: token,
      token_type: "bearer",
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role || "farmer",
        status: user.status || "active",
        district: user.district,
        tehsil: user.tehsil,
        block: user.block,
        village: user.village,
        post_office: user.post_office,
        pincode: user.pincode,
        created_at: user.created_at,
      },
    });
  } catch (err: any) {
    console.error("[LOGIN ROUTE ERROR]", err);
    return NextResponse.json({ detail: err.message || "लॉगिन विफल रहा।" }, { status: 500 });
  }
}
