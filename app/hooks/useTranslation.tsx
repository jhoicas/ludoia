"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import es from "../../locales/es.json";
import en from "../../locales/en.json";

type Language = "es" | "en";
type Translations = typeof es;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  const translations: Record<Language, Translations> = {
    es,
    en,
  };

  const t = (key: keyof Translations) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
