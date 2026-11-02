import type { ReactNode } from "react";
import { pageMetadata } from "../../seo";

// Sayfa "use client" oldugu icin baslik ve paylasim karti buradan geliyor.
export const metadata = pageMetadata(
  "Unity Projects",
  "Prototypes, mobile games and interactive simulations built with Unity and C#.",
  "/projects/unity",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
