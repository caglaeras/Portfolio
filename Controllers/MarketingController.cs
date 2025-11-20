using Microsoft.AspNetCore.Mvc;
using Portfolio.Models;

namespace Portfolio.Controllers
{
    public class MarketingController : Controller
    {
        public IActionResult Index()
        {
            var videoProjects = new List<Marketing>
            {
                new Marketing
                {
                    Title = "YouTube Shorts 1",
                    Description = "Tanıtım videosu 1",
                    VideoPath = "https://www.youtube.com/embed/gMKkm5kcke8"
                },
                new Marketing
                {
                    Title = "YouTube Shorts 2",
                    Description = "Tanıtım videosu 2",
                    VideoPath = "https://www.youtube.com/embed/X3o4-4pyn2g"
                },
                new Marketing
                {
                    Title = "YouTube Shorts 3",
                    Description = "Tanıtım videosu 3",
                    VideoPath = "https://www.youtube.com/embed/gynXSZEaN98"
                },
                new Marketing
                {
                    Title = "YouTube Shorts 4",
                    Description = "Tanıtım videosu 4",
                    VideoPath = "https://www.youtube.com/embed/ct7o0Q4l6sk"
                },
                new Marketing
                {
                    Title = "YouTube Shorts 5",
                    Description = "Tanıtım videosu 5",
                    VideoPath = "https://www.youtube.com/embed/AITJHwzmJnI"
                },
                new Marketing
                {
                    Title = "YouTube Shorts 6",
                    Description = "Tanıtım videosu 6",
                    VideoPath = "https://www.youtube.com/embed/dMhl93xgxQ4"
                },
                new Marketing
                {
                    Title = "YouTube Shorts 6",
                    Description = "Tanıtım videosu 6",
                    VideoPath = "https://youtube.com/embed/lKKu1GCBBN8"
                }
            };


            var imageProjects = new List<Marketing>
            {
                // 📌 Statik PNG görseller
                new Marketing { Title = "Afiş Örneği 1", Description = "Oyun tanıtımı için hazırlanmış bir afiş örneği.", ImagePath = "images/1.png" },
                new Marketing { Title = "Afiş Örneği 2", Description = "Oyun tanıtımı için hazırlanmış bir afiş örneği.", ImagePath = "images/3.png" },
                new Marketing { Title = "Afiş Örneği 3", Description = "Oyun tanıtımı için hazırlanmış bir afiş örneği.", ImagePath = "images/poster.png" },
                new Marketing { Title = "Maxxine Serbest Çalışma", Description = "Poster çalışması.", ImagePath = "images/freeproject1.png" },
                new Marketing { Title = "little Women Serbest Çalışma ", Description = "Poster çalışması.", ImagePath = "images/freeproject2.png" },
                new Marketing { Title = "Yayın Öncesi Duyuru", Description = "Ön sipariş ile alınan oyunumuz için yapılan bir duyuru görseli.", ImagePath = "images/pre-r_announcement.png" },
                new Marketing { Title = "Blog Duyurusu", Description = "Yayına alınan blogları duyurmak için hazırlanmış bir görsel", ImagePath = "images/blog_announcement.png" },
                                new Marketing { Title = "AppStore Görseli", Description = "Appstore'a eklenmek üzere hazırlanmış görsel.", ImagePath = "images/app_storeimage.png" },
                new Marketing { Title = "İnfografik Çalışması", Description = "Veriler ile hazırlanmış bir infografik örneği", ImagePath = "images/infografik.png" },

                // 🌀 GIF dosyaları (Animasyonlu içerikler)
                new Marketing { Title = "Yeni Mod Duyurusu", Description = "Oyuna yeni eklenen bir mod için yapılan duyuru görseli", ImagePath = "images/announcement_post.gif" },
                new Marketing { Title = "Websitesi Tanıtımı", Description = "Yayına aldığımız websitesi için hazırlanan duyuru", ImagePath = "images/website_announcement.gif" },
                new Marketing { Title = "Sosyal Medya İçeriği", Description = "Verilen hizmete dair ilgi çekici bir içerik fikri", ImagePath = "images/hs.gif" },
                new Marketing { Title = "Uygulama Tanıtım", Description = "App tanıtımı için ilgi çekici bir içerik", ImagePath = "images/dr.gif" },
                new Marketing { Title = "Sosyal Medya İçeriği", Description = "Motivasyonel ilgi çekici bir içerik fikri", ImagePath = "images/files.gif" }
            };

            ViewData["Videos"] = videoProjects;
            ViewData["Images"] = imageProjects;

            return View();
        }
    }
}
