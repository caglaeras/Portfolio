using Microsoft.AspNetCore.Mvc;
using Portfolio.Models;

namespace Portfolio.Controllers
{
    public class WebController : Controller
    {
        public IActionResult Index()
        {
            var projects = new List<WebProject>
            {
                new WebProject
                {
                    Title = "Lion Commerse",
                    Description = "\r\n        Description = \"HTML ve CSS kullanarak geliştirdiğim bu statik e-ticaret sitesi, temel web sayfası yapısını ve responsive tasarım ilkelerini öğrenmemi sağladı. Ürün listeleri, iletişim formu ve stil öğeleriyle tam sayfa bir alışveriş sitesi simülasyonu oluşturdum.",
                    YouTubeId = "Xhp_GIoMdxo"
                },
                new WebProject
                {
                    Title = "WorldStory",
                    Description = "Bu .NET projesi, World History (Dünya Tarihi) temasından esinlenerek oluşturduğum bir bilgi uygulamasıdır. Dünya kıtalarının tarihsel özelliklerini, önemli savaşları ve genel kültürel bilgileri kullanıcıya basit bir arayüzle sunmayı hedefledim.",
                    YouTubeId = "FFdFfIFaShI"
                },
                new WebProject
                {
                    Title = "UniMarket",
                    Description = "ASP.NET MVC teknolojisiyle geliştirdiğim bu platform, üniversite öğrencilerinin kendi aralarında ikinci el eşya alım satımı yapabilmeleri için tasarlandı. Kullanıcıların ilan ekleyebildiği, favori ürünleri listeleyebildiği ve iletişime geçebildiği işlevsel bir web uygulamasıdır.",
                    YouTubeId = "xbRc3xKAoq8"
                },
            };
         return View(projects);
        }
    }
}