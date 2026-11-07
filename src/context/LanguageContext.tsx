"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations, TranslationKey } from "@/locales";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  isKannada: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("engagement_lang") as Language;
      if (saved && (saved === "en" || saved === "kn")) {
        setLanguageState(saved);
      }
    } catch {
      // Ignore localStorage access errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("engagement_lang", lang);
    } catch {
      // Ignore localStorage access errors
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === "en" ? "kn" : "en";
    setLanguage(nextLang);
  };

  const t = (key: TranslationKey): string => {
    const currentTranslations = translations[language] || translations.en;
    return currentTranslations[key] || translations.en[key] || String(key);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        isKannada: language === "kn",
      }}
    >
      <div className={language === "kn" ? "font-kannadaSans" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

