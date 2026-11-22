"use client";

import React from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n";

export default function PrivacyPage() {
  const { lang } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "गोपनीयता नीति" : "Privacy Policy" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "गोपनीयता नीति (Privacy Policy)" : "Privacy Policy"}
          subtitle="अंतिम अद्यतन: 21 मार्च 2026"
        />
      </div>

      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4 text-sm sm:text-base text-[#374151] leading-relaxed">
        <h3 className="font-bold text-[#14532d] text-lg">1. किसान डेटा सुरक्षा एवं गोपनीयता</h3>
        <p>
          यू पी किसान सेवा पोर्टल पर किसानों द्वारा पंजीकरण के दौरान प्रदान की गई जानकारी (नाम, मोबाइल नंबर, जनपद, गाँव) का उपयोग केवल कृषि मार्गदर्शन, परामर्श एवं मौसम/योजना अलर्ट प्रेषित करने हेतु किया जाता है।
        </p>

        <h3 className="font-bold text-[#14532d] text-lg">2. डेटा साझा न करने का संकल्प</h3>
        <p>
          हम किसान के किसी भी व्यक्तिगत विवरण को किसी भी व्यावसायिक अथवा विपणन कंपनी को नहीं बेचते और न ही साझा करते हैं।
        </p>

        <h3 className="font-bold text-[#14532d] text-lg">3. सुरक्षा एवं कुकीज़</h3>
        <p>
          उपयोगकर्ता की भाषा प्राथमिकता एवं सत्र सुरक्षा के लिए सुरक्षित कुकीज़ तथा स्थानीय संग्रहण (LocalStorage) का उपयोग किया जाता है।
        </p>
      </div>
    </div>
  );
}
