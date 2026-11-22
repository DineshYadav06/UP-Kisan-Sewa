"use client";

import React from "react";
import { Phone, Clock, ShieldCheck, MapPin, AlertCircle, ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { useI18n } from "@/lib/i18n";

export default function HelplinePage() {
  const { lang } = useI18n();

  const helplines = [
    {
      title: "किसान कॉल सेंटर (KCC) भारत सरकार",
      number: "1800-180-1551",
      tollFree: true,
      timing: "प्रातः 6:00 बजे से रात्रि 10:00 बजे तक (सप्ताह के सातों दिन)",
      scope: "फसल रोग, बुवाई सलाह, मौसम, खाद-बीज एवं विशेषज्ञ परामर्श (22 भारतीय भाषाओं में)",
      source: "कृषि मंत्रालय, भारत सरकार",
    },
    {
      title: "उ.प्र. कृषि विभाग टोल-फ्री हेल्पलाइन",
      number: "1800-120-1044",
      tollFree: true,
      timing: "कार्यदिवसों में 10:00 AM से 5:00 PM",
      scope: "कृषि यंत्रीकरण टोकन, बीज वितरण, सरकारी अनुदान व पंजीकरण पूछताछ",
      source: "कृषि विभाग, उत्तर प्रदेश",
    },
    {
      title: "पीएम किसान सम्मान निधि हेल्पलाइन",
      number: "155261 / 011-24300606",
      tollFree: false,
      timing: "कार्यालय समय",
      scope: "किस्त स्थिति, ई-केवाईसी एवं बैंक खाता आधार सीडिंग सहायता",
      source: "pmkisan.gov.in",
    },
    {
      title: "एनडीयूएटी विश्वविद्यालय विस्तार हेल्पलाइन",
      number: "05270-262024",
      tollFree: false,
      timing: "कार्यदिवसों में 9:30 AM से 5:00 PM",
      scope: "विश्वविद्यालय वैज्ञानिक सलाह, उन्नत बीज उपलब्धता व केवीके प्रशिक्षण",
      source: "NDUAT कुमारगंज, अयोध्या",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "कृषि हेल्पलाइन" : "Helplines" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "सत्यापित कृषि आपातकालीन एवं सहायता हेल्पलाइन" : "Verified Agriculture Helplines"}
          subtitle={
            lang === "hi"
              ? "उत्तर प्रदेश के किसानों हेतु भारत सरकार एवं राज्य कृषि विभाग द्वारा संचालित निःशुल्क टोल-फ्री नंबर"
              : "Official toll-free helpline directory for immediate crop advisory, government schemes, and expert guidance"
          }
        />
      </div>

      <div className="space-y-4 mb-8">
        {helplines.map((hl, idx) => (
          <Card key={idx} className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f3f4f6] pb-4 mb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#14532d]">{hl.title}</h3>
                <p className="text-xs text-[#6b7280] flex items-center gap-1.5 mt-1">
                  <Clock className="size-3.5 text-[#f97316]" />
                  <span>समय: {hl.timing}</span>
                </p>
              </div>

              <a
                href={`tel:${hl.number.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 bg-[#15803d] hover:bg-[#14532d] text-white px-4 py-2.5 rounded-xl font-bold text-sm sm:text-base shadow-xs shrink-0"
              >
                <Phone className="size-4" />
                <span>{hl.number}</span>
              </a>
            </div>

            <p className="text-xs sm:text-sm text-[#374151] leading-relaxed mb-3">
              <strong className="text-[#14532d]">सहायता क्षेत्र: </strong>
              {hl.scope}
            </p>

            <SourceBadge sourceName={hl.source} />
          </Card>
        ))}
      </div>

      <Alert type="warning" title="सावधानी सूचना">
        किसी भी फर्जी या अनाधिकृत नंबर पर व्यक्तिगत बैंक खाता नंबर, एटीएम पिन या ओटीपी साझा न करें। सभी आधिकारिक सरकारी हेल्पलाइन केवल निःशुल्क मार्गदर्शन हेतु हैं।
      </Alert>
    </div>
  );
}
