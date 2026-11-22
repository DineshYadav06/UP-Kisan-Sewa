"use client";

import React, { useState } from "react";
import { Bug, Search, Filter, ShieldCheck, AlertCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function PestsPage() {
  const { lang } = useI18n();
  const [search, setSearch] = useState("");
  const [cropFilter, setCropFilter] = useState("all");

  const pests = [
    {
      id: "stem-borer-paddy",
      name_hi: "तना छेदक (Stem Borer)",
      name_en: "Yellow Stem Borer",
      crop_hi: "धान",
      crop_id: "paddy",
      scientific: "Scirpophaga incertulas",
      damageStage: "वानस्पतिक अवस्था में 'डेड हार्ट' (Dead Heart) तथा बाली निकलते समय 'सफेद बाली' (White Earhead)।",
      ipm: "फेरोमोन ट्रैप 5 प्रति एकड़ लगाएं। ट्राइकोग्रामा जैपोनिकम परजीवी कार्ड 1 लाख प्रति हेक्टेयर छोड़ें। प्रकाश प्रपंच (Light Trap) का उपयोग करें।",
      chemical: "आर्थिक क्षति स्तर (ETL 5% डेड हार्ट) पार होने पर क्लोरेंट्रानिलिप्रोल 0.4% जीआर (4 किग्रा/एकड़) या कारबोफ्यूरान 3जी का उपयोग।",
      source: "एनडीयूएटी कीट विज्ञान विभाग",
      updatedAt: "2026-03-01",
    },
    {
      id: "aphid-mustard",
      name_hi: "माहू / चेपा (Mustard Aphid)",
      name_en: "Mustard Aphid",
      crop_hi: "सरसों",
      crop_id: "mustard",
      scientific: "Lipaphis erysimi",
      damageStage: "फूल एवं फलियां बनते समय जनवरी-फरवरी में पौधे की कोमल टहनियों व पत्तियों से रस चूसकर पौधे को कमजोर करना।",
      ipm: "पीले चिपचिपे कार्ड (Yellow Sticky Traps) 10-12 प्रति एकड़ लगाएं। लेडीबर्ड बीटल (मित्र कीट) का संरक्षण करें। 5% नीम तेल (नीमबाण) का छिड़काव करें।",
      chemical: "प्रकोप अधिक होने पर इमिडाक्लोप्रिड 17.8% एसएल (1 मिली प्रति 3 लीटर पानी) में घोलकर छिड़कें।",
      source: "आईसीएआर-डीआरएमआर / एनडीयूएटी",
      updatedAt: "2026-02-28",
    },
    {
      id: "pod-borer-chickpea",
      name_hi: "फली छेदक (Gram Pod Borer)",
      name_en: "Helicoverpa armigera",
      crop_hi: "चना / अरहर",
      crop_id: "pulse",
      scientific: "Helicoverpa armigera",
      damageStage: "सूंडी फलियों में छेद करके अपना आधा शरीर अंदर डालकर दानों को खा जाती है।",
      ipm: "खेत में 'टी' (T) आकार की खूंटियां (Bird Perches) 15-20 प्रति एकड़ लगाएं ताकि चिड़ियां सूंडी खा सकें। एचएएनपीवी (HaNPV) 250 एलई का छिड़काव करें।",
      chemical: "ईटीएल (1-2 सूंडी प्रति मीटर पंक्ति) पर एमामेक्टिन बेंजोएट 5% एसजी 80 ग्राम प्रति एकड़ 150 लीटर पानी में छिड़कें।",
      source: "एनडीयूएटी दलहन अनुभाग",
      updatedAt: "2026-03-04",
    },
    {
      id: "top-borer-sugarcane",
      name_hi: "चोटी बेधक (Top Borer)",
      name_en: "Sugarcane Top Borer",
      crop_hi: "गन्ना",
      crop_id: "sugarcane",
      scientific: "Scirpophaga excerptalis",
      damageStage: "तीसरी व चौथी पीढ़ी द्वारा मध्य शिरा में छेद करना, अगोला सूखना और गुच्छेदार शीर्ष (Bunchy top) बनना।",
      ipm: "अंड परजीवी ट्राइकोग्रामा चिलोनीस का प्रयोग। ग्रसित शीर्षों को काटकर नष्ट करना।",
      chemical: "तीसरी पीढ़ी के प्रकोप समय जून के अंत में क्लोरेंट्रानिलिप्रोल 18.5% एससी 150 मिली प्रति एकड़ जड़ों के पास ड्रेन्चिंग करें।",
      source: "उ.प्र. गन्ना शोध संस्थान / एनडीयूएटी",
      updatedAt: "2026-03-02",
    },
  ];

  const filtered = pests.filter((p) => {
    const matchCrop = cropFilter === "all" || p.crop_id === cropFilter;
    const matchSearch =
      search.trim() === "" ||
      p.name_hi.includes(search) ||
      p.name_en.toLowerCase().includes(search.toLowerCase()) ||
      p.crop_hi.includes(search);
    return matchCrop && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "कीट नियंत्रण" : "Pest Management" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "एकीकृत कीट प्रबंधन (IPM) मार्गदर्शिका" : "Integrated Pest Management (IPM)"}
          subtitle={
            lang === "hi"
              ? "रासायनिक दवाओं से पूर्व जैविक व मित्र कीटों की सुरक्षा एवं आर्थिक क्षति स्तर (ETL) आधारित संस्तुतियां"
              : "Biological control, pest identification, threshold-based guidance, and expert-reviewed management"
          }
        />
      </div>

      <div className="bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-xs mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 size-4 text-[#9ca3af]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "hi" ? "कीट या फसल का नाम खोजें..." : "Search pest or crop..."}
            className="w-full pl-9 pr-4 py-2 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#15803d]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="size-4 text-[#6b7280]" />
          <select
            value={cropFilter}
            onChange={(e) => setCropFilter(e.target.value)}
            className="bg-[#f8faf5] border border-[#d1d5db] text-xs sm:text-sm font-semibold rounded-lg px-3 py-2 outline-none cursor-pointer"
          >
            <option value="all">सभी फसलें (All Crops)</option>
            <option value="paddy">धान (Paddy)</option>
            <option value="mustard">सरसों (Mustard)</option>
            <option value="pulse">चना/अरहर (Pulses)</option>
            <option value="sugarcane">गन्ना (Sugarcane)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((pest) => (
          <Card key={pest.id} className="flex flex-col justify-between">
            <div>
              <CardHeader className="bg-[#fffbeb] border-b border-[#fef3c7]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-[#92400e] flex items-center gap-1.5">
                      <Bug className="size-5 text-[#d97706] shrink-0" />
                      <span>{pest.name_hi}</span>
                    </CardTitle>
                    <p className="text-xs italic text-[#78350f] pl-6 mt-0.5">
                      वैज्ञानिक नाम: {pest.scientific}
                    </p>
                  </div>
                  <Badge variant="warning" size="sm">फसल: {pest.crop_hi}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-4 text-xs sm:text-sm">
                <div>
                  <strong className="text-[#14532d] block mb-0.5">हानि की प्रकृति एवं लक्षण:</strong>
                  <p className="text-[#374151] bg-[#f8faf5] p-2.5 rounded-lg border border-[#e5e7eb] leading-relaxed">
                    {pest.damageStage}
                  </p>
                </div>

                <div>
                  <strong className="text-[#15803d] block mb-0.5 flex items-center gap-1">
                    <ShieldCheck className="size-4 text-[#15803d]" />
                    <span>एकीकृत व जैविक नियंत्रण (IPM):</span>
                  </strong>
                  <p className="text-[#374151] leading-relaxed bg-[#f0fdf4] p-2.5 rounded-lg border border-[#bbf7d0]">
                    {pest.ipm}
                  </p>
                </div>

                <div>
                  <strong className="text-[#b91c1c] block mb-0.5">रासायनिक संस्तुति (केव्ल ETL स्तर पर):</strong>
                  <p className="text-[#374151] leading-relaxed">{pest.chemical}</p>
                </div>
              </CardContent>
            </div>

            <div className="p-4 bg-[#f8faf5] border-t border-[#e5e7eb]">
              <SourceBadge sourceName={pest.source} updatedAt={pest.updatedAt} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
