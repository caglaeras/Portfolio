using Microsoft.AspNetCore.Mvc;
using Portfolio.Models;

namespace Portfolio.Controllers
{
    public class OtherController : Controller
    {
        public IActionResult Index()
        {
            var projects = new List<OtherProject>
            {
                new OtherProject
                {
                    Title = "Articulate",
                    Description = "Articulate Storyline platformu üzerinden hazırladığım bu interaktif eğitsel içerikte, kesir kavramı öğrencilerin aktif katılım sağlayabileceği uygulamalarla anlatıldı. Eğitim teknolojileri alanındaki tasarım becerilerimi geliştirdiğim bir projedir.",
                    YouTubeId = "xLoHTwxcuTQ"
                },
                new OtherProject
                {
                    Title = "SQL ile Coaching System Planlama",
                    Description = "MySQL veri tabanı yapısını kullanarak bireysel koçluk sistemine ait kullanıcı, oturum ve planlama detaylarını içeren bir veritabanı tasarımı gerçekleştirdim. Bu proje SQL sorguları ile sistem planlamasını nasıl yapabileceğimi gösteriyor.",
                    YouTubeId = "jTIoYyWDDEo"
                },
                
                new OtherProject
                {
                    Title = "Kahve Hakkında Eğitsel Video",
                    Description = "Ekip arkadaşım ile birlikte kahve üzerine hazırladığımız bu eğitsel videoda, içeriğin senaryosu, çekimi ve Adobe Premiere Pro ile kurgulama süreci tamamen bize aittir. Hem içerik üretimi hem de post-prodüksiyon deneyimi sundu.",
                    YouTubeId = "KP_9mSYPptw"
                },
            };
            return View(projects);
        }
    }
}

