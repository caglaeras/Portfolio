using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Portfolio.Models; // Eğer 'Education' veya benzer bir model kullanacaksanız.

namespace Portfolio.Controllers
{
    public class VizyonController : Controller
    {
        public IActionResult Index()
        {
            // Bu sayfaya özgü herhangi bir veriye ihtiyaç duyulmadığı için Model kullanmıyoruz.
            // Tüm içerik doğrudan View içinde statik olarak tanımlanmıştır.
            ViewData["Title"] = "Vizyon ve Eğitim Bilgileri";
            return View();
        }
    }
}