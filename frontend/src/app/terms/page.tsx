"use client";

import React from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n";

export default function TermsPage() {
  const { lang } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "नियम एवं शर्तें" : "Terms & Conditions" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "नियम एवं शर्तें (Terms and Conditions)" : "Terms and Conditions"}
          subtitle="पोर्टल उपयोग की सामान्य शर्तें"
        />
      </div>

      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4 text-sm sm:text-base text-[#374151] leading-relaxed">
        <h3 className="font-bold text-[#14532d] text-lg">1. सेवाओं का उपयोग</h3>
        <p>
          यू पी किसान सेवा पोर्टल का उपयोग केवल वैध कृषि मार्गदर्शन, ज्ञान संवर्धन एवं परामर्श हेतु ही किया जा सकता है।
        </p>

        <h3 className="font-bold text-[#14532d] text-lg">2. सामग्री की सत्यता एवं बौद्धिक संपदा</h3>
        <p>
          पोर्टल पर प्रकाशित अनुसंधान लेख, बुलेटिन एवं फसल पैकेज NDUAT तथा संबंधित कृषि संस्थानों की संपदा हैं। इनका उपयोग गैर-व्यावसायिक किसान लाभ हेतु किया जा सकता है।
        </p>

        <h3 className="font-bold text-[#14532d] text-lg">3. स्वतंत्र मंच का दायित्व</h3>
        <p>
          यह मंच सरकारी योजनाओं के आधिकारिक लिंक प्रदान करता है, किंतु किसी भी योजना के अनुमोदन अथवा अस्वीकृति का अंतिम अधिकार केवल संबंधित सरकारी विभाग का होता है।
        </p>
      </div>
    </div>
  );
}
