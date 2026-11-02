import type { Metadata } from "next";

/*
 * Sayfa basliklari ve paylasim onizlemeleri.
 *
 * Sayfa bilesenleri "use client" oldugu icin metadata disa aktaramiyor; her
 * rota klasorundeki kucuk sunucu layout'u bu yardimciyi cagiriyor. Turkce
 * sayfalar /tr altinda ayri adreslerde oldugu icin her dilin kendi basligi,
 * kanonik adresi ve diger dile isaret eden hreflang baglantisi var.
 *
 * Metadata URL'lerine basePath otomatik eklenmedigi icin /Portfolio yollarda
 * acikca yaziliyor.
 */

export type Lang = "en" | "tr";

export const SITE_ORIGIN = "https://caglaeras.github.io";
export const SITE_URL = `${SITE_ORIGIN}/Portfolio`;
export const SITE_NAME = "Çağla Eraslan Portfolio";
export const PERSON = "Çağla Eraslan";

export const OG_IMAGE = {
  url: "/Portfolio/og-image.png",
  width: 1200,
  height: 630,
  alt: "Çağla Eraslan, Educational Technologist and Growth Marketer",
};

/** Dil onekiyle tam adres: ("/projects/web", "tr") -> ".../Portfolio/tr/projects/web" */
export function urlFor(path: string, lang: Lang): string {
  if (lang === "en") return `${SITE_URL}${path}`;
  return `${SITE_URL}/tr${path === "/" ? "" : path}`;
}

/** Iki dilin birbirine isaret ettigi kanonik ve hreflang baglantilari. */
export function alternatesFor(path: string, lang: Lang): Metadata["alternates"] {
  return {
    canonical: urlFor(path, lang),
    languages: {
      en: urlFor(path, "en"),
      tr: urlFor(path, "tr"),
      "x-default": urlFor(path, "en"),
    },
  };
}

/** Tek bir sayfanin basligi, aciklamasi ve paylasim karti. */
export function pageMetadata(title: string, description: string, path: string, lang: Lang = "en"): Metadata {
  const url = urlFor(path, lang);
  const fullTitle = `${title} | ${PERSON}`;
  return {
    // Kok layout'taki sablon <title>'a "| Çağla Eraslan" ekliyor
    title,
    description,
    alternates: alternatesFor(path, lang),
    // openGraph alt sayfada ust sayfanin nesnesini tamamen degistirir,
    // bu yuzden gorsel ve site adi burada tekrar veriliyor.
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: lang === "tr" ? "tr_TR" : "en_US",
      alternateLocale: lang === "tr" ? "en_US" : "tr_TR",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
