import type { ReactNode } from "react";
import { pageMetadata } from "../../../seo";

export const metadata = pageMetadata(
  "Gen Çiftliği",
  "8. sınıf genetik konuları için Unity tabanlı eğitsel oyun. Tarayıcıda oynayın ve araştırma raporunu okuyun.",
  "/projects/gen-ciftligi",
  "tr",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
