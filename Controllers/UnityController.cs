using Microsoft.AspNetCore.Mvc;
using Portfolio.Models;

namespace Portfolio.Controllers
{
    public class UnityController : Controller
    {
        public IActionResult Index()
        {
            var projects = new List<UnityProject>
            {
                new UnityProject
                {
                    Title = "Dans Animasyonu",
                    Description = "Bu projede karakter rigleme, kemik yapılarının birleşimi ve dans animasyonu oluşturma süreçlerini gerçekleştirdim. Ayrıca karakterle senkronize şekilde ses efektleri için Audio Source bileşenini kullandım.",
                    YouTubeId = "tVeVMm9t0AE"
                },
                new UnityProject
                {
                    Title = "Işık Kullanımı",
                    Description = "Universal Render Pipeline (URP) kullanarak farklı 2D ışık türlerini sahnede uyguladım. Karakter animasyonu eşliğinde her ışık türünü vurgulayan dinamik bir animasyon/gif oluşturuldu.",
                    YouTubeId = "LWPtN9uJTjk"
                },
                new UnityProject
                {
                    Title = "2D Platform Oyunu",
                    Description = "Bu projede bir top karakterini WASD tuşlarıyla yönlendirerek platformlar arasında ilerlediği ve dikenli tuzaklara çarpmadan tamamlaması gereken bir mini platform oyunu geliştirdim.",
                    YouTubeId = "ceNNmWJ9K3g"
                },
                new UnityProject
                {
                    Title = "2D Bir Oyun Örneği",
                    Description = "Oyuncu yukarı ve aşağı yön tuşlarıyla bir uzay gemisini kontrol ediyor. Space tuşuyla ateş ederek karşısına çıkan engelleri yok etmesi gereken basit ama etkili bir oyun kurguladım.",
                    YouTubeId = "ysaB9TzSp7M"
                },
                new UnityProject
                {
                    Title = "Ateş Atma",
                    Description = "Unity üzerinde basit kontrolleri test etmek için geliştirdiğim bu projede, hedefe doğru ateş gönderen, çarptıktan sonra yok olan objeler için temel script fonksiyonları geliştirdim.",
                    YouTubeId = "W2rIoqOzSKM"
                },
                new UnityProject
                {
                    Title = "Flappy Bird Remake",
                    Description = "Klasik Flappy Bird oyununu yeniden Unity üzerinde canlandırdım. Yerçekimi, skor takip sistemi ve engel geçişleri gibi mekanikleri birebir şekilde kodladım.",
                    YouTubeId = "T6Rnd_THoG8"
                },
                new UnityProject
                {
                    Title = "Eğitsel Yazılım Projesi",
                    Description = "8. sınıf müfredatına uygun olarak genetik materyaller konusunu oyunlaştırarak öğreten bir Unity projesi geliştirdim. Öğrencilerin deneme-yanılma yoluyla öğrenmelerini teşvik eden interaktif bir sistem içeriyor.",
                    YouTubeId = "TTYB2RYx4p4"
                }
            };

            return View(projects);
        }
    }
}
