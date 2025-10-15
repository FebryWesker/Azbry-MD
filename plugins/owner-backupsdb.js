// plugins/autobackup.js
// 📦 Auto Backup Harian (database.json + folder plugins) — Fixed WITA
// by FebryWesker (Azbry-MD)

const fs = require('fs')
const path = require('path')
process.env.TZ = 'Asia/Makassar'
const TZ = 'Asia/Makassar'

// ==== Lokasi & konstanta ====
const ROOT = path.join(__dirname, '..')
const DATA_DIR = path.join(__dirname, '..', 'database')
const CFG_FILE = path.join(DATA_DIR, 'autobackup.json')
const PLUGINS_DIR = path.join(ROOT, 'plugins')

// cari database.json (root atau /database/)
function resolveDB() {
  const candidates = [
    path.join(ROOT, 'database.json'),
    path.join(DATA_DIR, 'database.json'),
    path.join(ROOT, 'src', 'database.json'),
  ]
  for (const p of candidates) if (fs.existsSync(p)) return p
  return null
}

// ==== Config store ====
function ensureCfg() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(CFG_FILE)) {
    const def = { on: true, time: '00:35', target: 'owner', lastSent: '' }
    fs.writeFileSync(CFG_FILE, JSON.stringify(def, null, 2))
  }
}
function loadCfg() {
  ensureCfg()
  try { return JSON.parse(fs.readFileSync(CFG_FILE, 'utf-8')) }
  catch { return { on: true, time: '00:35', target: 'owner', lastSent: '' } }
}
function saveCfg(cfg) { fs.writeFileSync(CFG_FILE, JSON.stringify(cfg, null, 2)) }

// ==== Waktu util ====
function nowLocal() {
  return new Date(new Date().toLocaleString('en-US', { timeZone: TZ }))
}
function hhmm() {
  const d = nowLocal()
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}
function todayKey() {
  const d = nowLocal()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

// ==== Owner helper ====
function ownerJids(fallback) {
  const out = new Set()
  const ow = global.owner || []
  for (const item of ow) {
    if (!item) continue
    if (Array.isArray(item)) {
      const num = String(item[0] || '').replace(/[^\d]/g, '')
      if (num) out.add(num + '@s.whatsapp.net')
    } else {
      const num = String(item).replace(/[^\d]/g, '')
      if (num) out.add(num + '@s.whatsapp.net')
    }
  }
  if (out.size === 0 && fallback) out.add(fallback)
  return [...out]
}

// ==== Archiver (opsional) ====
function haveArchiver() {
  try { require.resolve('archiver'); return true } catch { return false }
}
function createArchive(tmpPath, dbPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const archiver = require('archiver')
      const output = fs.createWriteStream(tmpPath)
      const archive = archiver('zip', { zlib: { level: 9 } })
      output.on('close', () => resolve(tmpPath))
      archive.on('error', (err) => reject(err))
      archive.pipe(output)

      // tambahkan database.json (jika ada)
      if (dbPath) archive.file(dbPath, { name: 'database.json' })
      // tambahkan folder plugins full
      if (fs.existsSync(PLUGINS_DIR)) archive.directory(PLUGINS_DIR, 'plugins')

      await archive.finalize()
    } catch (e) { reject(e) }
  })
}

