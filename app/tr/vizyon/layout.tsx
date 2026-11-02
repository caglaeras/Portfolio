import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";

export const metadata = pageMetadata(
  "Eğitim Vizyonum",
  "Öğrenme tasarımına yaklaşımım: araştırmalara dayanan, kullanıcı ihtiyaçlarıyla şekillenen ve tek bir sınıfın ötesinde kalıcı olabilecek dijital deneyimler.",
  "/vizyon",
  "tr",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
