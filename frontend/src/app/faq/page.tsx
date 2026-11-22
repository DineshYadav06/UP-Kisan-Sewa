"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n";

export default function FaqPage() {
  const { lang } = useI18n();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "क्या यू पी किसान सेवा पोर्टल पर पंजीकरण करना निःशुल्क है?",
      a: "हाँ, किसानों के लिए पंजीकरण, फसल परामर्श, मंडी भाव देखना एवं वैज्ञानिकों से प्रश्न पूछना पूर्णतः निःशुल्क सेवा है।",
    },
    {
      q: "यहाँ दिए गए मंडी भाव कितने सटीक और ताज़ा होते हैं?",
      a: "सभी मंडी भाव सीधे भारत सरकार के आधिकारिक एगमार्कनेट (Agmarknet) एवं data.gov.in पोर्टल से लिए जाते हैं। प्रत्येक भाव के साथ मंडी का नाम व तिथि स्पष्ट रूप से प्रदर्शित की जाती है।",
    },
    {
      q: "विशेषज्ञ से प्रश्न पूछने पर उत्तर कितने समय में प्राप्त होता है?",
      a: "सामान्यतः कार्यदिवसों में 24 से 48 घंटे के भीतर NDUAT के कृषि वैज्ञानिक आपके प्रश्न की समीक्षा कर उत्तर प्रेषित कर देते हैं, जिसे आप अपने डैशबोर्ड पर देख सकते हैं।",
    },
    {
      q: "क्या यह कोई सरकारी पोर्टल है?",
      a: "नहीं, यह एक स्वतंत्र डिजिटल कृषि सहायता मंच है जिसे आचार्य नरेंद्र देव कृषि एवं प्रौद्योगिकी विश्वविद्यालय (NDUAT), कुमारगंज, अयोध्या के सहयोग से विकसित किया गया है।",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "सामान्य प्रश्न (FAQ)" : "FAQ" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "अक्सर पूछे जाने वाले प्रश्न (FAQ)" : "Frequently Asked Questions"}
          subtitle="यू पी किसान सेवा पोर्टल उपयोग एवं किसान सेवाओं से संबंधित मुख्य प्रश्न"
        />
      </div>

      <div className="space-y-3 mb-8">
        {faqs.map((f, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-xs">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 text-left font-bold text-sm sm:text-base text-[#14532d] flex items-center justify-between gap-3 hover:bg-[#f8faf5] cursor-pointer"
              >
                <span>{f.q}</span>
                {isOpen ? <ChevronUp className="size-5 shrink-0 text-[#15803d]" /> : <ChevronDown className="size-5 shrink-0 text-[#6b7280]" />}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#4b5563] border-t border-[#f3f4f6] leading-relaxed">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
