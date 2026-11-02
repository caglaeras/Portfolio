import type { ReactNode } from "react";
import { pageMetadata } from "../../../seo";

export const metadata = pageMetadata(
  "Unity Projeleri",
  "Unity ve C# ile geliştirdiğim prototipler, mobil oyunlar ve etkileşimli simülasyonlar.",
  "/projects/unity",
  "tr",
);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
