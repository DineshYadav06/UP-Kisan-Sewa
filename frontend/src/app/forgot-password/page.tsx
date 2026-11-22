"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, ArrowLeft, CheckCircle2, KeyRound, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

export default function ForgotPasswordPage() {
  const { lang } = useI18n();
  const [step, setStep] = useState<1 | 2>(1);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/v1/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: identifier.trim() }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setSuccessMsg(
          data.message ||
            (lang === "hi"
              ? "ओटीपी आपके पंजीकृत ईमेल/मोबाइल पर भेज दिया गया है।"
              : "OTP sent to your registered email/phone.")
        );
      } else {
        setErrorMsg(data.detail || (lang === "hi" ? "उपयोगकर्ता नहीं मिला।" : "User account not found."));
      }
    } catch (err) {
      setErrorMsg(
        lang === "hi"
          ? "सर्वर से कनेक्ट करने में त्रुटि। कृपया पुनः प्रयास करें।"
          : "Server connection error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password with OTP
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg(lang === "hi" ? "दोनों पासवर्ड मेल नहीं खाते।" : "Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg(
        lang === "hi"
          ? "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।"
          : "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: identifier.trim(),
          otp: otp.trim(),
          new_password: newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(
          lang === "hi"
            ? "पासवर्ड सफलतापूर्वक रीसेट हो गया है! अब आप नए पासवर्ड से लॉगिन कर सकते हैं।"
            : "Password reset successfully! You can now log in with your new password."
        );
        setStep(1);
        setIdentifier("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMsg(data.detail || (lang === "hi" ? "ओटीपी अमान्य अथवा समाप्त हो चुका है।" : "Invalid or expired OTP."));
      }
    } catch (err) {
      setErrorMsg(
        lang === "hi"
          ? "सर्वर से कनेक्ट करने में त्रुटि। कृपया पुनः प्रयास करें।"
          : "Server connection error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 sm:p-8 shadow-xs">
        <h1 className="text-xl font-black text-[#14532d] mb-2">
          {lang === "hi" ? "पासवर्ड पुनर्प्राप्ति (Password Recovery)" : "Password Recovery"}
        </h1>
        <p className="text-xs text-[#6b7280] mb-6">
          {step === 1
            ? lang === "hi"
              ? "अपना पंजीकृत मोबाइल नंबर अथवा ईमेल दर्ज करें। हम आपको 6-अंकीय सत्यापन ओटीपी भेजेंगे।"
              : "Enter your registered email address or mobile number to receive a 6-digit OTP."
            : lang === "hi"
            ? "प्राप्त 6-अंकीय ओटीपी एवं नया सुरक्षित पासवर्ड दर्ज करें।"
            : "Enter the 6-digit OTP and your new password."}
        </p>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg mb-4 flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-[#dcfce7] border border-[#86efac] text-[#14532d] text-xs font-semibold rounded-lg mb-4 flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0 text-[#15803d]" />
            <span>{successMsg}</span>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#14532d] mb-1">
                {lang === "hi" ? "पंजीकृत मोबाइल नंबर / ईमेल *" : "Registered Mobile / Email *"}
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={lang === "hi" ? "उदा. 9876543210 अथवा email@domain.com" : "e.g. 9876543210 or email@domain.com"}
                required
                className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#15803d]"
              />
            </div>
            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading
                ? lang === "hi"
                  ? "ओटीपी भेज रहे हैं..."
                  : "Sending OTP..."
                : lang === "hi"
                ? "सत्यापन ओटीपी भेजें"
                : "Send Verification OTP"}
            </Button>
            <div className="text-center pt-2">
              <Link href="/login" className="text-xs font-semibold text-[#15803d] hover:underline">
                {lang === "hi" ? "← वापस लॉगिन पर जाएँ" : "← Back to Login"}
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#14532d] mb-1">
                {lang === "hi" ? "6-अंकीय ओटीपी दर्ज करें *" : "Enter 6-Digit OTP *"}
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                required
                className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm font-mono tracking-widest text-center outline-none focus:border-[#15803d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14532d] mb-1">
                {lang === "hi" ? "नया पासवर्ड *" : "New Password *"}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#15803d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14532d] mb-1">
                {lang === "hi" ? "नया पासवर्ड पुनः दर्ज करें *" : "Confirm New Password *"}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#15803d]"
              />
            </div>

            <Button type="submit" variant="primary" fullWidth disabled={loading}>
              {loading
                ? lang === "hi"
                  ? "पासवर्ड रीसेट हो रहा है..."
                  : "Resetting..."
                : lang === "hi"
                ? "नया पासवर्ड सहेजें एवं पूरा करें"
                : "Reset Password"}
            </Button>

            <div className="flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#6b7280] hover:text-[#1f2937]"
              >
                {lang === "hi" ? "← पहचान बदलें" : "← Change ID"}
              </button>
              <Link href="/login" className="font-semibold text-[#15803d] hover:underline">
                {lang === "hi" ? "लॉगिन पृष्ठ पर जाएँ" : "Go to Login"}
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
