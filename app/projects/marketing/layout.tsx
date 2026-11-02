import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";

// Sayfa "use client" oldugu icin baslik ve paylasim karti buradan geliyor.
export const metadata = pageMetadata(
  "Marketing Portfolio",
  "Visual and video work created for marketing and content production.",
  "/projects/marketing",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
