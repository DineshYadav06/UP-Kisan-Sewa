"use client";

import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Alert } from "@/components/ui/Alert";
import { useI18n } from "@/lib/i18n";

export default function DisclaimerPage() {
  const { lang } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "अस्वीकरण (Disclaimer)" : "Disclaimer" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "अस्वीकरण एवं कानूनी स्थिति" : "Legal Disclaimer"}
          subtitle="यू पी किसान सेवा की संवैधानिक एवं विधिक स्थिति"
        />
      </div>

      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-sm sm:text-base text-[#374151] leading-relaxed">
        <Alert type="warning" title="स्वतंत्र डिजिटल कृषि मंच (Independent Platform)">
          यू पी किसान सेवा एक स्वतंत्र डिजिटल कृषि सहायता मंच है। यह भारत सरकार अथवा उत्तर प्रदेश सरकार की आधिकारिक सरकारी (gov.in) वेबसाइट नहीं है।
        </Alert>

        <div>
          <h3 className="font-bold text-[#14532d] text-lg mb-1">1. सरकारी प्रतीकों का अनाधिकृत प्रयोग न करना</h3>
          <p>
            यह मंच भारत के राज्य प्रतीक (State Emblem of India) अथवा 'सरकारी' शब्द का अनाधिकृत प्रयोग नहीं करता है। यह आचार्य नरेंद्र देव कृषि एवं प्रौद्योगिकी विश्वविद्यालय (NDUAT), कुमारगंज, अयोध्या के सहयोग से विकसित किसान सूचना संदर्शिका है।
          </p>
        </div>

        <div>
          <h3 className="font-bold text-[#14532d] text-lg mb-1">2. कृषि परामर्श की प्रकृति</h3>
          <p>
            इस मंच पर उपलब्ध सभी फसल संस्तुतियाँ, रोग निदान, मौसम पूर्वानुमान एवं मंडी भाव वैज्ञानिकों एवं अधिकृत पोर्टलों (IMD, Agmarknet, ICAR, NDUAT) से लिए गए हैं। किसानों को सलाह दी जाती है कि किसी भी कीटनाशक के बड़े पैमाने पर प्रयोग से पूर्व अपने स्थानीय कृषि प्रसार अधिकारी अथवा कृषि रक्षा इकाई से संपर्क करें।
          </p>
        </div>

        <div>
          <h3 className="font-bold text-[#14532d] text-lg mb-1">3. बाह्य सरकारी पोर्टल लिंक</h3>
          <p>
            सभी सरकारी योजनाओं (जैसे पीएम-किसान, पीएम फसल बीमा, कुसुम आदि) के लिए दिए गए आवेदन लिंक केवल उपयोगकर्ताओं की सुविधा हेतु आधिकारिक सरकारी (.gov.in / .nic.in) पोर्टलों पर पुनर्निर्देशित (Redirect) करते हैं।
          </p>
        </div>
      </div>
    </div>
  );
}
