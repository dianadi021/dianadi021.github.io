---
name: trend-research
description: Activate this skill when scanning market trends, real-time news, Google Trends metrics, or community/social sentiment (Reddit, Hacker News) before or during product brainstorming and discovery.
---

# 🌐 Skill: Market, Trend & Social Intelligence

Panduan operasional pengumpulan intelijen pasar, validasi sentimen audiens, dan analisis tren eksternal dari sumber publik terbuka secara aman, cepat, dan bebas blokir anti-bot.

---

## 1. Saluran Pengumpulan Data (Sources & Endpoints)

1. **Google News & Trends RSS (Realtime & Geografis):**
   - **Google News RSS:** Realtime hitungan menit, mendukung parameter `gl` (wilayah) dan `hl` (bahasa).
     - URL: `https://news.google.com/rss/search?q={query}&hl={lang}&gl={geo}&ceid={geo}:{lang}`
   - **Google Trends Daily RSS:** Tren pencarian harian per negara.
     - URL: `https://trends.google.com/trending/rss?geo={geo}`
2. **Komunitas Diskusi Terbuka (Public Social APIs):**
   - **Hacker News Algolia API (Diskusi Teknis Global):**
     - Endpoint: `https://hn.algolia.com/api/v1/search?query={query}&tags=story&hitsPerPage={limit}`
     - Realtime Endpoint: `https://hacker-news.firebaseio.com/v0/newstories.json`
   - **Reddit Public JSON (Sentimen & Pain Points):**
     - Endpoint: `https://www.reddit.com/search.json?q={query}&sort=relevance&limit={limit}`
     - Syarat: Wajib menyertakan custom `User-Agent` untuk menghindari blokir rate-limit.
3. **Search Engine Dorking Proxy (Untuk Platform Tertutup):**
   - Hindari scraping langsung ke domain tertutup (X/Twitter, LinkedIn).
   - Gunakan sintaks dorking via `search_web`:
     - X/Twitter: `site:x.com "kata kunci"`
     - LinkedIn Pulse: `site:linkedin.com/pulse "kata kunci"`

---

## 2. Guardrails Kualitas Data & Keamanan (Rules)

1. **Anti-Bot & Zero CAPTCHA Policy:** Dilarang menggunakan headless browser untuk mem-bypass bot wall/CAPTCHA. Jika endpoint meminta otentikasi atau CAPTCHA, segera alihkan ke saluran RSS/API publik terbuka.
2. **Filter Noise vs Signal:**
   - Reddit: Hanya ambil item dengan `score >= 10` dan `num_comments >= 3`.
   - Hacker News: Hanya ambil cerita dengan `points >= 20`.
   - Google News: Abaikan judul berita berbau clickbait sensasional tanpa substansi teknis/pasar.
3. **Token Economy (Anti-Flooding):**
   - Dilarang memasukkan teks artikel utuh (*full page dump*) ke context window utama.
   - Ambil hanya metadata esensial: `title`, `url`, `date/published`, `score/points`, dan `summary` (maksimal 2 kalimat per item).
   - Maksimal 5–7 sinyal utama per topik riset.
4. **Resilience & Rate-Limiting:**
   - Terapkan *Exponential Backoff with Jitter* bila menghadapi HTTP status 429 (`Too Many Requests`).
   - Terapkan *Multi-Source Failover*: jika Reddit gagal/rate-limited, otomatis gunakan Hacker News dan Google News RSS.
5. **Audit Kredibilitas & Anti-Hoax (Zero Speculation):**
   - **`HIGH_TRUST`:** Media penerbit resmi terindeks whitelist (Kompas, Detik, Tempo, BBC, Reuters), data resmi Google Trends, atau konsensus tinggi komunitas (HN points >= 100).
   - **`VERIFIED`:** Sumber berita yang terindeks resmi di agregator Google News namun di luar daftar whitelist utama.
   - **`COMMUNITY_RATED`:** Diskusi komunitas dengan sentimen positif konsisten (HN points >= 20, Reddit upvote ratio >= 85%).
   - **`SUSPECTED_MISLEADING`:** Postingan dengan upvote ratio < 60% atau memuat tag/flair "debunked"/"misleading" wajib ditandai sebagai indikasi hoax/sensasionalisme.
   - **`UNVERIFIED`:** Sumber organik yang belum memiliki konsensus publik.
6. **Ekstraksi Metrik Engagement & Views:**
   - Author: Menangkap nama publisher atau username author postingan (`@handle`, `u/handle`).
   - Views: Ditangkap dari `approx_traffic` Google Trends. Jika platform menerapkan metrik privat (Reddit/HN), tandai transparan `N/A (Private Platform Metric)`.
   - Engagement: Skor poin, jumlah komentar, dan `upvote_ratio_basis_pts` (skala 0–10000).

---

## 3. Parameter Riset (Kontrak Input)

Setiap investigasi riset wajib mendefinisikan parameter berikut:
- **`topic` (Wajib):** Kata kunci pencarian (misal: `"cross-platform offline sync"`, `"fintech payment qr"`).
- **`geo` (Opsional, Default: `ID`):** Kode wilayah (`ID`, `US`, `SG`, `GLOBAL`).
- **`lang` (Opsional, Default: `id`):** Bahasa konten (`id`, `en`).
- **`timeframe` (Opsional, Default: `7d`):** Jangkauan waktu (`1h`, `24h`, `7d`, `30d`).
- **`domain` (Opsional, Default: `tech`):** Kategori sektor (`tech`, `business`, `lifestyle`).

---

## 4. Prosedur Eksekusi

1. **Jalankan Helper Script:**
   Gunakan script bawaan untuk mengambil dan memfilter sinyal tren:
   ```bash
   python3 .agents/skills/trend-research/scripts/fetch_trends.py --topic "<TOPIC>" --geo ID --lang id --timeframe 7d --domain tech --limit 5
   ```
2. **Sintesis Temuan:**
   Ekstraksi pola umum dari data:
   - **Trend Trajectory:** Apakah tren sedang naik daun, stabil, atau menurun?
   - **Audience Pain Points:** Apa keluhan nyata pengguna di Reddit / forum komunitas?
   - **Competitor Landscape:** Siapa kompetitor atau solusi alternatif yang sering disebut?
3. **Integrasikan ke Tahap SDLC:**
   Handoff hasil temuan ke [`sdlc-brainstorming`](../sdlc-brainstorming/SKILL.md) untuk diterjemahkan menjadi analisis 5W+1H dan ruang lingkup produk software.

---

## 5. Exit Artifact
Format laporan intelijen tren terpadu (maksimal 20 baris):
```markdown
### 🌐 Intelligence Report: <Topic> (Geo: <Geo>, Timeframe: <Timeframe>)
- **Trend Signal:** <Naik / Stabil / Meredup> (Bukti: <Metrik RSS/Trends>)
- **Top User Pain Points:**
  1. <Keluhan 1 dari forum komunitas>
  2. <Keluhan 2 dari forum komunitas>
- **Verified References:**
  - [<Judul Berita 1>](<URL 1>) — <Sumber> (<Tanggal>)
  - [<Diskusi Komunitas 2>](<URL 2>) — <Poin/Skor>
- **Rekomendasi untuk Brainstorming:** <1-2 kalimat arah fitur yang layak dibedah di sdlc-brainstorming>
```
