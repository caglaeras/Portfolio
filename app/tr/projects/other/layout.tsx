import type { ReactNode } from "react";
import { pageMetadata } from "../../../seo";

export const metadata = pageMetadata(
  "Akademik Çalışmalar",
  "Eğitim teknolojileri, öğretim tasarımı, veri tabanı planlaması ve içerik üretimi alanlarında yürüttüğüm akademik çalışmalar.",
  "/projects/other",
  "tr",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
