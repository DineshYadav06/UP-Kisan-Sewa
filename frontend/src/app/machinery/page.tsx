"use client";

import React, { useState } from "react";
import { Wrench, CheckCircle, Search, ShieldCheck, Tag } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function MachineryPage() {
  const { lang } = useI18n();

  const machinery = [
    {
      name_hi: "सुपर सीडर (Super Seeder)",
      name_en: "Super Seeder",
      purpose: "धान की खड़ी पराली में बिना जलाए सीधे गेहूँ की बुवाई एवं खाद डालना।",
      hp: "50 एचपी या अधिक का ट्रैक्टर",
      subsidy_hi: "उ.प्र. कृषि यंत्रीकरण योजना में 50% तक अनुदान (अधिकतम ₹1.05 लाख)।",
      benefits: "पराली प्रबंधन, डीजल की बचत, समय की बचत, और मृदा जीवांश में वृद्धि।",
      source: "कृषि अभियांत्रिकी संकाय, NDUAT / कृषि विभाग उ.प्र.",
    },
    {
      name_hi: "रोटावेटर (Rotavator / Rotary Tiller)",
      name_en: "Rotavator",
      purpose: "खेत की पहली जुताई में ही मिट्टी को भुरभुरा एवं समतल बनाना।",
      hp: "35-50 एचपी ट्रैक्टर",
      subsidy_hi: "40% से 50% सरकारी अनुदान उपलब्ध।",
      benefits: "कम समय में बीज शैय्या तैयार करना, खरपतवारों का बारीक चूर्ण बनाना।",
      source: "कृषि विभाग उत्तर प्रदेश",
    },
    {
      name_hi: "लेजर लैंड लेवलर (Laser Land Leveler)",
      name_en: "Laser Land Leveler",
      purpose: "खेत को कम्प्यूटरीकृत लेजर किरण द्वारा मिलीमीटर स्तर तक समतल करना।",
      hp: "50-60 एचपी ट्रैक्टर",
      subsidy_hi: "कस्टम हायरिंग सेंटर (CHC) योजना अंतर्गत 40% अनुदान।",
      benefits: "सिंचाई जल की 25-30% बचत, समान खाद वितरण, 10-15% उपज वृद्धि।",
      source: "एनडीयूएटी कृषि यंत्रीकरण प्रकोष्ठ",
    },
    {
      name_hi: "बैटरी / सोलर पावर्ड नेपसेक स्प्रेयर",
      name_en: "Battery Powered Sprayer",
      purpose: "कीटनाशक, कवकनाशी एवं घुलनशील खादों का एकसमान छिड़काव।",
      hp: "12V रिचार्जेबल बैटरी",
      subsidy_hi: "लघु व सीमांत किसानों को 50% अनुदान।",
      benefits: "हाथ की थकान से मुक्ति, दबाव निरंतर बना रहना, दवाओं का सही फैलाव।",
      source: "उ.प्र. राज्य कृषि उत्पादन मंडी परिषद",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "कृषि यंत्र व उपकरण" : "Farm Machinery" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "उन्नत कृषि यंत्र एवं सरकारी अनुदान" : "Modern Farm Machinery & Subsidies"}
          subtitle={
            lang === "hi"
              ? "उत्तर प्रदेश सरकार द्वारा कृषि यंत्रीकरण योजना में अनुमन्य आधुनिक कृषि उपकरण, उपयोग विधि व अनुदान विवरण"
              : "Farm mechanization guides, equipment operations, and official government subsidy guidelines"
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {machinery.map((m, idx) => (
          <Card key={idx}>
            <CardHeader className="bg-[#f8faf5]">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-[#14532d]">
                  <Wrench className="size-5 text-[#15803d]" />
                  <span>{m.name_hi}</span>
                </CardTitle>
                <Badge variant="outline">{m.hp}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pt-4 text-xs sm:text-sm">
              <div>
                <strong className="text-[#14532d] block">उपयोग एवं कार्य:</strong>
                <p className="text-[#374151] mt-0.5">{m.purpose}</p>
              </div>

              <div className="bg-[#f0fdf4] border border-[#bbf7d0] p-3 rounded-lg">
                <strong className="text-[#15803d] flex items-center gap-1">
                  <Tag className="size-4" />
                  <span>सरकारी अनुदान (Subsidy):</span>
                </strong>
                <p className="text-[#14532d] mt-1 font-semibold">{m.subsidy_hi}</p>
              </div>

              <div>
                <strong className="text-[#14532d] block">प्रमुख लाभ:</strong>
                <p className="text-[#4b5563] mt-0.5">{m.benefits}</p>
              </div>
            </CardContent>

            <div className="p-3 bg-[#f8faf5] border-t border-[#e5e7eb]">
              <SourceBadge sourceName={m.source} />
            </div>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-[#fffbeb] border border-[#fde68a] rounded-xl text-xs sm:text-sm text-[#92400e]">
        <strong>अनुदान हेतु आवेदन: </strong>कृषि यंत्रों पर सरकारी अनुदान हेतु उ.प्र. कृषि विभाग के पोर्टल (agriculture.up.gov.in) पर 'यंत्र टोकन' व्यवस्था द्वारा पारदर्शी ई-लॉटरी के माध्यम से चयन किया जाता है।
      </div>
    </div>
  );
}
