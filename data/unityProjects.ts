/**
 * Unity projeleri - /projects/unity sayfasinin icerik kaynagi.
 *
 * Her kart bir YouTube demosudur; sayfa acilisinda yalnizca kapak goruntusu
 * iner, oynatici ancak tiklaninca kurulur. Arayuz metinleri (ok etiketleri,
 * buton yazilari) data/content.json icindeki `unity` bolumundedir.
 */

import type { LocalizedText } from "./webProjects";

export type { LocalizedText };

export interface UnityProject {
  id: string;
  videoId: string;
  title: LocalizedText;
  /** Kartin altinda duran aciklama. */
  desc: LocalizedText;
}

export const unityProjects: UnityProject[] = [
  {
    id: "u1",
    videoId: "tVeVMm9t0AE",
    title: { tr: "Dans Animasyonu", en: "Dance Animation" },
    desc: { tr: "Bu projede karakter rigleme, kemik yapılarının birleşimi ve dans animasyonu oluşturma süreçlerini gerçekleştirdim. Ayrıca karakterle senkronize şekilde ses efektleri için Audio Source bileşenini kullandım.", en: "In this project, I handled character rigging, bone structure linking, and dance animation creation. I also used the Audio Source component to synchronize sound effects with the character." },
  },
  {
    id: "u2",
    videoId: "LWPtN9uJTjk",
    title: { tr: "Işık Kullanımı", en: "Light Usage" },
    desc: { tr: "Universal Render Pipeline (URP) kullanarak farklı 2D ışık türlerini sahnede uyguladım. Karakter animasyonu eşliğinde her ışık türünü vurgulayan dinamik bir animasyon/gif oluşturuldu.", en: "I applied different 2D light types in a scene using the Universal Render Pipeline (URP). This dynamic animation showcases various lighting effects accompanying character animation." },
  },
  {
    id: "u3",
    videoId: "ceNNmWJ9K3g",
    title: { tr: "2D Platform Oyunu", en: "2D Platform Game" },
    desc: { tr: "Bu projede bir top karakterini WASD tuşlarıyla yönlendirerek platformlar arasında ilerlediği ve dikenli tuzaklara çarpmadan tamamlaması gereken bir mini platform oyunu geliştirdim.", en: "A mini-platformer where the player guides a ball using WASD keys, navigating between platforms and completing the course without hitting spike traps." },
  },
  {
    id: "u4",
    videoId: "ysaB9TzSp7M",
    title: { tr: "2D Bir Oyun Örneği", en: "2D Game Example" },
    desc: { tr: "Oyuncu yukarı ve aşağı yön tuşlarıyla bir uzay gemisini kontrol ediyor. Space tuşuyla ateş ederek karşısına çıkan engelleri yok etmesi gereken basit ama etkili bir oyun kurguladım.", en: "The player controls a spaceship moving up and down. They must destroy obstacles by shooting with the Space key in this simple yet effective game concept." },
  },
  {
    id: "u5",
    videoId: "W2rIoqOzSKM",
    title: { tr: "Ateş Atma", en: "Shooting Projectile" },
    desc: { tr: "Unity üzerinde basit kontrolleri test etmek için geliştirdiğim bu projede, hedefe doğru ateş gönderen, çarptıktan sonra yok olan objeler için temel script fonksiyonları geliştirdim.", en: "A basic controls testing project developed in Unity, featuring core script functions for objects that shoot towards a target and destroy themselves upon impact." },
  },
  {
    id: "u6",
    videoId: "T6Rnd_THoG8",
    title: { tr: "Flappy Bird Remake", en: "Flappy Bird Remake" },
    desc: { tr: "Klasik Flappy Bird oyununu yeniden Unity üzerinde canlandırdım. Yerçekimi, skor takip sistemi ve engel geçişleri gibi mekanikleri birebir şekilde kodladım.", en: "I recreated the classic Flappy Bird game in Unity. I precisely coded mechanics like gravity, score tracking, and obstacle generation." },
  },
];
