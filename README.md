<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&weight=500&size=28&duration=3500&pause=1000&color=6F00FF&center=true&vCenter=true&width=600&lines=🌙+AZBRY-MD+PREMIUM;Smart+Automation+System+By+FebryWesker;Baileys+MD+Based+WhatsApp+Bot;Elegant+and+Powerful" alt="Azbry-MD Typing Banner" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-blue?logo=open-source-initiative&logoColor=white" />
  <img src="https://img.shields.io/badge/Developer-FebryWesker%20🧠-purple" />
  <img src="https://img.shields.io/badge/Status-Active-success" />
  <img src="https://img.shields.io/github/stars/FebryWesker/Azbry-MD?style=social" />
</p>

---
# 🌙 Azbry-MD
Bot WhatsApp Multi-Device cerdas berbasis **Baileys MD**, dengan sistem otomatis, tampilan elegan, dan gaya khas *Azbry System™*.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-blue?logo=open-source-initiative&logoColor=white" />
  <img src="https://img.shields.io/badge/Developer-FebryWesker%20🧠-purple" />
  <img src="https://img.shields.io/badge/Status-Active-success" />
</p>

---

## 🧭 Tentang Azbry-MD
| Detail | Keterangan |
|--------|-------------|
| **Nama Project** | 🌙 Azbry-MD |
| **Jenis Project** | WhatsApp Multi-Device Bot |
| **Framework** | [Baileys MD](https://github.com/WhiskeySockets/Baileys) |
| **Fokus Utama** | Smart Automation & Elegant System |
| **Dikembangkan oleh** | 🧠 FebryWesker |
| **Tagline** | *"Bot bukan cuma alat, tapi partner digital yang hidup."* |

---

## ✨ Fitur Utama
| Kategori | Deskripsi |
|-----------|------------|
| 🕋 **Pengingat Sholat** | Kirim jadwal sholat otomatis dengan audio adzan |
| 🍱 **Pengingat Makan** | Pesan dan audio otomatis di jam makan |
| 🧩 **Level System** | XP seimbang, rank, dan leaderboard |
| 🤬 **Filter Kata Kasar** | Deteksi & blokir kata terlarang |
| 🧾 **Menu & MenuAll** | Tampilan elegan tema *Azbry Style* |
| 📊 **Auto Report** | Laporan harian ke owner |
| 💾 **Auto Backup** | Backup otomatis database dan plugin |
| 🧠 **Command AI & Utility** | `.lvl`, `.azinfo`, `.azstat`, `.bw`, `.menuall`, dll. |

---

## ⚙️ Instalasi
| Langkah | Perintah |
|----------|-----------|
| 1️⃣ Clone repo | `git clone https://github.com/FebryWesker/Azbry-MD` |
| 2️⃣ Masuk folder | `cd Azbry-MD` |
| 3️⃣ Install dependensi | `npm install` |
| 4️⃣ Jalankan bot | `npm start` |

---

## ⚡ Konfigurasi Dasar
| File | Opsi yang Harus Disunting |
|------|-----------------------------|
| `config.js` | Tambahkan nomor owner dan pengaturan utama |
| ⚠️ Catatan | Jangan upload `.env`, `sessions/`, `database.json`, atau file sensitif lain |

**Contoh Konfigurasi:**
```js
global.owner = ['isi_nomor_kamu']
global.numberowner = 'isi_nomor_kamu'
```

---

## 🧩 Harap Dibaca Sebelum Install

### ⚙️ Cara Memperbaiki Error @lid

**Langkah-langkah Perbaikan:**
1. Pastikan file `handler.js` sudah versi terbaru  
2. Pastikan file `plugins/tools-getlid.js` sudah versi terbaru  
3. Pastikan file `lib/simple.js` sudah versi terbaru  
4. Pastikan file `lib/baileys.js` sudah versi terbaru  

Jika kamu sudah mendownload script versi terbaru, tidak perlu mengubah file-file di atas secara manual.  
Cukup clone ulang repo ini dan langsung jalankan langkah berikutnya.

---

### 💡 Cara Mendapatkan LID (WAJIB DIBACA)

1️⃣ Buat grup WhatsApp baru atau chat pribadi dengan bot  
2️⃣ Ketik perintah:
```
.getlid
```
3️⃣ Bot akan membalas:
```
275664439611636@lid
```
4️⃣ Salin **hanya angka saja**, tanpa `@lid`:
```
275664439611636
```
5️⃣ Tempelkan ke `config.js` seperti ini:
```js
global.owner = ['62xxxxxx','275664439611636']
global.mods = ['62xxxxxx','275664439611636']
global.prems = ['62xxxxxx','275664439611636']
```

📺 **Video Tutorial Lengkap:**  
[Klik untuk Menonton di YouTube](https://youtube.com/playlist?list=PLuQT2lE0wOYQNQhk2E8JAerojcZj8ckMY&s=kehl9mWEVmctVms0)

---

## 🩻 Penjelasan Masalah `@lid`
| Gejala | Penyebab & Solusi |
|---------|-------------------|
| ❌ Bot tidak merespons di grup | LID tidak diatur dengan benar |
| ⚠️ Owner tidak terdeteksi | Nomor belum sinkron di `config.js` |
| 💤 Fitur admin tidak berjalan | Bot bukan admin / LID salah |
| 🧠 Solusi | Pastikan konfigurasi LID sesuai panduan di atas |

---

## 💻 Command Utama
| Perintah | Fungsi |
|-----------|--------|
| `.menu` | Menampilkan kategori menu |
| `.menu <kategori>` | Contoh: `.menu sticker` |
| `.menuall` | Menampilkan semua perintah |
| `.lvl / .leaderboard` | Menampilkan profil level dan ranking |
| `.bw on/off/status` | Mengatur filter kata kasar |
| `.azinfo` | Menampilkan info bot dan plugin aktif |
| `.azstat` | Melihat status sistem & uptime |

---

## 🧠 Developer
| Identitas | Keterangan |
|------------|------------|
| 👤 **Nama** | FebryWesker |
| 🧩 **Peran** | Creator & Lead Developer Azbry-MD |
| 💡 **Fokus** | Smart Automation, XP System, Modular Plugin |
| ✉️ **Pesan** | *"Bangun bot bukan buat gaya, tapi buat efisiensi."* |

---

## 🙏 Ucapan Terima Kasih
| Kontributor | Kontribusi |
|--------------|-------------|
| ☕ **Botcahx Team** | Struktur dasar & referensi Baileys |
| 💻 **Open Source Devs** | Library dan modul pendukung |
| 💬 **Pengguna & Tester** | Feedback & inspirasi pengembangan |

> Terima kasih telah menjadi bagian dari perjalanan Azbry-MD 🚀

---

## 📜 Lisensi
| Jenis | Keterangan |
|--------|-------------|
| **Lisensi** | MIT License |
| **Hak Cipta** | © 2025 FebryWesker |
| **Catatan** | Bebas dimodifikasi, tapi tetap hargai karya 🧠 |

> 🌙 *Azbry-MD™ – The Next Evolution of Smart WhatsApp Bot*  
> _Dibangun dengan logika, cinta, dan sedikit kopi ☕_
