"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  User,
  GraduationCap,
  ExternalLink,
  Code,
  Building,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { lang } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <Breadcrumbs
        items={[{ label: lang === "hi" ? "संपर्क करें" : "Contact Us" }]}
      />

      <div className="my-6">
        <SectionHeader
          title={lang === "hi" ? "संपर्क एवं सहायता केंद्र (Contact Us)" : "Contact & Support"}
          subtitle="अवध किसान सेवा परियोजना दल, अकादमिक मेंटर एवं तकनीकी सहायता केंद्र"
        />
      </div>

      {/* Leadership & Development Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Project Lead */}
        <div className="bg-white border-2 border-[#15803d]/40 hover:border-[#15803d] rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#dcfce7]/40 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center justify-between mb-5">
              <Badge variant="success" size="md">परियोजना प्रमुख एवं अकादमिक मेंटर (Project Lead)</Badge>
              <div className="size-9 rounded-full bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                <GraduationCap className="size-5" />
              </div>
            </div>

            {/* Profile Frame with Photo & Details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
              <div className="relative shrink-0">
                <div className="size-28 sm:size-32 rounded-2xl overflow-hidden border-3 border-[#15803d] shadow-md p-1 bg-gradient-to-br from-[#15803d] via-[#86efac] to-[#eab308]">
                  <img
                    src="/contactus/neeraj.png"
                    alt="Dr. Neeraj Kumar Singh"
                    className="w-full h-full object-cover rounded-xl bg-white"
                  />
                </div>
                <span className="absolute -bottom-2 -right-1 bg-[#15803d] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white shadow-xs">
                  Verified
                </span>
              </div>

              <div className="text-center sm:text-left flex-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#14532d] mb-1">
                  Dr. Neeraj Kumar Singh
                </h3>
                <p className="text-sm font-bold text-[#15803d]">
                  Assistant Professor (सहायक प्राध्यापक)
                </p>
                <p className="text-xs text-[#4b5563] mt-0.5">
                  Specialization: <strong className="text-[#14532d]">Renewable Energy Engineering</strong>
                </p>
                <p className="text-xs text-[#059669] font-medium mt-1">
                  महामाया कृषि अभियांत्रिकी एवं प्रौद्योगिकी महाविद्यालय (MCAET), NDUAT
                </p>

                {/* Professional Commendation */}
                <p className="text-[11px] sm:text-xs text-[#4b5563] leading-relaxed mt-2.5 bg-[#f0fdf4] p-2.5 rounded-lg border border-[#86efac]/40">
                  अकादमिक मेंटर एवं परियोजना प्रमुख — नवीकरणीय ऊर्जा, स्मार्ट फार्मिंग एवं कृषि यंत्रीकरण अनुसंधान में दीर्घकालीन अनुभव। अवध किसान सेवा मंच के समग्र नीति निर्माण, शोध संवर्धन एवं किसान कल्याण के मार्गदर्शक।
                </p>
              </div>
            </div>

            {/* Contact Details & Links */}
            <div className="space-y-2.5 text-xs sm:text-sm bg-[#f8faf5] p-4 rounded-xl border border-[#e5e7eb]">
              <div className="flex items-center gap-2.5 text-[#374151]">
                <Phone className="size-4 text-[#15803d] shrink-0" />
                <span className="font-semibold">फ़ोन: </span>
                <a href="tel:+918329321490" className="text-[#14532d] font-bold hover:underline">
                  +91 8329321490
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-[#374151]">
                <Mail className="size-4 text-[#0284c7] shrink-0" />
                <span className="font-semibold">ईमेल: </span>
                <a href="mailto:linknrjanduat@gmail.com" className="text-[#0284c7] font-bold hover:underline break-all">
                  linknrjanduat@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-[#4b5563] pt-1.5 border-t border-[#e5e7eb]">
                <Building className="size-4 text-[#6b7280] shrink-0 mt-0.5" />
                <span>विभाग: नवीकरणीय ऊर्जा अभियांत्रिकी, MCAET (NDUAT, अयोध्या)</span>
              </div>
            </div>
          </div>

          {/* LinkedIn Button CTA */}
          <div className="mt-5 pt-4 border-t border-[#e5e7eb] flex flex-wrap items-center justify-between gap-3">
            <a
              href="https://www.linkedin.com/in/linknrj?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#005f93] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn प्रोफाइल देखें</span>
              <ExternalLink className="size-3.5" />
            </a>

            <a
              href="tel:+918329321490"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803d] hover:underline"
            >
              <Phone className="size-3.5" />
              <span>कॉल करें</span>
            </a>
          </div>
        </div>

        {/* Lead Developer */}
        <div className="bg-white border-2 border-[#eab308]/50 hover:border-[#eab308] rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#fef08a]/30 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-5">
              <Badge variant="accent" size="md">मुख्य डेवलपर एवं सिस्टम आर्किटेक्ट (Lead Developer)</Badge>
              <div className="size-9 rounded-full bg-[#fef9c3] flex items-center justify-center text-[#ca8a04]">
                <Code className="size-5" />
              </div>
            </div>

            {/* Profile Frame with Photo & Details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
              <div className="relative shrink-0">
                <div className="size-28 sm:size-32 rounded-2xl overflow-hidden border-3 border-[#eab308] shadow-md p-1 bg-gradient-to-br from-[#eab308] via-[#fde047] to-[#15803d]">
                  <img
                    src="/contactus/Akhil.png"
                    alt="Akhil Yadav"
                    className="w-full h-full object-cover rounded-xl bg-white"
                  />
                </div>
                <span className="absolute -bottom-2 -right-1 bg-[#ca8a04] text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white shadow-xs">
                  Lead Dev
                </span>
              </div>

              <div className="text-center sm:text-left flex-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#14532d] mb-1">
                  Akhil Yadav
                </h3>
                <p className="text-sm font-bold text-[#15803d]">
                  B.Tech 4th Year Student
                </p>
                <p className="text-xs text-[#4b5563] mt-0.5">
                  Specialization: <strong className="text-[#14532d]">Computer Science & Engineering</strong>
                </p>
                <p className="text-xs text-[#ca8a04] font-semibold mt-1">
                  महामाया कृषि अभियांत्रिकी एवं प्रौद्योगिकी महाविद्यालय (MCAET), NDUAT
                </p>

                {/* Professional Commendation */}
                <p className="text-[11px] sm:text-xs text-[#4b5563] leading-relaxed mt-2.5 bg-[#fefce8] p-2.5 rounded-lg border border-[#fef08a]">
                  मुख्य डेवलपर एवं सिस्टम आर्किटेक्ट — फुल-स्टैक वेब डेवलपमेंट, आधुनिक क्लाउड टेक्नोलॉजी, फास्टएपीआई बैकएंड, डेटाबेस डिजाइन एवं किसान-अनुकूल डिजिटल इंटरफेस के विशेषज्ञ। अवध किसान सेवा के तकनीकी आर्किटेक्चर एवं सुरक्षा के मुख्य शिल्पकार।
                </p>
              </div>
            </div>

            {/* Contact Details & Links */}
            <div className="space-y-2.5 text-xs sm:text-sm bg-[#f8faf5] p-4 rounded-xl border border-[#e5e7eb]">
              <div className="flex items-center gap-2.5 text-[#374151]">
                <Phone className="size-4 text-[#15803d] shrink-0" />
                <span className="font-semibold">फ़ोन: </span>
                <a href="tel:9794945167" className="text-[#14532d] font-bold hover:underline">
                  +91 97949 45167
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-[#374151]">
                <Mail className="size-4 text-[#0284c7] shrink-0" />
                <span className="font-semibold">ईमेल: </span>
                <a href="mailto:akhil78026@gmail.com" className="text-[#0284c7] font-bold hover:underline break-all">
                  akhil78026@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-[#4b5563] pt-1.5 border-t border-[#e5e7eb]">
                <Building className="size-4 text-[#6b7280] shrink-0 mt-0.5" />
                <span>विभाग: कंप्यूटर साइंस एंड इंजीनियरिंग, MCAET (NDUAT, अयोध्या)</span>
              </div>
            </div>
          </div>

          {/* LinkedIn Button CTA */}
          <div className="mt-5 pt-4 border-t border-[#e5e7eb] flex flex-wrap items-center justify-between gap-3">
            <a
              href="https://www.linkedin.com/in/akhil-yadav-4ba586266?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#005f93] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
              <span>LinkedIn प्रोफाइल देखें</span>
              <ExternalLink className="size-3.5" />
            </a>

            <a
              href="tel:9794945167"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803d] hover:underline"
            >
              <Phone className="size-3.5" />
              <span>कॉल करें</span>
            </a>
          </div>
        </div>
      </div>

      {/* Institutional Details & Official Reference Links */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e5e7eb] shadow-xs mb-8">
        <h3 className="text-lg font-black text-[#14532d] mb-4 flex items-center gap-2">
          <GraduationCap className="size-6 text-[#15803d]" />
          <span>संबद्ध शैक्षणिक संस्थान एवं आधिकारिक पोर्टल संदर्भ</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-[#f8faf5] rounded-xl border border-[#e5e7eb]">
            <h4 className="font-bold text-[#14532d] text-base mb-1">
              आचार्य नरेंद्र देव कृषि एवं प्रौद्योगिकी विश्वविद्यालय (ANDUAT)
            </h4>
            <p className="text-xs text-[#4b5563] leading-relaxed mb-3">
              उत्तर प्रदेश का अग्रणी कृषि विश्वविद्यालय जो शिक्षा, अनुसंधान एवं कृषि प्रसार के माध्यम से पूर्वांचल व अवध क्षेत्र के किसानों की सेवा में समर्पित है।
            </p>
            <p className="text-xs text-[#6b7280] mb-3">स्थान: कुमारगंज, अयोध्या - 224229, उत्तर प्रदेश</p>
            <a
              href="https://nduat.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803d] hover:underline"
            >
              <span>https://nduat.org/ (आधिकारिक वेबसाइट)</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>

          <div className="p-4 bg-[#f8faf5] rounded-xl border border-[#e5e7eb]">
            <h4 className="font-bold text-[#14532d] text-base mb-1">
              महामाया कृषि अभियांत्रिकी एवं प्रौद्योगिकी महाविद्यालय (MCAET)
            </h4>
            <p className="text-xs text-[#4b5563] leading-relaxed mb-3">
              NDUAT का प्रतिष्ठित इंजीनियरिंग संकाय, जहाँ कृषि यंत्रीकरण, नवीकरणीय ऊर्जा, मृदा-जल संरक्षण एवं कंप्यूटर अनुप्रयोग में तकनीकी नवाचार किए जाते हैं।
            </p>
            <p className="text-xs text-[#6b7280] mb-3">स्थान: अकबरपुर, अम्बेडकर नगर, उत्तर प्रदेश</p>
            <a
              href="https://mcaet.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803d] hover:underline"
            >
              <span>https://mcaet.vercel.app/ (कॉलेज पोर्टल)</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e5e7eb] shadow-xs">
        <h3 className="font-bold text-[#14532d] text-lg mb-2">सीधा संपर्क अथवा सुझाव प्रेषित करें</h3>
        <p className="text-xs text-[#6b7280] mb-6">
          पोर्टल अथवा कृषि तकनीकी सुधार संबंधी किसी भी सुझाव के लिए नीचे दिया गया फॉर्म भरें:
        </p>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="size-12 text-[#15803d] mx-auto mb-2" />
            <h4 className="font-bold text-[#14532d] text-lg">आपका संदेश प्राप्त हुआ!</h4>
            <p className="text-xs text-[#6b7280] mt-1">परियोजना दल शीघ्र ही आपके संपर्क सूत्र पर प्रतिक्रिया देगा।</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#14532d] mb-1">आपका नाम *</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. अमित कुमार"
                  className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#15803d]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#14532d] mb-1">मोबाइल नंबर *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-अंकीय मोबाइल"
                  className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#15803d]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14532d] mb-1">संदेश विषय *</label>
              <input
                type="text"
                required
                placeholder="उदा. फसल रोग परामर्श / पोर्टल सुझाव"
                className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#15803d]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#14532d] mb-1">संदेश का विवरण *</label>
              <textarea
                rows={4}
                required
                placeholder="अपना संदेश यहाँ लिखें..."
                className="w-full px-3 py-2 border border-[#d1d5db] rounded-lg text-sm outline-none focus:border-[#15803d]"
              />
            </div>

            <Button type="submit" variant="primary" size="md">
              <Send className="size-4" />
              <span>संदेश भेजें</span>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
