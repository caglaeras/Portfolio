import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";

export const metadata = pageMetadata(
  "Eğitim",
  "Boğaziçi Üniversitesi Bilgisayar ve Öğretim Teknolojileri Eğitimi lisans programı: dönemin en yüksek GANO'su, ödüller, sertifikalar ve başlıca dersler.",
  "/education",
  "tr",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
