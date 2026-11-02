import type { ReactNode } from "react";
import type { Metadata } from "next";
import { OG_IMAGE, PERSON, SITE_NAME, alternatesFor, urlFor } from "../seo";

/*
 * Turkce sayfalarin ortak varsayilanlari ve Turkce ana sayfanin metadata'si.
 * Alt rotalar kendi baslik ve adreslerini pageMetadata ile veriyor.
 */
export const metadata: Metadata = {
  // "absolute": kok layout'un "| Çağla Eraslan" sablonu bu basliga da eklenip
  // adi iki kez yazmasin. Sablon alt sayfalara yine geciyor.
  title: {
    absolute: "Çağla Eraslan - Eğitim Teknolojisti ve Büyüme Pazarlamacısı",
    template: `%s | ${PERSON}`,
  },
  description: "Eğitsel oyunlar, online dersler, yapay zeka okuryazarlığı dersleri ve bunları insanların karşısına çıkaran büyüme pazarlaması. Boğaziçi CET '26, dönemin en yüksek GANO'su.",
  alternates: alternatesFor("/", "tr"),
  openGraph: {
    title: "Çağla Eraslan - Eğitim Teknolojisti ve Büyüme Pazarlamacısı",
    description: "Eğitsel oyunlar, online dersler, yapay zeka okuryazarlığı dersleri ve bunları insanların karşısına çıkaran büyüme pazarlaması. Boğaziçi CET '26, dönemin en yüksek GANO'su.",
    url: urlFor("/", "tr"),
    siteName: SITE_NAME,
    type: "profile",
    locale: "tr_TR",
    alternateLocale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Çağla Eraslan - Eğitim Teknolojisti ve Büyüme Pazarlamacısı",
    description: "Eğitsel oyunlar, online dersler, yapay zeka okuryazarlığı dersleri ve bunları insanların karşısına çıkaran büyüme pazarlaması. Boğaziçi CET '26, dönemin en yüksek GANO'su.",
    images: [OG_IMAGE.url],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
