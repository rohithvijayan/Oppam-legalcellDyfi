"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { dictionaries, Locale, Dictionary } from "@/lib/i18n";

type LanguageContextType = {
  locale: Locale;
  t: Dictionary;
  toggleLocale: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: "ml",
  t: dictionaries.ml,
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ml");

  useEffect(() => {
    const saved = localStorage.getItem("oppam-locale") as Locale | null;
    if (saved && (saved === "en" || saved === "ml")) {
      setLocale(saved);
    }
  }, []);

  const toggleLocale = () => {
    const next: Locale = locale === "ml" ? "en" : "ml";
    setLocale(next);
    localStorage.setItem("oppam-locale", next);
    // Update html lang attribute
    document.documentElement.lang = next;
  };

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale], toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
