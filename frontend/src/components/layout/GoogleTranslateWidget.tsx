"use client";

import React, { useEffect } from "react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

export function GoogleTranslateWidget() {
  useEffect(() => {
    // Define the initialization callback
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,bn,gu,kn,ml,mr,pa,ta,te,ur",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // Check if script is already added
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  return (
    <div className="flex items-center gap-1.5 text-xs text-white">
      <span className="hidden md:inline-block text-[11px] font-semibold text-white/80">
        Google Translate:
      </span>
      <div
        id="google_translate_element"
        className="google-translate-widget bg-white text-gray-800 rounded px-1.5 py-0.5 text-xs font-medium shadow-xs"
      />
    </div>
  );
}
