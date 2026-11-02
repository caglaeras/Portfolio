/*
 * <head> icinde, govde cizilmeden once calisan satir ici betik.
 *
 * 1. <html lang>'i adrese gore ayarlar: Turkce sayfa ilk karede dogru buyuk
 *    harfle ("KALİTE") ve dogru telaffuzla gelir.
 * 2. Kullanici dil dugmesiyle bir tercih yaptiysa ve acilan adres diger dilin
 *    adresiyse, sayfa hic cizilmeden karsiligina gider. Turkce secen biri
 *    Ingilizce bir link acsa bile Ingilizce gormez.
 *
 * Dongu olmaz: yonlendirme yalnizca tercih ile adresin dili farkliysa yapilir
 * ve hedef her zaman tercih edilen dilin adresidir. Bulunamayan bir adres de
 * karsiligina bir kez gider, orada dil zaten tutar.
 *
 * Kucuk tutuldu ve bagimliligi yok; React yuklenmeden calismasi gerekiyor.
 */
export const LANGUAGE_SCRIPT = `(function () {
  try {
    var base = "/Portfolio";
    var path = location.pathname;
    if (path.indexOf(base) !== 0) return;
    var rest = path.slice(base.length) || "/";
    var isTr = rest === "/tr" || rest.indexOf("/tr/") === 0;
    document.documentElement.lang = isTr ? "tr" : "en";
    var pref = null;
    try { pref = localStorage.getItem("language"); } catch (e) {}
    var target = null;
    if (pref === "tr" && !isTr) target = base + "/tr" + (rest === "/" ? "" : rest);
    if (pref === "en" && isTr) target = base + (rest.slice(3) || "/");
    if (target) location.replace(target + location.search + location.hash);
  } catch (e) {}
})();`;
