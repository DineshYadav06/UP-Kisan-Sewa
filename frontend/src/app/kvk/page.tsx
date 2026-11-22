"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Search, ExternalLink, Calendar, Building2 } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SourceBadge } from "@/components/ui/SourceBadge";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { useI18n } from "@/lib/i18n";

export default function KvkPage() {
  const { lang } = useI18n();
  const [search, setSearch] = useState("");

  const kvkList = [
    {
      districtHi: "अयोध्या",
      districtEn: "Ayodhya",
      nameHi: "कृषि विज्ञान केंद्र, एनडीयूएटी कुमारगंज",
      nameEn: "KVK NDUAT Kumarganj, Ayodhya",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "कुमारगंज, अयोध्या, उत्तर प्रदेश - 224229",
      addressEn: "Kumarganj, Ayodhya, UP - 224229",
      phone: "05270-262024",
      email: "kvkayodhya@nduat.org",
      focusHi: "प्रमाणित बीज उत्पादन, प्राकृतिक खेती, धान-गेहूँ फसल प्रणाली, पशुपालन",
      focusEn: "Certified Seed Production, Natural Farming, Rice-Wheat System, Animal Husbandry",
    },
    {
      districtHi: "अम्बेडकर नगर",
      districtEn: "Ambedkar Nagar",
      nameHi: "कृषि विज्ञान केंद्र, पांती (NDUAT)",
      nameEn: "KVK Panti, Ambedkar Nagar",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "पांती, कटेहरी, अम्बेडकर नगर, उत्तर प्रदेश",
      addressEn: "Panti, Katehari, Ambedkar Nagar, UP",
      phone: "05271-245310",
      email: "kvkambedkarnagar@nduat.org",
      focusHi: "सब्जी बीज उत्पादन, दलहन फसल विविधीकरण, वर्मीकम्पोस्ट",
      focusEn: "Vegetable Seed Production, Pulses Diversification, Vermicomposting",
    },
    {
      districtHi: "बाराबंकी",
      districtEn: "Barabanki",
      nameHi: "कृषि विज्ञान केंद्र, हैदरगढ़",
      nameEn: "KVK Haidergarh, Barabanki",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "हैदरगढ़, बाराबंकी, उत्तर प्रदेश",
      addressEn: "Haidergarh, Barabanki, UP",
      phone: "05244-242111",
      email: "kvk.barabanki@icar.gov.in",
      focusHi: "मेंथा व औषधीय खेती, उन्नत आलू उत्पादन, मधुमक्खी पालन",
      focusEn: "Mentha & Medicinal Crops, Advanced Potato, Beekeeping",
    },
    {
      districtHi: "सुल्तानपुर",
      districtEn: "Sultanpur",
      nameHi: "कृषि विज्ञान केंद्र, कटका (NDUAT)",
      nameEn: "KVK Katka, Sultanpur",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "कटका, सुल्तानपुर, उत्तर प्रदेश",
      addressEn: "Katka, Sultanpur, UP",
      phone: "05362-240120",
      email: "kvksultanpur@nduat.org",
      focusHi: "दलहन-तिलहन, मशरूम उत्पादन, संरक्षित पॉलीहाउस खेती",
      focusEn: "Pulses & Oilseeds, Mushroom Cultivation, Polyhouse Farming",
    },
    {
      districtHi: "बस्ती",
      districtEn: "Basti",
      nameHi: "कृषि विज्ञान केंद्र, बस्ती (NDUAT)",
      nameEn: "KVK Basti (NDUAT)",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "बस्ती, उत्तर प्रदेश",
      addressEn: "Basti, UP",
      phone: "05542-282145",
      email: "kvkbasti@nduat.org",
      focusHi: "गन्ना-सरसों अंतःखेती, मत्स्य पालन, ड्रिप सूक्ष्म सिंचाई",
      focusEn: "Sugarcane-Mustard Intercropping, Fisheries, Drip Irrigation",
    },
    {
      districtHi: "गोंडा",
      districtEn: "Gonda",
      nameHi: "कृषि विज्ञान केंद्र, मनकापुर (NDUAT)",
      nameEn: "KVK Mankapur, Gonda",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "मनकापुर, गोंडा, उत्तर प्रदेश",
      addressEn: "Mankapur, Gonda, UP",
      phone: "05265-233400",
      email: "kvkgonda@nduat.org",
      focusHi: "मक्का उत्पादन तकनीक, जैविक खाद, वर्मीकम्पोस्ट, मृदा परीक्षण",
      focusEn: "Maize Production Tech, Bio-fertilizers, Vermicompost, Soil Testing",
    },
    {
      districtHi: "गोरखपुर",
      districtEn: "Gorakhpur",
      nameHi: "कृषि विज्ञान केंद्र, बेलीपार",
      nameEn: "KVK Belipar, Gorakhpur",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "बेलीपार, गोरखपुर, उत्तर प्रदेश",
      addressEn: "Belipar, Gorakhpur, UP",
      phone: "0551-240012",
      email: "kvkgorakhpur@icar.gov.in",
      focusHi: "सब्जी पौधशाला, बैकयार्ड मुर्गी पालन, केला व पपीता बागवानी",
      focusEn: "Vegetable Nursery, Poultry, Banana & Papaya Horticulture",
    },
    {
      districtHi: "वाराणसी",
      districtEn: "Varanasi",
      nameHi: "कृषि विज्ञान केंद्र, कल्लूपुर (ICAR-IIVR)",
      nameEn: "KVK Kallupur (ICAR-IIVR), Varanasi",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "भारतीय सब्जी अनुसंधान संस्थान (IIVR), कल्लूपुर, वाराणसी",
      addressEn: "ICAR-IIVR, Kallupur, Varanasi, UP",
      phone: "0542-2635293",
      email: "kvk.iivr@icar.gov.in",
      focusHi: "उन्नत सब्जी किस्में, संरक्षित खेती, मूल्य संवर्धन, निर्यात ग्रेड कृषि",
      focusEn: "High-Yield Vegetables, Protected Farming, Value Addition, Export Quality Agri",
    },
    {
      districtHi: "प्रयागराज",
      districtEn: "Prayagraj",
      nameHi: "कृषि विज्ञान केंद्र, करछना (SHUATS)",
      nameEn: "KVK Karchhana, Prayagraj",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "करछना, प्रयागराज, उत्तर प्रदेश",
      addressEn: "Karchhana, Prayagraj, UP",
      phone: "0532-2684281",
      email: "kvk.allahabad@icar.gov.in",
      focusHi: "अमरूद बागवानी जीआई प्रबंधन, दलहन फसल चक्र, जैविक कीटनाशक",
      focusEn: "Guava GI Management, Pulse Rotation, Bio-pesticides",
    },
    {
      districtHi: "लखनऊ",
      districtEn: "Lucknow",
      nameHi: "कृषि विज्ञान केंद्र, बक्शी का तालाब (ICAR-CISH)",
      nameEn: "KVK Bakshi Ka Talab, Lucknow",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "रहमानखेड़ा / बक्शी का तालाब, लखनऊ, उत्तर प्रदेश",
      addressEn: "Rehmankhera / BKT, Lucknow, UP",
      phone: "0522-2841022",
      email: "kvklucknow@cish.res.in",
      focusHi: "उपोष्ण बागवानी (आम, अमरूद, आंवला), खाद्य प्रसंस्करण, नर्सरी तकनीक",
      focusEn: "Subtropical Horticulture (Mango, Guava), Food Processing, Nursery",
    },
    {
      districtHi: "कानपुर नगर",
      districtEn: "Kanpur Nagar",
      nameHi: "कृषि विज्ञान केंद्र, चौबेपुर (CSAUAT)",
      nameEn: "KVK Chaubeypur, Kanpur",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "चौबेपुर, कानपुर नगर, उत्तर प्रदेश",
      addressEn: "Chaubeypur, Kanpur Nagar, UP",
      phone: "0512-2534156",
      email: "kvkkanpur@csauk.ac.in",
      focusHi: "मक्का-आलू-गेहूँ चक्र, ड्रोन छिड़काव प्रशिक्षण, फसल अवशेष प्रबंधन",
      focusEn: "Maize-Potato-Wheat Rotation, Agri Drone Spraying, Crop Residue Mgmt",
    },
    {
      districtHi: "मेरठ",
      districtEn: "Meerut",
      nameHi: "कृषि विज्ञान केंद्र, हस्तिनापुर (SVPUAT)",
      nameEn: "KVK Hastinapur, Meerut",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "हस्तिनापुर, मेरठ, उत्तर प्रदेश",
      addressEn: "Hastinapur, Meerut, UP",
      phone: "0121-2800100",
      email: "kvkmeerut@svpuat.edu.in",
      focusHi: "गन्ना जल प्रबंधन, उच्च घनत्व बागवानी, डेयरी पशु स्वास्थ्य",
      focusEn: "Sugarcane Water Saving, High-Density Orchards, Dairy Livestock Health",
    },
    {
      districtHi: "झांसी",
      districtEn: "Jhansi",
      nameHi: "कृषि विज्ञान केंद्र, भरारी (RLBCAU / IGFRI)",
      nameEn: "KVK Bharari, Jhansi",
      headHi: "वरिष्ठ वैज्ञानिक एवं अध्यक्ष",
      headEn: "Senior Scientist & Head",
      addressHi: "रानी लक्ष्मी बाई केंद्रीय कृषि वि.वि. / भरारी, झांसी",
      addressEn: "RLBCAU Campus / Bharari, Jhansi, UP",
      phone: "0510-2730150",
      email: "kvkjhansi@rlbcau.ac.in",
      focusHi: "बुंदेलखंड सूखा सहनशील फसलें, चारा एवं श्रीअन्न (मिलेट्स), जल संचयन",
      focusEn: "Bundelkhand Drought-Tolerant Crops, Fodder & Millets, Rainwater Harvesting",
    },
  ];

  const filtered = kvkList.filter((k) => {
    const s = search.trim().toLowerCase();
    return (
      s === "" ||
      k.districtHi.includes(s) ||
      k.districtEn.toLowerCase().includes(s) ||
      k.nameHi.includes(s) ||
      k.nameEn.toLowerCase().includes(s) ||
      k.focusHi.includes(s) ||
      k.focusEn.toLowerCase().includes(s)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "केवीके व विश्वविद्यालय" : "KVK & Universities" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "कृषि विज्ञान केंद्र (KVK) एवं विश्वविद्यालय संदर्शिका" : "KVK & Agriculture Universities Directory"}
          subtitle={
            lang === "hi"
              ? "आचार्य नरेंद्र देव कृषि एवं प्रौद्योगिकी विश्वविद्यालय (NDUAT) एवं ICAR के अंतर्गत संचालित कृषि विज्ञान केंद्र, संपर्क सूत्र व प्रशिक्षण केंद्र"
              : "Direct contact details, training programs, and scientific advisory units of Krishi Vigyan Kendras across UP"
          }
        />
      </div>

      {/* University Card */}
      <div className="bg-gradient-to-r from-[#14532d] to-[#15803d] text-white p-6 rounded-xl shadow-xs mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-14 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <GraduationCap className="size-8 text-[#eab308]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black">
                {lang === "hi"
                  ? "आचार्य नरेंद्र देव कृषि एवं प्रौद्योगिकी विश्वविद्यालय"
                  : "Acharya Narendra Deva University of Agriculture & Technology"}
              </h3>
              <p className="text-xs sm:text-sm text-[#86efac]">
                NDUAT Kumarganj, Ayodhya (Accredited A++ by NAAC) • ICAR Affiliated
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://nduat.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#eab308] hover:bg-[#ca8a04] text-[#1f2937] font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-xs"
            >
              <span>{lang === "hi" ? "NDUAT आधिकारिक पोर्टल" : "NDUAT Official Portal"}</span>
              <ExternalLink className="size-4" />
            </a>
            <a
              href="https://mcaet.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg border border-white/20"
            >
              <span>MCAET</span>
              <ExternalLink className="size-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-xl border border-[#e5e7eb] shadow-xs mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 size-4 text-[#9ca3af]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              lang === "hi"
                ? "जनपद या केंद्र का नाम खोजें (उदा. अयोध्या, बाराबंकी, सुल्तानपुर, गोरखपुर, मिलेट्स)..."
                : "Search district or KVK center (e.g. Ayodhya, Barabanki, Lucknow, Millets)..."
            }
            className="w-full pl-9 pr-4 py-2 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#15803d]"
          />
        </div>
      </div>

      {/* KVK Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filtered.map((kvk, idx) => (
          <Card key={idx} className="flex flex-col justify-between hover:border-[#86efac] transition-all">
            <div>
              <CardHeader className="bg-[#f8faf5]">
                <div className="flex items-center justify-between">
                  <Badge variant="success">
                    {lang === "hi" ? `जनपद: ${kvk.districtHi}` : `District: ${kvk.districtEn}`}
                  </Badge>
                  <span className="text-[11px] text-[#6b7280]">ICAR / NDUAT</span>
                </div>
                <CardTitle className="text-base font-bold text-[#14532d] mt-2">
                  {lang === "hi" ? kvk.nameHi : kvk.nameEn}
                </CardTitle>
                <p className="text-xs text-[#6b7280]">{lang === "hi" ? kvk.headHi : kvk.headEn}</p>
              </CardHeader>

              <CardContent className="space-y-2.5 pt-4 text-xs sm:text-sm">
                <div className="flex items-start gap-2 text-[#4b5563]">
                  <MapPin className="size-4 text-[#f97316] shrink-0 mt-0.5" />
                  <span>{lang === "hi" ? kvk.addressHi : kvk.addressEn}</span>
                </div>
                <div className="flex items-center gap-2 text-[#4b5563]">
                  <Phone className="size-4 text-[#15803d] shrink-0" />
                  <a href={`tel:${kvk.phone}`} className="font-semibold text-[#14532d] hover:underline">
                    {kvk.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#4b5563]">
                  <Mail className="size-4 text-[#0284c7] shrink-0" />
                  <span className="text-xs">{kvk.email}</span>
                </div>
                <div className="bg-[#f0fdf4] p-2.5 rounded-lg border border-[#bbf7d0] mt-2">
                  <strong className="text-[#14532d] block text-xs mb-0.5">
                    {lang === "hi" ? "विशेषज्ञता क्षेत्र:" : "Key Focus Areas:"}
                  </strong>
                  <p className="text-xs text-[#374151]">
                    {lang === "hi" ? kvk.focusHi : kvk.focusEn}
                  </p>
                </div>
              </CardContent>
            </div>

            <div className="p-3 bg-[#f8faf5] border-t border-[#e5e7eb] flex items-center justify-between text-xs">
              <span className="text-[#6b7280]">{lang === "hi" ? "प्रशिक्षण केंद्र" : "Training Center"}</span>
              <Link href="/ask-expert" className="font-bold text-[#15803d] hover:underline">
                {lang === "hi" ? "विशेषज्ञ से संपर्क करें →" : "Consult Scientist →"}
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
