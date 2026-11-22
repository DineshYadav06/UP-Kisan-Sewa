"use client";

import React from "react";
import { CheckCircle2, Eye, Type, Contrast } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n";

export default function AccessibilityPage() {
  const { lang } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "अभिगम्यता कथन" : "Accessibility" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "अभिगम्यता कथन (Accessibility Statement)" : "Accessibility Statement"}
          subtitle="भारतीय सरकारी वेबसाइट दिशानिर्देश (GIGW 3.0) एवं WCAG 2.1 AA अनुपालन"
        />
      </div>

      <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-sm sm:text-base text-[#374151] leading-relaxed">
        <p>
          यू पी किसान सेवा सभी किसानों, विशेष रूप से ग्रामीण, बुजुर्ग अथवा दृष्टि संबंधी दिव्यांगता वाले उपयोगकर्ताओं के लिए पूर्ण सुलभ एवं सरल अनुभव सुनिश्चित करने हेतु प्रतिबद्ध है।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-[#f8faf5] border border-[#e5e7eb] rounded-xl">
            <Type className="size-6 text-[#15803d] mb-2" />
            <h4 className="font-bold text-[#14532d]">फॉन्ट आकार नियंत्रण (A- / A / A+)</h4>
            <p className="text-xs text-[#4b5563] mt-1">शीर्ष बार में फॉन्ट आकार को बड़ा या छोटा करने की सुविधा उपलब्ध है।</p>
          </div>

          <div className="p-4 bg-[#f8faf5] border border-[#e5e7eb] rounded-xl">
            <Contrast className="size-6 text-[#15803d] mb-2" />
            <h4 className="font-bold text-[#14532d]">उच्च रंग कंट्रास्ट (High Contrast)</h4>
            <p className="text-xs text-[#4b5563] mt-1">धूप में खेत में मोबाइल पर स्पष्ट पढ़ने योग्य रंग पैलेट (#14532d, #15803d)।</p>
          </div>

          <div className="p-4 bg-[#f8faf5] border border-[#e5e7eb] rounded-xl">
            <Eye className="size-6 text-[#15803d] mb-2" />
            <h4 className="font-bold text-[#14532d]">स्क्रीन रीडर अनुकूलता</h4>
            <p className="text-xs text-[#4b5563] mt-1">सभी छवियों हेतु उचित Alt-Text एवं सिमेंटिक HTML टैग्स।</p>
          </div>

          <div className="p-4 bg-[#f8faf5] border border-[#e5e7eb] rounded-xl">
            <CheckCircle2 className="size-6 text-[#15803d] mb-2" />
            <h4 className="font-bold text-[#14532d]">कीबोर्ड नेविगेशन एवं स्किप लिंक</h4>
            <p className="text-xs text-[#4b5563] mt-1">सीधे मुख्य सामग्री पर जाने हेतु 'मुख्य सामग्री पर जाएँ' लिंक।</p>
          </div>
        </div>
      </div>
    </div>
  );
}
