"use client";

import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import contentData from "@/data/content.json";

export type Language = "tr" | "en";
export type ContentType = typeof contentData.tr;

/*
 * Dil adresten okunur: Turkce sayfalar /tr altinda, Ingilizce sayfalar kok
 * adreslerde. Boylece her Turkce sayfa derleme sirasinda Turkce uretilir ve
 * ilk acilista Ingilizce gorunmez. Hatirlanan tercih, sayfa cizilmeden once
 * kok layout'taki satir ici betikle uygulanir (bkz. app/language-script.ts).
 */
export const TR_PREFIX = "/tr";

export function languageOf(pathname: string | null | undefined): Language {
  if (!pathname) return "en";
  return pathname === TR_PREFIX || pathname.startsWith(TR_PREFIX + "/") ? "tr" : "en";
}

/** Dil oneki olmayan yol: "/tr/projects/web" -> "/projects/web", "/tr" -> "/". */
export function stripLanguage(pathname: string): string {
  if (languageOf(pathname) === "tr") return pathname.slice(TR_PREFIX.length) || "/";
  return pathname || "/";
}

/** Bir ic yolu verilen dile tasir: ("/projects/web", "tr") -> "/tr/projects/web". */
export function localizePath(path: string, lang: Language): string {
  const bare = stripLanguage(path);
  if (lang === "en") return bare;
  return bare === "/" ? TR_PREFIX : TR_PREFIX + bare;
}

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  content: ContentType;
  /** Ic bir yolu gecerli dile tasir; tum Link href'leri bundan gecer. */
  href: (path: string) => string;
  /** Gecerli yolun dil oneki olmayan hali; aktif menu karsilastirmalari icin. */
  barePath: string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

/*
 * Hidrasyon sirasinda ilk cizim, HTML'in hangi dille uretildigine uymali.
 * Normal sayfalarda bu adresin diliyle ayni. Fark yalnizca 404'te cikar:
 * 404.html Ingilizce uretilir ama GitHub Pages onu /tr/... altindaki
 * bulunamayan adreslerde de gosterir. Uretilen dil asagidaki gizli
 * isaretcide durur; ilk cizim onu kullanir, sayfa yerlesince adresin diline
 * gecilir. Boylece hidrasyon uyusmazligi olmaz.
 */
function builtLanguage(): Language | null {
  if (typeof document === "undefined") return null;
  const v = document.getElementById("built-lang")?.getAttribute("data-lang");
  return v === "tr" || v === "en" ? v : null;
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [built] = useState(builtLanguage);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const urlLanguage = languageOf(pathname);
  const language = !hydrated && built ? built : urlLanguage;
  const barePath = stripLanguage(pathname);

  // Istemci tarafi gezintide <html lang> guncel kalsin; ilk acilista bunu
  // satir ici betik zaten yapmis olur. Dil uymazsa ekran okuyucular yanlis
  // telaffuz eder ve text-transform: uppercase "i" harfini "I" yapar.
  useEffect(() => {
    document.documentElement.lang = urlLanguage;
  }, [urlLanguage]);

  const toggleLanguage = () => {
    const next: Language = language === "tr" ? "en" : "tr";
    try {
      localStorage.setItem("language", next);
    } catch {
      /* tercih kaydedilemedi; gecis yine de calisir */
    }
    // Iki dildeki sayfalar ayni yapida; okuyucu kaldigi yerde kalsin
    router.push(localizePath(pathname, next), { scroll: false });
  };

  const href = useCallback((path: string) => localizePath(path, language), [language]);

  const content = contentData[language];

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, content, href, barePath }}>
      {/* Sayfanin hangi dille uretildigini tasir; yalnizca ilk cizimde okunur */}
      <span id="built-lang" data-lang={language} hidden />
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
