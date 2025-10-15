/**
 *  Azbry-MD System • © 2025 FebryWesker 🧠
 *  Modified from Botcahx Core
 *  Powered with Smart Automation & Precision
 */
// config.js (SAFE FOR PUBLIC / GITHUB)
// Ganti placeholder dengan data asli hanya di server lokalmu.

process.env.TZ = 'Asia/Jakarta'

// ---------------------------
// IDENTITAS & CONTACT
// ---------------------------
global.owner = ['628xxxxxxxxxxxx']          // -> "ISI NOMOR OWNER (WITH COUNTRY CODE)" contoh: '6281234567890'
global.mods = ['628xxxxxxxxxxxx']           // -> moderator(s)
global.prems = ['628xxxxxxxxxxxx']          // -> premium user(s)

global.nameowner = 'Nama Owner'             // -> isi nama owner
global.numberowner = '628xxxxxxxxxxxx'      // -> no telp owner (text)
global.mail = 'email@domain.com'            // -> email kontak
global.gc = 'https://chat.whatsapp.com/XXXXX' // -> link grup (atau 'ISI_LINK_GRUP')
global.instagram = 'https://instagram.com/username' // -> instagram (opsional)
global.wm = '© NamaBot'                     // -> watermark / nama bot
global.botname = 'Azbry-MD'                 // -> nama bot (tampilan)

// ---------------------------
// PESAN / TEKS STANDAR
// ---------------------------
global.wait = 'Tunggu sebentar...'          // pesan tunggu
global.eror = 'Terjadi kesalahan.'          // pesan error umum
global.stiker_wait = 'Stiker sedang dibuat...' // pesan saat buat sticker
global.packname = 'Made With'               // watermark packname sticker
global.author = 'AzbryMD'                   // watermark author sticker
global.maxwarn = 5                          // batas peringatan sebelum aksi

// ---------------------------
// OPSI / TOGGLE FITUR DEFAULT
// ---------------------------
global.autobio = false      // jika true -> bot update bio otomatis
global.autoread = false     // jika ingin bot auto-read
global.autorecord = false
global.antiporn = false     // fitur blokir konten porn (contoh)
global.spam = false         // fitur anti-spam
global.gcspam = false       // tutup grup jika spam terdeteksi

// ---------------------------
// DIREKTORI / PATHS (jika diperlukan)
// ---------------------------
global.mediaPath = './media'       // folder media (ubah jika perlu)
global.adzanAudioPath = './media/adzan' // folder adzan / audio pengingat

// ---------------------------
// API KEYS (ISI LOKAL / ENV ONLY)
// ---------------------------
// Jangan commit API keys ke GitHub.
// Ganti 'ISI_API_KEY' hanya pada server yang aman.
global.btc = 'ISI_API_KEY_BTC'
global.aksesKey = 'ISI_KEY_BOTCAHX'

// Bila menggunakan mapping API domain -> key
global.APIs = {
  btc: 'https://api.botcahx.eu.org'
}

global.APIKeys = {
  'https://api.botcahx.eu.org': 'ISI_API_KEY_BOTCAHX'
}

// ---------------------------
// PENGATURAN LAINNYA (opsional)
// ---------------------------
global.readmore = String.fromCharCode(8206).repeat(4001)
global.multiplier = 1.0    // pengali XP / kalkulasi (ubah lokal)
global.maxLevel = 20       // Max level jika ada fitur XP

// ---------------------------
// SAFETY: jangan ubah bagian bawah kecuali paham
// ---------------------------
let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.yellowBright(`Update '${__filename}'`))
  delete require.cache[file]
  require(file)
})

module.exports = global