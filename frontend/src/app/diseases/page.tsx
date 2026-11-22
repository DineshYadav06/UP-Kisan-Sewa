"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, Search, Filter, AlertTriangle, ChevronRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function DiseasesPage() {
  const { lang } = useI18n();
  const [search, setSearch] = useState("");
  const [cropFilter, setCropFilter] = useState("all");

  const diseases = [
    {
      id: "yellow-rust",
      name_hi: "पीला रतुआ (Yellow Rust)",
      name_en: "Stripe / Yellow Rust",
      crop_hi: "गेहूँ",
      crop_id: "wheat",
      pathogen: "Puccinia striiformis",
      symptoms: "पत्तियों की ऊपरी सतह पर पीले रंग की धारियों के रूप में चूर्ण जैसा पाउडर दिखाई देता है। छूने पर हाथ पीला हो जाता है।",
      prevention: "रोधी किस्में जैसे डीबीडब्ल्यू 187, डीबीडब्ल्यू 303 लगाएं। खेत में नाइट्रोजन का अत्यधिक उपयोग न करें।",
      management: "लक्षण दिखते ही प्रोपिकोनाजोल 25% ईसी (1 मिली प्रति लीटर पानी) का छिड़काव करें।",
      source: "एनडीयूएटी पादप रोग विभाग",
      updatedAt: "2026-03-01",
    },
    {
      id: "blight-paddy",
      name_hi: "झुलसा रोग (Bacterial Leaf Blight)",
      name_en: "Bacterial Leaf Blight",
      crop_hi: "धान",
      crop_id: "paddy",
      pathogen: "Xanthomonas oryzae",
      symptoms: "पत्तियों के किनारों से नोक की ओर पीलापन और बाद में भूरा सूखापन फैलना, लहरदार किनारे बनना।",
      prevention: "बीज को स्ट्रेप्टोसाइक्लिन (1 ग्राम) + बाविस्टिन (20 ग्राम) 45 लीटर पानी में 25 किग्रा बीज को भिगोकर उपचारित करें।",
      management: "खेत से अतिरिक्त पानी निकालें। पोटाश का प्रयोग करें तथा स्ट्रेप्टोसाइक्लिन 15 ग्राम + कॉपर ऑक्सीक्लोराइड 500 ग्राम प्रति हेक्टेयर छिड़कें।",
      source: "एनडीयूएटी प्रसार निदेशालय",
      updatedAt: "2026-03-05",
    },
    {
      id: "white-rust-mustard",
      name_hi: "सफेद रतुआ / छाछिया (White Rust)",
      name_en: "White Rust",
      crop_hi: "सरसों",
      crop_id: "mustard",
      pathogen: "Albugo candida",
      symptoms: "पत्तियों की निचली सतह पर सफेद या हल्के पीले रंग के उभरे हुए फफोले दिखाई देना।",
      prevention: "समय से बुवाई (अक्टूबर प्रथम पखवाड़ा) करें। बीजोपचार मेटालेक्सिल से करें।",
      management: "मैनकोजेब 75% डब्ल्यूपी (2 ग्राम प्रति लीटर पानी) का 15 दिन के अंतराल पर 2 बार छिड़काव करें।",
      source: "आईसीएआर-डीआरएमआर / एनडीयूएटी",
      updatedAt: "2026-02-25",
    },
    {
      id: "red-rot-sugarcane",
      name_hi: "लाल सड़न रोग (Red Rot)",
      name_en: "Red Rot",
      crop_hi: "गन्ना",
      crop_id: "sugarcane",
      pathogen: "Colletotrichum falcatum",
      symptoms: "गन्ने की तीसरी-चौथी पत्ती सूखना, तना फाड़ने पर बीच में लाल रंग का गूदा व सफेद आड़े धब्बे दिखना, सिरके जैसी गंध।",
      prevention: "रोगमुक्त स्वस्थ बीज का चयन करें। ट्राइकोडर्मा विरिडी से मृदा उपचार करें। रोगरोधी किस्में लगाएं।",
      management: "प्रभावित थानों को उखाड़कर नष्ट करें। खेत में तुरंत जल निकासी करें। गन्ने की पेड़ी न रखें।",
      source: "उ.प्र. गन्ना शोध परिषद / एनडीयूएटी",
      updatedAt: "2026-03-02",
    },
    {
      id: "early-blight-potato",
      name_hi: "अगेती झुलसा (Early Blight)",
      name_en: "Early Blight",
      crop_hi: "आलू / टमाटर",
      crop_id: "potato",
      pathogen: "Alternaria solani",
      symptoms: "निचली पत्तियों पर गोल-गोल कत्थई रंग के छल्लेदार धब्बे (Target board symptom) बनना।",
      prevention: "प्रमाणित रोगमुक्त कंद बोएं। उचित फसल चक्र अपनाएं।",
      management: "मैनकोजेब 2.5 ग्राम प्रति लीटर पानी में घोल बनाकर छिड़कें।",
      source: "एनडीयूएटी सब्जी विज्ञान विभाग",
      updatedAt: "2026-03-08",
    },
  ];

  const filtered = diseases.filter((d) => {
    const matchCrop = cropFilter === "all" || d.crop_id === cropFilter;
    const matchSearch =
      search.trim() === "" ||
      d.name_hi.includes(search) ||
      d.name_en.toLowerCase().includes(search.toLowerCase()) ||
      d.crop_hi.includes(search);
    return matchCrop && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "फसल रोग प्रबंधन" : "Crop Disease Management" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "फसल रोग पहचान एवं वैज्ञानिक प्रबंधन" : "Crop Disease Directory & Management"}
          subtitle={
            lang === "hi"
              ? "उत्तर प्रदेश की प्रमुख फसलों में लगने वाले कवक, जीवाणु एवं विषाणु जनित रोगों के वैज्ञानिक लक्षण व अनुशंसित उपचार"
              : "Scientifically reviewed disease symptoms, causes, prevention, and expert-approved treatment methods"
          }
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-xs mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-3 size-4 text-[#9ca3af]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "hi" ? "रोग अथवा फसल का नाम खोजें..." : "Search disease or crop..."}
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
            <option value="wheat">गेहूँ (Wheat)</option>
            <option value="paddy">धान (Paddy)</option>
            <option value="mustard">सरसों (Mustard)</option>
            <option value="sugarcane">गन्ना (Sugarcane)</option>
            <option value="potato">आलू/सब्जियां (Potato)</option>
          </select>
        </div>
      </div>

      {/* Disease Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((dis) => (
          <Card key={dis.id} className="flex flex-col justify-between">
            <div>
              <CardHeader className="bg-[#fef2f2] border-b border-[#fee2e2]">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <CardTitle className="text-[#991b1b] flex items-center gap-1.5">
                      <ShieldAlert className="size-5 text-[#dc2626] shrink-0" />
                      <span>{dis.name_hi}</span>
                    </CardTitle>
                    <p className="text-xs italic text-[#7f1d1d] pl-6 mt-0.5">
                      रोगजनक कारक: {dis.pathogen}
                    </p>
                  </div>
                  <Badge variant="danger" size="sm">फसल: {dis.crop_hi}</Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-4 text-xs sm:text-sm">
                <div>
                  <strong className="text-[#14532d] block mb-0.5">प्रमुख लक्षण:</strong>
                  <p className="text-[#374151] bg-[#f8faf5] p-2.5 rounded-lg border border-[#e5e7eb] leading-relaxed">
                    {dis.symptoms}
                  </p>
                </div>

                <div>
                  <strong className="text-[#15803d] block mb-0.5">जैविक व सस्य रोकथाम:</strong>
                  <p className="text-[#374151] leading-relaxed">{dis.prevention}</p>
                </div>

                <div>
                  <strong className="text-[#b91c1c] block mb-0.5">वैज्ञानिक रासायनिक प्रबंधन (यदि आवश्यक हो):</strong>
                  <p className="text-[#374151] bg-[#fffbeb] p-2.5 rounded-lg border border-[#fef3c7] leading-relaxed">
                    {dis.management}
                  </p>
                </div>
              </CardContent>
            </div>

            <div className="p-4 bg-[#f8faf5] border-t border-[#e5e7eb]">
              <SourceBadge sourceName={dis.source} updatedAt={dis.updatedAt} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
