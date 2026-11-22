"use client";

import React, { useState } from "react";
import { BookOpen, Sprout, Fish, Milk, Flower, Wheat, Search, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { useI18n } from "@/lib/i18n";

export default function KnowledgePage() {
  const { lang } = useI18n();

  const domains = [
    {
      id: "organic",
      title_hi: "जैविक एवं प्राकृतिक खेती",
      title_en: "Organic & Natural Farming",
      icon: <Sprout className="size-6 text-[#15803d]" />,
      desc: "जीवामृत, बीजामृत, घनजीवामृत निर्माण एवं शून्य बजट प्राकृतिक खेती (ZBNF) की वैज्ञानिक विधि।",
      articlesCount: "12 लेख",
    },
    {
      id: "horticulture",
      title_hi: "उद्यान एवं फल-सब्जी उत्पादन",
      title_en: "Horticulture",
      icon: <Flower className="size-6 text-[#f97316]" />,
      desc: "आम, अमरूद, आंवला बागवानी एवं संरक्षित खेती (पॉलीहाउस/शेडनेट) में बेमौसम सब्जी उत्पादन।",
      articlesCount: "18 लेख",
    },
    {
      id: "dairy",
      title_hi: "डेयरी फार्मिंग एवं पशुपालन",
      title_en: "Dairy Farming & Animal Husbandry",
      icon: <Milk className="size-6 text-[#0284c7]" />,
      desc: "उन्नत नस्लें (साहीवाल, मुर्राह), संतुलित पशु आहार (TMR), साइलेज निर्माण एवं टीकाकरण कैलेंडर।",
      articlesCount: "15 लेख",
    },
    {
      id: "fisheries",
      title_hi: "मत्स्य पालन (मछली पालन)",
      title_en: "Fisheries & Aquaculture",
      icon: <Fish className="size-6 text-[#0369a1]" />,
      desc: "तालाब निर्माण, मिश्रित मत्स्य पालन (रोहू, कतला, नैन), बायोफ्लॉक एवं प्रधानमंत्री मत्स्य संपदा योजना।",
      articlesCount: "9 लेख",
    },
    {
      id: "beekeeping",
      title_hi: "मधुमक्खी पालन (मौन पालन)",
      title_en: "Beekeeping (Apiculture)",
      icon: <Wheat className="size-6 text-[#eab308]" />,
      desc: "एपिस मेलिफेरा मधुमक्खी पालन, मौन पेटिका प्रबंधन, शहद निष्कासन एवं फसल परागण में लाभ।",
      articlesCount: "8 लेख",
    },
    {
      id: "mushroom",
      title_hi: "मशरूम उत्पादन तकनीक",
      title_en: "Mushroom Cultivation",
      icon: <Sprout className="size-6 text-[#854d0e]" />,
      desc: "बटन, ढ़ींगरी (ओएस्टर) एवं दुधिया मशरूम उत्पादन विधि, कम्पोस्ट निर्माण एवं विपणन।",
      articlesCount: "11 लेख",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "कृषि ज्ञान केंद्र" : "Knowledge Center" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "डिजिटल कृषि ज्ञान एवं अनुसंधान केंद्र" : "Agriculture Knowledge Hub"}
          subtitle={
            lang === "hi"
              ? "प्राकृतिक खेती, बागवानी, डेयरी, पशुपालन, मौन पालन व मशरूम उत्पादन पर प्रामाणिक वैज्ञानिक मार्गदर्शिकाएँ"
              : "Expert guides and research bulletins across natural farming, horticulture, livestock, and agro-enterprises"
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {domains.map((dom) => (
          <Card key={dom.id} className="flex flex-col justify-between">
            <div>
              <CardHeader className="bg-[#f8faf5]">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-white shadow-xs border border-[#e5e7eb]">
                    {dom.icon}
                  </div>
                  <Badge variant="outline">{dom.articlesCount}</Badge>
                </div>
                <CardTitle className="mt-3 text-lg font-bold text-[#14532d]">
                  {dom.title_hi}
                </CardTitle>
                <p className="text-xs text-[#6b7280]">{dom.title_en}</p>
              </CardHeader>

              <CardContent className="pt-4 text-xs sm:text-sm text-[#374151] leading-relaxed">
                {dom.desc}
              </CardContent>
            </div>

            <div className="p-4 bg-[#f8faf5] border-t border-[#e5e7eb] flex items-center justify-between">
              <span className="text-xs text-[#15803d] font-semibold">एनडीयूएटी अनुमोदित</span>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#15803d] hover:underline"
              >
                <span>विस्तृत मार्गदर्शिका पढ़ें</span>
                <ChevronRight className="size-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <SourceBadge
        sourceName="एनडीयूएटी विस्तार शिक्षा निदेशालय, कुमारगंज, अयोध्या"
        updatedAt="2026-03-01"
      />
    </div>
  );
}
