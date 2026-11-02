import type { ReactNode } from "react";
import { pageMetadata } from "../seo";

// Sayfa "use client" oldugu icin baslik ve paylasim karti buradan geliyor.
export const metadata = pageMetadata(
  "Educational Vision",
  "How I approach learning design: digital experiences grounded in research, shaped by user needs, and built to last beyond a single classroom.",
  "/vizyon",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
