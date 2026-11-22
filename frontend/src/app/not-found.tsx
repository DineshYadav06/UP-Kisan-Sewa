"use client";

import Link from "next/link";
import { AlertTriangle, Home, Search, Sprout, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { lang } = useI18n();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="size-20 bg-[#fef2f2] text-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs border border-[#fecaca]">
        <AlertTriangle className="size-10" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-[#14532d] mb-3">
        {lang === "hi" ? "404 — पृष्ठ नहीं मिला" : "404 — Page Not Found"}
      </h1>

      <p className="text-base sm:text-lg text-[#4b5563] max-w-lg mx-auto mb-8 leading-relaxed">
        {lang === "hi"
          ? "क्षमा करें, जिस पृष्ठ को आप खोज रहे हैं वह उपलब्ध नहीं है अथवा उसका पता बदल गया है।"
          : "Sorry, the page you are looking for does not exist or has been moved."}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button variant="primary" size="md">
            <Home className="size-4" />
            <span>{lang === "hi" ? "मुख्य पृष्ठ पर जाएँ" : "Back to Home"}</span>
          </Button>
        </Link>
        <Link href="/crops">
          <Button variant="outline" size="md">
            <Sprout className="size-4" />
            <span>{lang === "hi" ? "फसल जानकारी देखें" : "View Crops"}</span>
          </Button>
        </Link>
        <Link href="/helpline">
          <Button variant="accent" size="md">
            <span>{lang === "hi" ? "हेल्पलाइन सहायता" : "Helpline Support"}</span>
          </Button>
        </Link>
      </div>

      <div className="mt-12 p-6 bg-white border border-[#e5e7eb] rounded-xl text-left max-w-md mx-auto">
        <h3 className="font-bold text-[#14532d] text-sm mb-2">
          {lang === "hi" ? "लोकप्रिय अनुभाग:" : "Popular Sections:"}
        </h3>
        <ul className="text-xs sm:text-sm space-y-1.5 text-[#15803d]">
          <li>
            <Link href="/mandi" className="hover:underline flex items-center gap-1.5">
              <span>• {lang === "hi" ? "आज के मंडी भाव (Agmarknet)" : "Today's Mandi Prices"}</span>
            </Link>
          </li>
          <li>
            <Link href="/weather" className="hover:underline flex items-center gap-1.5">
              <span>• {lang === "hi" ? "जनपद-वार मौसम पूर्वानुमान (IMD)" : "District Weather"}</span>
            </Link>
          </li>
          <li>
            <Link href="/schemes" className="hover:underline flex items-center gap-1.5">
              <span>• {lang === "hi" ? "कृषि सरकारी योजनाएँ व अनुदान" : "Government Schemes"}</span>
            </Link>
          </li>
          <li>
            <Link href="/ask-expert" className="hover:underline flex items-center gap-1.5">
              <span>• {lang === "hi" ? "कृषि विशेषज्ञ से सलाह लें" : "Ask an Agriculture Expert"}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
