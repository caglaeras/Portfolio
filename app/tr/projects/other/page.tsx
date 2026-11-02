// Ingilizce sayfanin Turkce ikizi: bilesen ayni, dil /tr adresinden okunuyor.
// Yeniden disa aktarmak yerine prop'suz ciziliyor; dogrudan disa aktarim Next'in
// sayfaya searchParams gecirmesine ve sayfanin statik uretilememesine yol aciyordu.
import Page from "../../../projects/other/page";

export default function TrPage() {
  return <Page />;
}
