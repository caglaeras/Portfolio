/**
 * iframe hazir mi?
 *
 * iframe'in load olayi tum alt kaynaklari bekler; barindirdigimiz sayfalar
 * Google Fonts gibi dis kaynaklara baglandigi icin sayfa coktan gorunur
 * oldugu halde load gecikebiliyor. O zaman iskelet ekranda kaliyor, zaman
 * asimi dolarsa da bosuna yedek katmana dusuluyordu.
 *
 * Ayni origin'deki bir iframe icin belgeyi okuyup gercekten hazir olup
 * olmadigini anlayabiliyoruz. Capraz origin'de belgeyi okuyamayiz, orada
 * load olayi tek isarettir; bu durumda false doner ve cagiran taraf load
 * olayini beklemeye devam eder.
 */
export function frameIsReady(frame: HTMLIFrameElement | null): boolean {
  if (!frame) return false;
  try {
    const doc = frame.contentDocument;
    if (!doc) return false;
    // Henuz gezinme baslamamis: about:blank uzerindeyiz.
    if (!doc.location || doc.location.href === "about:blank") return false;
    return doc.readyState === "interactive" || doc.readyState === "complete";
  } catch {
    // Capraz origin: okuma engellendi, load olayina guvenilecek.
    return false;
  }
}
