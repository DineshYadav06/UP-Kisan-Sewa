"use client";

import React, { useState } from "react";
import { FlaskConical, CheckCircle, Search, Layers, AlertCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function SeedsFertilizersPage() {
  const { lang } = useI18n();
  const [tab, setTab] = useState<"seeds" | "fertilizers">("seeds");

  const seeds = [
    {
      crop: "गेहूँ",
      variety: "डीबीडब्ल्यू 187 (करन वंदना)",
      breeder: "आईसीएआर-आईआईडब्ल्यूबीआर / एनडीयूएटी",
      seedRate: "100 किग्रा/हेक्टेयर",
      treatment: "कार्बेन्डाजिम 2 ग्राम + थीरम 2 ग्राम प्रति किग्रा बीज",
      features: "समय पर बुवाई हेतु, रतुआ रोधी, उच्च प्रोटीन (12.5%), औसत उपज 61 कुंतल/हेक्टेयर।",
      source: "उ.प्र. बीज विकास निगम / एनडीयूएटी",
    },
    {
      crop: "धान",
      variety: "नरेंद्र धान 359",
      breeder: "एनडीयूएटी कुमारगंज, अयोध्या",
      seedRate: "30-35 किग्रा/हेक्टेयर (रोपाई हेतु)",
      treatment: "स्ट्रेप्टोसाइक्लिन 1 ग्राम + थीरम 25 ग्राम (25 किग्रा बीज हेतु)",
      features: "सिंचित मध्यम अवधि (125-130 दिन), रोगरोधी, चमकदार महीन दाना, उपज 55-60 कुंतल।",
      source: "एनडीयूएटी बीज निदेशालय",
    },
    {
      crop: "सरसों",
      variety: "नरेंद्र राई 1 (एनडीआर 8501)",
      breeder: "एनडीयूएटी कुमारगंज, अयोध्या",
      seedRate: "4-5 किग्रा/हेक्टेयर",
      treatment: "मेटालेक्सिल 6 ग्राम प्रति किग्रा बीज",
      features: "अवधि 120-125 दिन, तेल प्रतिशत 40-41%, सफेद रतुआ सहनशील, उपज 20-22 कुंतल।",
      source: "एनडीयूएटी तिलहन अनुभाग",
    },
  ];

  const fertilizers = [
    {
      name: "यूरिया (Urea - 46% N)",
      type: "नाइट्रोजन धारी",
      role: "पौधों की वानस्पतिक वृद्धि, हरियाली एवं कल्ले फूटने में सहायक।",
      application: "नीम लेपित यूरिया का प्रयोग करें। बुवाई पर 1/3 तथा शेष दो बार सिंचाई उपरांत दें।",
    },
    {
      name: "डी.ए.पी. (DAP - 18% N, 46% P2O5)",
      type: "फास्फेटिक",
      role: "जड़ों के सुदृढ़ विकास, तने की मजबूती एवं फूल/दाना बनने हेतु अनिवार्य।",
      application: "बुवाई के समय कूंड़ों में बीज के नीचे 3-4 सेमी गहराई पर दें। खड़ी फसल में छिड़कना अनुचित।",
    },
    {
      name: "म्यूरिएट ऑफ पोटाश (MOP - 60% K2O)",
      type: "पोटाशिक",
      role: "रोग प्रतिरोधक क्षमता, सूखा सहनशीलता एवं दाने के चमक व वजन में वृद्धि।",
      application: "बुवाई के समय बेसल डोज के रूप में दें।",
    },
    {
      name: "जिंक सल्फेट (21% Zn व 33% Zn)",
      type: "सूक्ष्म पोषक तत्व",
      role: "धान में खैरा रोग एवं गेहूँ में बौनापन रोकथाम हेतु अति आवश्यक।",
      application: "धान में 25 किग्रा जिंक सल्फेट (21%) प्रति हेक्टेयर बुवाई पूर्व मिट्टी में मिलाएँ।",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "बीज एवं उर्वरक" : "Seeds & Fertilizers" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "प्रमाणित बीज एवं संतुलित उर्वरक मार्गदर्शिका" : "Certified Seeds & Nutrient Management"}
          subtitle={
            lang === "hi"
              ? "एनडीयूएटी विकसित प्रजातियाँ, बीजोपचार विधियाँ एवं मृदा स्वास्थ्य आधारित संतुलित पोषक तत्व प्रबंधन (INM)"
              : "Scientifically approved crop varieties, seed treatments, and integrated balanced fertilizer guidelines"
          }
        />
      </div>

      <div className="flex gap-2 border-b border-[#e5e7eb] mb-6">
        <button
          type="button"
          onClick={() => setTab("seeds")}
          className={`px-4 py-2.5 font-bold text-sm border-b-2 transition-colors cursor-pointer ${
            tab === "seeds"
              ? "border-[#15803d] text-[#15803d]"
              : "border-transparent text-[#6b7280] hover:text-[#1f2937]"
          }`}
        >
          {lang === "hi" ? "प्रमाणित बीज एवं किस्में" : "Certified Seeds & Varieties"}
        </button>
        <button
          type="button"
          onClick={() => setTab("fertilizers")}
          className={`px-4 py-2.5 font-bold text-sm border-b-2 transition-colors cursor-pointer ${
            tab === "fertilizers"
              ? "border-[#15803d] text-[#15803d]"
              : "border-transparent text-[#6b7280] hover:text-[#1f2937]"
          }`}
        >
          {lang === "hi" ? "संतुलित उर्वरक एवं सूक्ष्म पोषक तत्व" : "Balanced Fertilizers & Micronutrients"}
        </button>
      </div>

      {tab === "seeds" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seeds.map((s, idx) => (
              <Card key={idx}>
                <CardHeader className="bg-[#f0fdf4]">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#14532d]">{s.variety}</CardTitle>
                    <Badge variant="success">{s.crop}</Badge>
                  </div>
                  <p className="text-xs text-[#15803d] font-semibold mt-1">विकासक: {s.breeder}</p>
                </CardHeader>
                <CardContent className="space-y-3 pt-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-[#14532d] block">अनुशंसित बीज दर:</strong>
                    <span className="text-[#374151]">{s.seedRate}</span>
                  </div>
                  <div>
                    <strong className="text-[#14532d] block">वैज्ञानिक बीजोपचार:</strong>
                    <span className="text-[#374151] bg-[#f8faf5] p-2 rounded block border border-[#e5e7eb] mt-0.5">
                      {s.treatment}
                    </span>
                  </div>
                  <div>
                    <strong className="text-[#14532d] block">प्रमुख विशेषताएं:</strong>
                    <p className="text-[#4b5563] leading-relaxed mt-0.5">{s.features}</p>
                  </div>
                </CardContent>
                <div className="p-3 bg-[#f8faf5] border-t border-[#e5e7eb]">
                  <SourceBadge sourceName={s.source} />
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fertilizers.map((f, idx) => (
              <Card key={idx}>
                <CardHeader className="bg-[#f8faf5]">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#14532d]">{f.name}</CardTitle>
                    <Badge variant="outline">{f.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-4 text-xs sm:text-sm">
                  <div>
                    <strong className="text-[#14532d] block">पौधे में कार्य एवं भूमिका:</strong>
                    <p className="text-[#374151] mt-0.5">{f.role}</p>
                  </div>
                  <div>
                    <strong className="text-[#15803d] block">वैज्ञानिक प्रयोग विधि व समय:</strong>
                    <p className="text-[#374151] bg-[#f0fdf4] p-2.5 rounded-lg border border-[#bbf7d0] mt-0.5">
                      {f.application}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="p-4 bg-[#fffbeb] border border-[#fde68a] rounded-xl text-xs sm:text-sm text-[#92400e]">
            <strong>गोल्डन रूल: </strong>उर्वरकों का प्रयोग सदैव 'मृदा स्वास्थ्य कार्ड' (Soil Health Card) की संस्तुति के अनुसार ही करें। रासायनिक खादों के साथ गोबर की खाद या केंचुआ खाद का अवश्य प्रयोग करें।
          </div>
        </div>
      )}
    </div>
  );
}
