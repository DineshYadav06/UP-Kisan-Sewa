"use client";

import React from "react";
import Link from "next/link";
import { Sprout, ExternalLink, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n";

export default function AdminCropsPage() {
  const { lang } = useI18n();

  const crops = [


    {
      name_hi: "गेहूँ (Wheat)",
      name_en: "Wheat",
      slug: "gehu-sample",
      season: "रबी (Rabi)",
      status: "प्रकाशित (Published)",
      varieties: "DBW 187, DBW 303, HD 2967, PBW 550",
      source: "NDUAT कुमारगंज / ICAR-IIWBR",
    },
    {
      name_hi: "धान (Paddy)",
      name_en: "Paddy",
      slug: "dhan-sample",
      season: "खरीफ (Kharif)",
      status: "प्रकाशित (Published)",
      varieties: "सरयू 52, NDR 359, पूसा बासमती 1509, काला नमक",
      source: "NDUAT कुमारगंज / ICAR-NRRI",
    },
    {
      name_hi: "सरसों (Mustard)",
      name_en: "Mustard",
      slug: "sarson-sample",
      season: "रबी (Rabi)",
      status: "प्रकाशित (Published)",
      varieties: "NDR 8501, वरूणा (T-59), पूसा मस्टर्ड 25",
      source: "NDUAT कुमारगंज / DRMR भरतपुर",
    },
    {
      name_hi: "अरहर / तूर (Pigeon Pea)",
      name_en: "Pigeon Pea",
      slug: "arhar-sample",
      season: "खरीफ / वार्षिक",
      status: "प्रकाशित (Published)",
      varieties: "नरेंद्र अरहर 1, बहार, मालवीय 13",
      source: "NDUAT कुमारगंज / ICAR-IIPR कानपुर",
    },
    {
      name_hi: "गन्ना (Sugarcane)",
      name_en: "Sugarcane",
      slug: "ganna-sample",
      season: "वार्षिक / शरद",
      status: "प्रकाशित (Published)",
      varieties: "Co-0238, Co-0118, CoLk-14201, Co-15023",
      source: "UPCSR शाहजहाँपुर / ICAR-IISR लखनऊ",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[
          { label: lang === "hi" ? "एडमिन" : "Admin", href: "/admin" },
          { label: lang === "hi" ? "फसल प्रबंधन" : "Crop Management" },
        ]}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 my-6">
        <div>
          <h1 className="text-2xl font-black text-[#14532d]">
            {lang === "hi" ? "फसल एवं वैज्ञानिक पैकेज प्रबंधन" : "Crop & Scientific Package Management"}
          </h1>
          <p className="text-xs text-[#6b7280]">
            {lang === "hi"
              ? "केवल NDUAT एवं ICAR अनुमोदित वैज्ञानिक पैकेज प्रकाशित किए जाते हैं"
              : "All agronomic packages verified against NDUAT & ICAR field trial standards"}
          </p>
        </div>
        <Badge variant="success">
          <ShieldCheck className="size-3.5 mr-1" />
          <span>{lang === "hi" ? "5 मुख्य फसलें सत्यापित" : "5 Verified Crop Packages"}</span>
        </Badge>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#14532d] text-white">
                <th className="p-3.5">{lang === "hi" ? "फसल का नाम" : "Crop Name"}</th>
                <th className="p-3.5">{lang === "hi" ? "मौसम" : "Season"}</th>
                <th className="p-3.5">{lang === "hi" ? "अनुमोदित किस्में" : "Certified Varieties"}</th>
                <th className="p-3.5">{lang === "hi" ? "सत्यापित स्रोत" : "Certified Source"}</th>
                <th className="p-3.5">{lang === "hi" ? "स्थिति" : "Status"}</th>
                <th className="p-3.5 text-right">{lang === "hi" ? "कार्रवाई" : "Action"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {crops.map((c, i) => (
                <tr key={i} className="hover:bg-[#f8faf5]">
                  <td className="p-3.5 font-bold text-[#14532d]">
                    {lang === "hi" ? c.name_hi : c.name_en}
                  </td>
                  <td className="p-3.5">{c.season}</td>
                  <td className="p-3.5 text-xs text-[#4b5563]">{c.varieties}</td>
                  <td className="p-3.5 text-xs">{c.source}</td>
                  <td className="p-3.5">
                    <Badge variant="success" size="sm">{c.status}</Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/crops/${c.slug}`}
                      className="inline-block text-xs font-bold text-[#15803d] hover:underline bg-[#f0fdf4] border border-[#bbf7d0] px-2.5 py-1 rounded"
                    >
                      {lang === "hi" ? "पैकेज देखें →" : "View Package →"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
