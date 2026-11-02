"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import contentData from "@/data/content.json";

export type Language = "tr" | "en";
export type ContentType = typeof contentData.tr;

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  content: ContentType;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Depolama engelliyse (bazi gizli pencereler) okuma ve yazma istisna
  // firlatir; dil tercihi o zaman yalnizca oturum boyunca gecerli olur.
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("language");
      if (savedLang === "tr" || savedLang === "en") {
        setLanguage(savedLang);
      }
    } catch {
      /* tercih okunamadi, varsayilan dil kalir */
    }
  }, []);

  // <html lang> dile uymazsa ekran okuyucular Turkce metni Ingilizce
  // okur ve text-transform: uppercase "i" harfini "I" yapar ("KALITE").
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === "tr" ? "en" : "tr";
    setLanguage(newLang);
    try {
      localStorage.setItem("language", newLang);
    } catch {
      /* tercih kaydedilemedi, gecis yine de calisir */
    }
  };

  const content = contentData[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, content }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
