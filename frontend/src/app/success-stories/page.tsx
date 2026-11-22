"use client";

import React from "react";
import { Award, Sprout, MapPin, TrendingUp, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function SuccessStoriesPage() {
  const { lang } = useI18n();

  const stories = [
    {
      farmerName: "श्री राम सेवक वर्मा",
      district: "बाराबंकी",
      innovation: "प्राकृतिक खेती एवं मेंथा के साथ सहफसली खेती",
      achievement: "लागत में 40% कमी एवं शुद्ध लाभ में ₹1.5 लाख प्रति एकड़ की वृद्धि।",
      story: "एनडीयूएटी केवीके से प्रशिक्षण प्राप्त कर रासायनिक खादों का प्रयोग बंद किया और जीवामृत व घनजीवामृत का प्रयोग शुरू किया। मिट्टी की जलधारण क्षमता बढ़ी।",
      verifiedBy: "केवीके हैदरगढ़, बाराबंकी",
    },
    {
      farmerName: "श्रीमती कांति देवी",
      district: "अयोध्या",
      innovation: "महिला स्वयं सहायता समूह द्वारा बटन व ढींगरी मशरूम उत्पादन",
      achievement: "प्रति माह ₹25,000 की अतिरिक्त पारिवारिक आय।",
      story: "कृषि विज्ञान केंद्र कुमारगंज से मशरूम स्पॉन एवं कंपोस्ट तैयार करने का प्रशिक्षण प्राप्त किया। अब गाँव की 15 अन्य महिलाओं को भी रोजगार प्रदान कर रही हैं।",
      verifiedBy: "एनडीयूएटी प्रसार निदेशालय",
    },
    {
      farmerName: "श्री दिनेश चन्द्र त्रिपाठी",
      district: "सुल्तानपुर",
      innovation: "ड्रिप सिंचाई व मल्चिंग से शिमला मिर्च व तरबूज की संरक्षित खेती",
      achievement: "पारंपरिक धान-गेहूँ चक्र की तुलना में 3 गुना अधिक शुद्ध आय।",
      story: "उद्यान विभाग की 50% सब्सिडी योजना से ड्रिप सिंचाई संयंत्र स्थापित किया। कम पानी में बंपर पैदावार प्राप्त की।",
      verifiedBy: "केवीके कटका, सुल्तानपुर",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "सफलता की कहानियाँ" : "Success Stories" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "उत्तर प्रदेश के प्रगतिशील किसानों की सफलता की कहानियाँ" : "Farmer Success Stories"}
          subtitle={
            lang === "hi"
              ? "केवीके एवं एनडीयूएटी वैज्ञानिकों के मार्गदर्शन में नवाचार कर स्वावलंबी बने किसानों के वास्तविक प्रेरणादायक अनुभव"
              : "Documented case studies of progressive farmers adopting modern agronomic practices in Uttar Pradesh"
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stories.map((st, idx) => (
          <Card key={idx} className="flex flex-col justify-between">
            <div>
              <CardHeader className="bg-[#f0fdf4]">
                <div className="flex items-center justify-between">
                  <Badge variant="success">जनपद: {st.district}</Badge>
                  <Award className="size-5 text-[#eab308]" />
                </div>
                <CardTitle className="text-base sm:text-lg text-[#14532d] mt-2">
                  {st.farmerName}
                </CardTitle>
                <p className="text-xs font-semibold text-[#15803d] mt-0.5">{st.innovation}</p>
              </CardHeader>

              <CardContent className="space-y-3 pt-4 text-xs sm:text-sm">
                <div className="bg-[#f8faf5] p-3 rounded-lg border border-[#e5e7eb]">
                  <strong className="text-[#14532d] block text-xs">मुख्य उपलब्धि:</strong>
                  <span className="text-[#15803d] font-bold">{st.achievement}</span>
                </div>

                <p className="text-[#374151] leading-relaxed">
                  {st.story}
                </p>
              </CardContent>
            </div>

            <div className="p-3 bg-[#f8faf5] border-t border-[#e5e7eb]">
              <SourceBadge sourceName={st.verifiedBy} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
