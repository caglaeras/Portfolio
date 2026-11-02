import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";

// Sayfa "use client" oldugu icin baslik ve paylasim karti buradan geliyor.
export const metadata = pageMetadata(
  "Academic Work",
  "Coursework and documentation in educational technology, instructional design, database planning and content production.",
  "/projects/other",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
