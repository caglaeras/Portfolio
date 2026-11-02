import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";

// Sayfa "use client" oldugu icin baslik ve paylasim karti buradan geliyor.
export const metadata = pageMetadata(
  "Guideline-Verified Content System",
  "An n8n content pipeline that uses LLMs as one component, with a guideline check and a clinical review before anything is published.",
  "/projects/growth-automation",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
