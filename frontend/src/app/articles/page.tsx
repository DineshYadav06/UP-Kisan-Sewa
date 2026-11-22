"use client";

import React, { useState } from "react";
import { FileText, Download, Calendar, Search, User, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function ArticlesPage() {
  const { lang } = useI18n();

  const publications = [
    {
      title: "उत्तर प्रदेश में गेहूं की देर से बुवाई: वैज्ञानिक पैकेज एवं प्रबंधन",
      author: "वैज्ञानिक दल, सस्य विज्ञान संभाग, NDUAT",
      date: "मार्च 2026",
      category: "शोध आलेख",
      summary: "देर से बुवाई की स्थिति में बीज दर, तापमान वृद्धि से दाना सिकुड़ने की रोकथाम एवं पोटाश के प्रयोग पर शोध निष्कर्ष।",
      pages: "6 पृष्ठ (PDF)",
      source: "कृषि प्रसार बुलेटिन (NDUAT)",
    },
    {
      title: "मृदा में जीवांश कार्बन (Organic Carbon) बढ़ाने की आधुनिक तकनीक",
      author: "डॉ. अरविंद त्रिपाठी, मृदा वैज्ञानिक",
      date: "फरवरी 2026",
      category: "मृदा विज्ञान",
      summary: "हरी खाद (ढैंचा/सनई), फसल अवशेष प्रबंधन और जैविक खादों के समावेश से मिट्टी की उर्वरता बहाली।",
      pages: "4 पृष्ठ (PDF)",
      source: "NDUAT अनुसंधान निदेशालय",
    },
    {
      title: "दलहनी फसलों में एकीकृत पोषण प्रबंधन (INM) से उपज संवर्धन",
      author: "पादप कार्यिकी एवं कृषि रसायन विभाग",
      date: "जनवरी 2026",
      category: "फसल पोषण",
      summary: "राइजोबियम कल्चर, फॉस्फेट विलेयक जीवाणु (PSB) एवं गंधक (सल्फर) के प्रयोग से दलहन उत्पादन में 20% तक वृद्धि।",
      pages: "5 पृष्ठ (PDF)",
      source: "आईसीएआर-आईआईपीआर / एनडीयूएटी",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "लेख एवं प्रकाशन" : "Articles & Publications" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "कृषि वैज्ञानिक लेख एवं शोध प्रकाशन" : "Articles & Research Publications"}
          subtitle={
            lang === "hi"
              ? "एनडीयूएटी वैज्ञानिकों द्वारा लिखित प्रामाणिक कृषि आलेख, वैज्ञानिक बुलेटिन एवं डाउनलोड योग्य संसाधन"
              : "Peer-reviewed extension articles, practical farming bulletins, and downloadable guides"
          }
        />
      </div>

      <div className="space-y-4 mb-8">
        {publications.map((pub, idx) => (
          <Card key={idx} className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f3f4f6] pb-3 mb-3">
              <div>
                <Badge variant="success" size="sm" className="mb-1">{pub.category}</Badge>
                <CardTitle className="text-base sm:text-lg text-[#14532d]">{pub.title}</CardTitle>
                <p className="text-xs text-[#6b7280] flex items-center gap-2 mt-1">
                  <span>लेखक: {pub.author}</span>
                  <span>•</span>
                  <span>दिनांक: {pub.date}</span>
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 bg-[#f0fdf4] hover:bg-[#dcfce7] border border-[#bbf7d0] text-[#14532d] text-xs font-bold px-3 py-2 rounded-lg cursor-pointer shrink-0"
              >
                <Download className="size-3.5" />
                <span>PDF डाउनलोड ({pub.pages})</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mb-3">
              {pub.summary}
            </p>

            <SourceBadge sourceName={pub.source} />
          </Card>
        ))}
      </div>
    </div>
  );
}
