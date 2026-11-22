"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, PlusCircle, ExternalLink, CheckCircle, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n";

interface SchemeDirectoryItem {
  id: string;
  name_hi: string;
  name_en: string;
  slug: string;
  level: "केंद्र सरकार" | "उ.प्र. राज्य सरकार";
  level_en: "Central Govt" | "UP State Govt";
  category: string;
  benefit: string;
  official_url: string;
  verified_source: string;
  status: "active" | "updating";
}

const SCHEMES_REGISTRY: SchemeDirectoryItem[] = [
  {
    id: "s1",
    name_hi: "प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
    name_en: "PM Kisan Samman Nidhi",
    slug: "pm-kisan",
    level: "केंद्र सरकार",
    level_en: "Central Govt",
    category: "आय सहायता (Income Support)",
    benefit: "₹6,000 प्रति वर्ष (3 समान किश्तों में DBT)",
    official_url: "https://pmkisan.gov.in/",
    verified_source: "कृषि एवं किसान कल्याण मंत्रालय, भारत सरकार",
    status: "active",
  },
  {
    id: "s2",
    name_hi: "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
    name_en: "PM Fasal Bima Yojana",
    slug: "pmfby",
    level: "केंद्र सरकार",
    level_en: "Central Govt",
    category: "फसल जोखिम सुरक्षा (Crop Insurance)",
    benefit: "प्राकृतिक आपदा, बाढ़, सूखा या कीट प्रकोप पर पूर्ण वित्तीय क्लेम",
    official_url: "https://pmfby.gov.in/",
    verified_source: "pmfby.gov.in / कृषि विभाग उ.प्र.",
    status: "active",
  },
  {
    id: "s3",
    name_hi: "पीएम कुसुम योजना (सोलर सिंचाई पम्प)",
    name_en: "PM KUSUM Solar Pump Scheme",
    slug: "kusum-solar-pump",
    level: "केंद्र सरकार",
    level_en: "Central Govt",
    category: "सौर ऊर्जा व सिंचाई (Renewable Energy)",
    benefit: "सोलर पम्प स्थापना पर 60% तक प्रत्यक्ष सरकारी अनुदान (Subsidies)",
    official_url: "https://pmkusum.mnre.gov.in/",
    verified_source: "नवीन एवं नवीकरणीय ऊर्जा मंत्रालय / UPNEDA",
    status: "active",
  },
  {
    id: "s4",
    name_hi: "उत्तर प्रदेश खेत तालाब योजना",
    name_en: "UP Khet Talab Yojana",
    slug: "up-khet-talab",
    level: "उ.प्र. राज्य सरकार",
    level_en: "UP State Govt",
    category: "जल संरक्षण व संचयन (Water Conservation)",
    benefit: "खेत में तालाब निर्माण लागत पर 50% सरकारी अनुदान (अधिकतम ₹1,05,000)",
    official_url: "https://upagripardarshi.gov.in/",
    verified_source: "कृषि विभाग, उत्तर प्रदेश सरकार (पारदर्शी किसान सेवा पोर्टल)",
    status: "active",
  },
  {
    id: "s5",
    name_hi: "कृषि यंत्रीकरण एवं कस्टम हायरिंग सेंटर अनुदान",
    name_en: "Agri Mechanization Token System",
    slug: "krishi-yantrikaran-token",
    level: "उ.प्र. राज्य सरकार",
    level_en: "UP State Govt",
    category: "कृषि यंत्र (Farm Machinery)",
    benefit: "सुपर सीडर, हैप्पी सीडर, लेजर लैंड लेवलर व कस्टम हायरिंग पर 40-50% सब्सिडी",
    official_url: "https://upagriculture.com/",
    verified_source: "upagriculture.com (कृषि यंत्रीकरण ई-लॉटरी टोकन प्रणाली)",
    status: "active",
  },
];

export default function AdminSchemesPage() {
  const { lang } = useI18n();
  const [schemes, setSchemes] = useState(SCHEMES_REGISTRY);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[
          { label: lang === "hi" ? "एडमिन" : "Admin", href: "/admin" },
          { label: lang === "hi" ? "सरकारी योजना प्रबंधन" : "Scheme Management" },
        ]}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 my-6">
        <div>
          <h1 className="text-2xl font-black text-[#14532d]">
            {lang === "hi" ? "सरकारी योजना डायरेक्टरी प्रबंधन" : "Government Scheme Directory Management"}
          </h1>
          <p className="text-xs text-[#6b7280]">
            {lang === "hi"
              ? "केवल आधिकारिक .gov.in पोर्टलों के सत्यापन उपरांत लिंक एवं विवरण प्रकाशित किए जाते हैं"
              : "All schemes strictly mapped to authenticated .gov.in central and UP state portals"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">
            <ShieldCheck className="size-3.5 mr-1" />
            <span>{lang === "hi" ? "5 योजनाएं सत्यापित" : "5 Schemes Verified"}</span>
          </Badge>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#14532d] text-white">
                <th className="p-3.5">{lang === "hi" ? "योजना का नाम" : "Scheme Name"}</th>
                <th className="p-3.5">{lang === "hi" ? "स्तर" : "Level"}</th>
                <th className="p-3.5">{lang === "hi" ? "श्रेणी" : "Category"}</th>
                <th className="p-3.5">{lang === "hi" ? "अनुदान / मुख्य लाभ" : "Primary Benefit"}</th>
                <th className="p-3.5">{lang === "hi" ? "सत्यापित स्रोत" : "Source Portal"}</th>
                <th className="p-3.5 text-right">{lang === "hi" ? "कार्रवाई" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {schemes.map((s) => (
                <tr key={s.id} className="hover:bg-[#f8faf5]">
                  <td className="p-3.5">
                    <span className="font-bold text-[#14532d] block">
                      {lang === "hi" ? s.name_hi : s.name_en}
                    </span>
                    <span className="text-[11px] text-[#6b7280] font-mono">
                      /schemes/{s.slug}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#dcfce7] text-[#14532d]">
                      {lang === "hi" ? s.level : s.level_en}
                    </span>
                  </td>
                  <td className="p-3.5 font-medium text-[#374151]">{s.category}</td>
                  <td className="p-3.5 font-semibold text-[#15803d]">{s.benefit}</td>
                  <td className="p-3.5">
                    <a
                      href={s.official_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#0284c7] hover:underline text-xs"
                    >
                      <span>.gov.in पोर्टल</span>
                      <ExternalLink className="size-3" />
                    </a>
                  </td>
                  <td className="p-3.5 text-right">
                    <Link
                      href={`/schemes/${s.slug}`}
                      className="inline-block text-xs font-bold text-[#15803d] hover:underline bg-[#f0fdf4] border border-[#bbf7d0] px-2.5 py-1 rounded"
                    >
                      {lang === "hi" ? "विवरण देखें →" : "View Details →"}
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
