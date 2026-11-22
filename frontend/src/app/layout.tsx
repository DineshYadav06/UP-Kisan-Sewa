import type { Metadata, Viewport } from "next";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/auth";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#15803d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "अवध किसान सेवा | Kisan Ki Pragati, Pradesh Ki Samriddhi",
    template: "%s | अवध किसान सेवा (Awadh Kisan Seva)",
  },
  description:
    "अवध क्षेत्र एवं उत्तर प्रदेश के किसानों के लिए डिजिटल कृषि सहायता मंच — फसल सलाह, मंडी भाव, मौसम, सरकारी योजनाएँ और विशेषज्ञ परामर्श।",
  keywords: [
    "Awadh Kisan Seva",
    "अवध किसान सेवा",
    "Kisan Seva UP",
    "Mandi Bhav UP",
    "UP Agriculture Schemes",
    "Crop Advisory Awadh",
    "Kheti Kisani UP",
  ],
  authors: [{ name: "Awadh Kisan Seva Project Team" }],
  openGraph: {
    title: "अवध किसान सेवा — डिजिटल कृषि सहायता मंच",
    description: "किसान की प्रगति, प्रदेश की समृद्धि — प्रमाणित कृषि सलाह, मंडी भाव व सरकारी योजनाएँ",
    siteName: "Awadh Kisan Seva",
    locale: "hi_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-font-size="md">
      <body className="min-h-screen bg-[#f8faf5] text-[#1f2937] font-sans antialiased">
        <I18nProvider>
          <AuthProvider>
            <SiteChrome>{children}</SiteChrome>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
