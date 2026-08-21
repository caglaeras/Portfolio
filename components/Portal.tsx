"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Overlay'leri (panel, modal, lightbox) document.body altina tasir.
 *
 * Neden gerekli: ProjectsLayout.contentArea bir fadeIn animasyonu tasiyor ve
 * animasyon bittikten sonra bile uzerinde transform: matrix(1,0,0,1,0,0)
 * kaliyor. Transform degeri none olmayan her oge, altindaki position: fixed
 * ogeler icin kapsayici blok haline geliyor; bu yuzden overlay'ler viewport'a
 * degil o kutuya gore konumlaniyor ve sayfa uzunlugunda buyuyup ekran disina
 * tasiyordu. Portal bu bagi tamamen kesiyor.
 *
 * Statik export sirasinda document bulunmadigi icin ilk render'da null doner,
 * mount olduktan sonra portal kurulur. Overlay'ler kapali basladigi icin bu
 * sunucu tarafinda bir kayba yol acmaz.
 */
export default function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return createPortal(children, document.body);
}
