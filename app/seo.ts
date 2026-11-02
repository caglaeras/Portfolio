import type { Metadata } from "next";

/*
 * Sayfa basliklari ve paylasim onizlemeleri.
 *
 * Sayfa bilesenleri "use client" oldugu icin metadata disa aktaramiyor; her
 * rota klasorundeki kucuk sunucu layout'u bu yardimciyi cagiriyor. Basliklar
 * Ingilizce: statik ciktinin varsayilan dili Ingilizce ve tek bir URL var.
 *
 * Metadata URL'lerine basePath otomatik eklenmedigi icin /Portfolio yollarda
 * acikca yaziliyor.
 */

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

/** Tek bir sayfanin basligi, aciklamasi ve paylasim karti. */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${PERSON}`;
  return {
    // Kok layout'taki sablon <title>'a "| Çağla Eraslan" ekliyor
    title,
    description,
    alternates: { canonical: url },
    // openGraph alt sayfada ust sayfanin nesnesini tamamen degistirir,
    // bu yuzden gorsel ve site adi burada tekrar veriliyor.
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
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
