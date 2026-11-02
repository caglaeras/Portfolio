import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";

// Sayfa "use client" oldugu icin baslik ve paylasim karti buradan geliyor.
export const metadata = pageMetadata(
  "Gen Çiftliği",
  "A Unity-based educational game for 8th-grade genetics. Play it in the browser and read the research report.",
  "/projects/gen-ciftligi",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
