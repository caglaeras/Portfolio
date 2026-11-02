import type { ReactNode } from "react";
import { pageMetadata } from "../../../seo";

export const metadata = pageMetadata(
  "Kılavuzlarla Doğrulanan İçerik Sistemi",
  "LLM'leri bileşenlerinden biri olarak kullanan, yayından önce kılavuz kontrolü ve klinik inceleme içeren bir n8n içerik hattı.",
  "/projects/growth-automation",
  "tr",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
