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

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang === "tr" || savedLang === "en") {
      setLanguage(savedLang);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "tr" ? "en" : "tr";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
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