// ==== Core kirim backup ====
async function sendBackup(conn, chatForFallback) {
  const cfg = loadCfg()
  const dbPath = resolveDB()
  const dateKey = todayKey()
  const stamp = dateKey.replace(/-/g, '')
  const tmpName = `backup_${stamp}.zip`
  const tmpPath = path.join(DATA_DIR, tmpName)

  // Info awal
  const preface =
`📦 Membuat full backup (database + plugins)
⏱️ ${nowLocal().toLocaleString('id-ID', { timeZone: TZ })}
🗂️ Target: ${cfg.target.toUpperCase()}
${haveArchiver() ? '' : '⚠️ Module "archiver" tidak terpasang — kirim database.json saja.'}`

  const targets = cfg.target === 'owner'
    ? ownerJids(chatForFallback)
    : cfg.target === 'here'
      ? [chatForFallback]
      : [cfg.target] // assume jid

  // kirim info awal ke target utama saja
  const infoTarget = targets[0] || chatForFallback
  try { await conn.sendMessage(infoTarget, { text: preface }) } catch {}

  if (haveArchiver()) {
    try {
      await createArchive(tmpPath, dbPath)
      const doc = fs.readFileSync(tmpPath)
      for (const jid of targets) {
        try {
          await conn.sendMessage(jid, {
            document: doc,
            fileName: tmpName,
            mimetype: 'application/zip',
            caption: '✅ Backup harian: database.json + folder plugins'
          })
        } catch (e) { console.error('Send zip fail:', e) }
      }
      try { fs.unlinkSync(tmpPath) } catch {}
    } catch (e) {
      // gagal bikin zip → fallback kirim DB saja
      console.error('Archive error:', e)
      if (dbPath && fs.existsSync(dbPath)) {
        const dbbuf = fs.readFileSync(dbPath)
        for (const jid of targets) {
          try {
            await conn.sendMessage(jid, {
              document: dbbuf,
              fileName: 'database.json',
              mimetype: 'application/json',
              caption: '⚠️ Gagal membuat ZIP. Mengirim database.json saja.'
            })
          } catch (er) { console.error('Send DB fail:', er) }
        }
      }
    }
  } else {
    // tanpa archiver: kirim database.json saja
    if (dbPath && fs.existsSync(dbPath)) {
      const dbbuf = fs.readFileSync(dbPath)
      for (const jid of targets) {
        try {
          await conn.sendMessage(jid, {
            document: dbbuf,
            fileName: 'database.json',
            mimetype: 'application/json',
            caption: '⚠️ archiver tidak terpasang. Install: npm i archiver'
          })
        } catch (e) { console.error('Send DB fail:', e) }
      }
    }
  }

  // update lastSent
  cfg.lastSent = dateKey
  saveCfg(cfg)
}

// ==== Scheduler minutely ====
if (!global.__AUTO_BACKUP_TIMER__) {
  global.__AUTO_BACKUP_TIMER__ = setInterval(async () => {
    try {
      const cfg = loadCfg()
      if (!cfg.on) return
      const timeNow = hhmm()
      const today = todayKey()
      if (timeNow === cfg.time && cfg.lastSent !== today) {
        if (global.conn) await sendBackup(global.conn, null)
      }
    } catch (e) {
      console.error('AutoBackup loop error:', e)
    }
  }, 60_000)
}

// ==== Command handler ====
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  const cfg = loadCfg()
  const sub = (args[0] || '').toLowerCase()

  if (!sub || sub === 'status') {
    return m.reply(
`📦 Auto Backup
Status : ${cfg.on ? '🟢 ON' : '🔴 OFF'}
Jadwal : ${cfg.time} WITA
Target : ${cfg.target}
Terakhir kirim : ${cfg.lastSent || '-'}
  
Perintah:
• ${usedPrefix}backup now
• ${usedPrefix}backup time 00:40
• ${usedPrefix}backup target owner|here|<jid>
• ${usedPrefix}backup on / off
• ${usedPrefix}backup status`)
  }

  if (sub === 'now') {
    await sendBackup(conn, m.chat)
    return
  }

  if (sub === 'time') {
    const v = (args[1] || '').trim()
    if (!/^\d{2}:\d{2}$/.test(v)) return m.reply(`Format salah.\nContoh: ${usedPrefix}backup time 00:40`)
    cfg.time = v
    saveCfg(cfg)
    return m.reply(`✅ Jadwal backup diatur ke ${v} WITA`)
  }

  if (sub === 'target') {
    const v = (args[1] || '').trim()
    if (!v) return m.reply(`Pakai: ${usedPrefix}backup target owner|here|<jid>`)
    cfg.target = v
    saveCfg(cfg)
    return m.reply(`✅ Target backup: ${v}`)
  }

  if (sub === 'on' || sub === 'off') {
    cfg.on = sub === 'on'
    saveCfg(cfg)
    return m.reply(`✅ Auto backup ${sub.toUpperCase()}`)
  }

  return m.reply(`Pakai:\n• ${usedPrefix}backup now\n• ${usedPrefix}backup time 00:40\n• ${usedPrefix}backup target owner|here|<jid>\n• ${usedPrefix}backup on/off\n• ${usedPrefix}backup status`)
}
handler.help = ['backup [now|time|target|on|off|status]']
handler.tags = ['owner','system']
handler.command = /^backup$/i
handler.owner = true

module.exports = handler