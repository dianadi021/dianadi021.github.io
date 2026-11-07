---
name: sdlc-brainstorming
description: Activate this skill when exploring new feature ideas, conducting discovery and brainstorming, deconstructing problem spaces using 5W+1H, comparing alternative solutions, or distilling requirements and identifying ambiguity before technical planning.
---

# 💡 Skill: SDLC Discovery & Brainstorming (5W + 1H)

Panduan operasional untuk membedah ide mentah, mengeksplorasi alternatif solusi (*divergent thinking*), mendeteksi ambiguitas dengan 5W + 1H, dan menyaring kebutuhan tanpa menyentuh kode implementasi.

---

## 1. Tahap 1: Problem Space Deconstruction & 5W + 1H (Discovery)
- **Guardrail:** Dilarang menulis kode atau mendefinisikan skema tabel pada tahap ini.
- Bedah permintaan melalui 6 pertanyaan fundamental:
  1. **WHAT:** Masalah spesifik apa yang diselesaikan dan apa output nyata fitur ini?
  2. **WHY:** Mengapa masalah ini penting diselesaikan sekarang (motif bisnis & urgensi)?
  3. **WHO:** Siapa target user/aktor dan apa batas hak aksesnya (RBAC / kepemilikan data)?
  4. **WHEN:** Kapan proses berjalan (interaktif realtime, scheduled cron, atau event-driven)?
  5. **WHERE:** Di mana logika hidup (Mobile/Web Client, Backend API, atau Queue Worker)?
  6. **HOW:** Bagaimana alur statusnya (FSM) dan bagaimana mitigasi skenario gagalnya?
- Rumuskan **Problem Statement** padat (maksimal 2 kalimat).

---

## 2. Tahap 2: Divergent Exploration (Brainstorming Alternatif)
- **Tujuan:** Menghindari bias pada satu solusi instan.
- **Langkah Kerja:**
  1. Tawarkan minimal **2–3 pendekatan konseptual** (misal: sinkron vs antrean background, offline-first vs online-only).
  2. Bandingkan *trade-off* tiap opsi terhadap *user experience*, kompleksitas, dan biaya pemeliharaan.
  3. Minta konfirmasi pengguna atas pendekatan yang dipilih.

---

## 3. Tahap 3: Requirements Distillation & Cross-Stack Synergy (Needs)
- **Pisahkan Kebutuhan:**
  - *Explicit Needs:* Fitur fungsional yang diminta pengguna.
  - *Implicit Technical Needs:* Idempotensi, transaksi atomik (*pure-write* + *locking read* bila perlu), anti-N+1, isolasi user/tenant, dan penanganan kegagalan jaringan.
- **Sinergi Lintas Stack (jika melibatkan Client ↔ Backend):**
  - *Frontend / Mobile:* Rencanakan pemakaian **Reusable Components / Design System Primitives** untuk mencegah duplikasi UI; tentukan kebutuhan penyimpanan lokal (Room / IndexedDB).
  - *Backend API:* Tentukan pola komunikasi (REST / WebSocket / SSE) dan format error seragam `{ success: false, code, message, errors }`.
- **Anti-Scope (Out-of-Scope):** Tuliskan secara tegas hal yang **TIDAK** dikerjakan pada siklus ini untuk mencegah *scope creep*.

---

## 4. Tahap 4: Gerbang Deteksi Ambiguitas (Zero Speculation Gate)
- Periksa apakah ada parameter input/output, aturan batas/kuota, status gagal, atau alur pembatalan yang belum terdefinisi.
- **Pause & Clarify:** Jika ada data yang hilang atau multi-tafsir, **dilarang berasumsi**. Hentikan proses sementara dan ajukan pertanyaan klarifikasi beserta opsi *trade-off* kepada pengguna.

---

## 5. Exit Artifact (Handoff ke `sdlc-planning`)
Sajikan ringkasan berikut sebelum masuk ke tahap perancangan teknis:
- **Problem Statement (5W + 1H):** Akar masalah dan konteks aktor.
- **Selected Approach:** Opsi solusi terpilih beserta alasan *trade-off*-nya.
- **Cross-Stack & Reusable Component Plan:** Pembagian peran Client ↔ Backend dan daftar komponen reusable yang dipakai.
- **In-Scope (MVP) vs Anti-Scope:** Daftar kebutuhan terukur vs fitur yang ditunda.
- **Open Questions (jika ada):** Poin ambiguitas yang menunggu keputusan pengguna.
