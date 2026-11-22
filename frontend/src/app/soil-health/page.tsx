"use client";

import React from "react";
import { Layers, TestTube2, CheckCircle2, MapPin, FileText, ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n";

export default function SoilHealthPage() {
  const { lang } = useI18n();

  const soilSteps = [
    {
      step: "चरण 1",
      title: "खेत से नमूना एकत्र करने का सही समय",
      desc: "फसल कटाई के उपरांत तथा अगली बुवाई से पूर्व जब खेत खाली हो और उचित नमी हो। खाद डालने के तुरंत बाद नमूना न लें।",
    },
    {
      step: "चरण 2",
      title: "'V' आकार का गड्ढा बनाना",
      desc: "खेत में 8-10 अलग-अलग स्थानों का चयन 'जिग-जैग' (Zig-Zag) विधि से करें। खुरपी से 15 सेमी (6 इंच) गहरा 'V' आकार का गड्ढा खोदें।",
    },
    {
      step: "चरण 3",
      title: "मिट्टी की परत एकत्र करना",
      desc: "गड्ढे की एक तरफ की सतह से ऊपर से नीचे तक 1 इंच मोटी मिट्टी की परत खुरचकर बाल्टी में एकत्र करें।",
    },
    {
      step: "चरण 4",
      title: "मिश्रण व चौथाईकरण (Quartering)",
      desc: "सभी नमूनों को साफ बोरी पर मिलाकर गोल ढेर बनाएं। चार बराबर भाग करें, दो विपरीत भाग हटाएं। जब तक 500 ग्राम मिट्टी शेष न रहे, दोहराएं।",
    },
    {
      step: "चरण 5",
      title: "लेबलिंग व लैब भेजना",
      desc: "छाया में सुखाकर साफ पॉलीथीन बैग में किसान का नाम, गाटा/खसरा संख्या, फसल व मोबाइल नंबर लिखकर निकटतम मृदा परीक्षण प्रयोगशाला या केवीके को भेजें।",
    },
  ];

  const labs = [
    { district: "अयोध्या", labName: "मृदा परीक्षण प्रयोगशाला, कृषि विज्ञान केंद्र (NDUAT)", location: "कुमारगंज, अयोध्या", phone: "05270-262024" },
    { district: "सुल्तानपुर", labName: "विभागीय मृदा परीक्षण प्रयोगशाला, उप कृषि निदेशक कार्यालय", location: "सुल्तानपुर मुख्यालय", phone: "1800-180-1551" },
    { district: "बाराबंकी", labName: "मृदा परीक्षण लैब, कृषि विभाग", location: "हैदरगढ़ रोड, बाराबंकी", phone: "1800-180-1551" },
    { district: "बस्ती", labName: "केवीके मृदा जांच केंद्र (NDUAT)", location: "बस्ती", phone: "05542-282145" },
    { district: "गोरखपुर", labName: "मृदा स्वास्थ्य प्रयोगशाला, कृषि भवन", location: "गोरखपुर", phone: "1800-180-1551" },
    { district: "वाराणसी", labName: "मृदा परीक्षण केंद्र, कृषि विज्ञान केंद्र", location: "कल्लूपुर, वाराणसी", phone: "1800-180-1551" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "मृदा स्वास्थ्य व परीक्षण" : "Soil Health & Testing" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "मृदा स्वास्थ्य कार्ड एवं परीक्षण मार्गदर्शिका" : "Soil Health Card & Soil Testing"}
          subtitle={
            lang === "hi"
              ? "खेत की मिट्टी का वैज्ञानिक नमूना लेने की सही विधि, 12 पोषक तत्वों की जांच एवं निकटतम लैब डायरेक्टरी"
              : "Standard soil sampling protocol, Soil Health Card interpretation, and accredited testing laboratories across UP"
          }
        />
      </div>

      {/* Sampling Process */}
      <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-xs mb-8">
        <h3 className="text-lg font-bold text-[#14532d] mb-4 flex items-center gap-2">
          <TestTube2 className="size-5 text-[#15803d]" />
          <span>मिट्टी का नमूना लेने की प्रामाणिक 5-चरणीय विधि</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {soilSteps.map((st, idx) => (
            <div key={idx} className="p-4 bg-[#f8faf5] border border-[#e5e7eb] rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded inline-block mb-2">
                  {st.step}
                </span>
                <h4 className="font-bold text-sm text-[#14532d] mb-1">{st.title}</h4>
                <p className="text-xs text-[#4b5563] leading-relaxed">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lab Directory */}
      <div className="bg-white p-6 rounded-xl border border-[#e5e7eb] shadow-xs mb-8">
        <h3 className="text-lg font-bold text-[#14532d] mb-4 flex items-center gap-2">
          <MapPin className="size-5 text-[#f97316]" />
          <span>उत्तर प्रदेश मृदा परीक्षण प्रयोगशाला डायरेक्टरी (KVK एवं विभागीय लैब)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {labs.map((lb, idx) => (
            <div key={idx} className="p-4 bg-[#f8faf5] border border-[#e5e7eb] rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#15803d] bg-[#dcfce7] px-2 py-0.5 rounded">
                  जनपद: {lb.district}
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#14532d] mt-1">{lb.labName}</h4>
              <p className="text-xs text-[#6b7280] mt-1">{lb.location}</p>
              <p className="text-xs text-[#0284c7] font-semibold mt-2">संपर्क: {lb.phone}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between bg-[#f0fdf4] border border-[#bbf7d0] p-4 rounded-xl">
        <SourceBadge
          sourceName="कृषि विभाग उत्तर प्रदेश / एनडीयूएटी मृदा विज्ञान विभाग"
          sourceUrl="https://soilhealth.dac.gov.in/"
        />
        <a
          href="https://soilhealth.dac.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-bold text-[#15803d] hover:underline"
        >
          आधिकारिक सॉइल हेल्थ कार्ड पोर्टल देखें →
        </a>
      </div>
    </div>
  );
}
