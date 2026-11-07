---
name: sdlc-delivery
description: Activate this skill when implementing code, executing pure development, running automated test suites, auditing critical invariants, resolving regressions, or preparing releases and git commits.
---

# 🚀 Skill: SDLC Delivery & Release

Panduan operasional untuk eksekusi penulisan kode produksi, pengujian otomatis bertingkat, audit celah kritis, dan pengambilan keputusan rilis/commit.

---

## 1. Tahap 1: Pure Development (Implementasi Modular & Transaksional)
- **Tujuan:** Menghasilkan kode produksi yang type-safe, modular, dan bersih dari boilerplate.
- **Langkah Kerja:**
  1. Terapkan logika bisnis mengisi skeleton kontrak dari tahap Planning.
  2. Terapkan prinsip *Pure-Write Transaction*: data referensi diambil di luar transaksi; di dalam transaksi hanya mutasi + *locking read* / read penentu write. Rollback dijamin via managed transaction/closure atau `try/catch` + rollback.
  3. Dilarang memanggil query DB di dalam perulangan (anti-N+1 query loop). Utamakan *bulk mutation* kecuali jika logika bisnis per-baris memang memerlukan iterasi.
  4. Terapkan penguncian aman anti-deadlock (misal: `ORDER BY id ASC FOR UPDATE` pada baris terkunci).
  5. Pasang validasi otorisasi dan batas kepemilikan data (user/tenant, anti-IDOR) pada seluruh query.
  6. Side effect (job, event, email) dijalankan setelah commit.

---

## 2. Tahap 2: Automated Testing & Static Verification
- **Tujuan:** Memvalidasi fungsi secara empiris sebelum perubahan disajikan.
- **Langkah Kerja:**
  1. Jalankan automated test suite sesuai perintah di `CONTEXT.md` (unit test, integration test).
  2. Untuk perubahan pada sisi Backend/API, jalankan verifikasi kontrak I/O, validasi `422`, anti-IDOR `403`, rollback transaksi, dan anti-N+1 sesuai [`test-backend-io`](../test-backend-io/SKILL.md).
  3. Untuk perubahan pada sisi Client/UI (Web, Android, Desktop), jalankan verifikasi kontrak I/O, input regex, dan struktur semantik sesuai [`test-client-io`](../test-client-io/SKILL.md).
  4. Jalankan linter dan static typecheck (wajib 0 error).
  5. Uji skenario positif (*happy path*), skenario validasi gagal, dan skenario konkurensi data.

---

## 3. Tahap 3: Self-Review Celah Universal (Backend & Client)
Sebelum rilis/commit, jalankan self-review dengan skill `review-*` sesuai stack (`review-laravel-php`, `review-typescript-node`, `review-android-kotlin`, `review-frontend-web`), minimal mencakup:
1. **Concurrency & Race Conditions:** Mutasi resource bersama terlindungi lock/atomic update/constraint; klik tombol submit terkunci (`disabled`/`loading`) mencegah *double-submit*.
2. **Database Performance & Transactions:**
   - Bebas query di dalam loop (N+1) maupun request HTTP per item di UI.
   - Bebas non-locking read di dalam transaksi (locking read `FOR UPDATE` wajib di dalam transaksi).
   - Bebas koleksi terbuka tanpa pagination/chunk.
3. **Transactional & Input Precision:** Bebas `float` untuk uang; input angka memakai `type="text" inputmode="numeric"` / `KeyboardType.Number` + regex ASCII `/^\d+$/` (atau `decimal` `/^\d+([.,]\d{1,4})?$/` untuk pengukuran non-moneter); rollback transaksi bersih.
4. **Access Control & Isolation:** Query dibatasi user/tenant dari auth context (Anti-IDOR).
5. **Resource Leaks:** Listener, koneksi, `AbortController`, coroutine/subscription dibersihkan saat unmount.
6. **UI/UX Semantic Consistency (Jika menyentuh Client):** Wajib memakai reusable base components, primary action berada di slot bawah (`<footer>` / `Scaffold.bottomBar`), menangani 4 state (`Loading`, `Empty`, `Error`, `Success`), dan memiliki `isDirty` guard.

---

## 4. Tahap 4: Conflict Decision Gate
Terapkan gerbang keputusan mutlak berdasarkan hasil pengujian:

- ⚠️ **KONDISI A: Terdeteksi Konflik / Gagal Test / Ada Regresi:**
  - **Stop & Alert:** Berikan peringatan segera kepada pengguna; dilarang keras melakukan commit!
  - **Biarkan Uncommitted:** Jangan lakukan `git checkout` atau `git reset` tanpa instruksi, agar pengguna dapat menginspeksi diff.
  - **Deep Analysis:** Sajikan analisis akar masalah, berkas yang bertabrakan, dan rekomendasi solusi taktis.
- ✅ **KONDISI B: 100% Test Lolos & Nol Konflik:**
  - **Prompt-Driven Commit:** Eksekusi commit bergantung pada instruksi pengguna:
    - *Jika pengguna meminta commit:* Lakukan *selective staging* (`git add` hanya pada file target fitur) dan buat commit deskriptif (`feat(...)`, `fix(...)`, `refactor(...)`).
    - *Jika pengguna tidak meminta commit:* Biarkan perubahan di working directory dan laporkan hasil verifikasi beserta rekomendasi pesan commit.

---

## 5. Tahap 5: Observability & Post-Release
- Pastikan mutasi kritis memiliki *structured logging* (`timestamp`, `user_id`, `action`, `status`).
- Pastikan migrasi data bersifat *backward-compatible* terhadap sistem operasional.
