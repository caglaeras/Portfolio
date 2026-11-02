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
    desc: { tr: "Bu projede karakter rigleme, kemik yapılarını birleştirme ve dans animasyonu oluşturma süreçlerini gerçekleştirdim. Ayrıca ses efektlerini karakterle senkronize etmek için Audio Source bileşenini kullandım.", en: "In this project, I rigged a character, connected its bone structures, and created a dance animation. I also used the Audio Source component to synchronize sound effects with the character." },
  },
  {
    id: "u2",
    videoId: "LWPtN9uJTjk",
    title: { tr: "Işık Kullanımı", en: "Using Light" },
    desc: { tr: "Universal Render Pipeline (URP) kullanarak farklı 2D ışık türlerini sahneye uyguladım. Karakter animasyonu eşliğinde her ışık türünü vurgulayan dinamik bir animasyon/gif oluşturdum.", en: "I applied different types of 2D lighting to the scene using the Universal Render Pipeline (URP). I created a dynamic animation/gif that highlights each lighting type alongside a character animation." },
  },
  {
    id: "u3",
    videoId: "ceNNmWJ9K3g",
    title: { tr: "2D Platform Oyunu", en: "2D Platform Game" },
    desc: { tr: "Bu projede, WASD tuşlarıyla yönlendirilen bir top karakterinin platformlar arasında ilerleyerek dikenli tuzaklara çarpmadan tamamlaması gereken bir mini platform oyunu geliştirdim.", en: "In this project, I developed a mini platform game in which players guide a ball character with the WASD keys, move between platforms, and avoid spiked traps." },
  },
  {
    id: "u4",
    videoId: "ysaB9TzSp7M",
    title: { tr: "2D Bir Oyun Örneği", en: "A 2D Game Example" },
    desc: { tr: "Oyuncu, yukarı ve aşağı yön tuşlarıyla bir uzay gemisini kontrol ediyor. Space tuşuyla ateş ederek karşısına çıkan engelleri yok etmesi gereken basit ama etkili bir oyun kurguladım.", en: "The player controls a spaceship with the up and down arrow keys. I designed a simple but effective game in which the player uses the Space key to fire at and destroy incoming obstacles." },
  },
  {
    id: "u5",
    videoId: "W2rIoqOzSKM",
    title: { tr: "Ateş Etme", en: "Shooting" },
    desc: { tr: "Unity üzerinde basit kontrolleri test etmek için geliştirdiğim bu projede, hedefe doğru ateşlenen ve çarptıktan sonra yok olan objeler için temel script fonksiyonları yazdım.", en: "In this Unity project for testing basic controls, I wrote basic script functions for objects that are fired toward a target and disappear after impact." },
  },
  {
    id: "u6",
    videoId: "T6Rnd_THoG8",
    title: { tr: "Flappy Bird Remake", en: "Flappy Bird Remake" },
    desc: { tr: "Klasik Flappy Bird oyununu Unity üzerinde yeniden oluşturdum. Yerçekimi, skor takip sistemi ve engel geçişleri gibi mekanikleri aynı biçimde kodladım.", en: "I recreated the classic Flappy Bird game in Unity. I coded mechanics such as gravity, score tracking, and passing through obstacles to match the original." },
  },
];
