# 🚀 AGENTS.md - Standar Profesional Rekayasa Perangkat Lunak

Dokumen ini adalah *Permanent Rules & Behavioral Constitution* yang selalu aktif (*Always-On*). Seluruh keputusan, analisis, dan eksekusi kode wajib mematuhi standar di bawah ini.

---

## 1. Core Operating Principles
- **Direct & Concise:** Langsung ke inti teknis. Dilarang menggunakan basa-basi pembuka atau penutup.
- **Zero Speculation:** Dilarang mengasumsikan aturan bisnis atau spesifikasi yang tidak tertulis. Jika data kurang, nyatakan butuh klarifikasi.
- **Token Economy:** Gunakan kalimat sependek mungkin, utamakan poin padat, dan hindari redundansi.

---

## 2. Separation of Concerns Architecture
Sistem memisahkan tanggung jawab menjadi 3 lapisan:
1. **Rules (`AGENTS.md`):** Konstitusi permanen yang mengatur disiplin kode, keamanan, dan protokol verifikasi (Always-On).
2. **Domain State (`CONTEXT.md`):** Single Source of Truth spesifik proyek yang memuat batasan entitas, invarian bisnis unik, dan string perintah verifikasi otomatis (test/lint). Disusun/diperbarui pada tahap Planning (via [`sdlc-planning`](./.agents/skills/sdlc-planning/SKILL.md); inisialisasi dari [`CONTEXT.template.md`](./.agents/skills/sdlc-planning/resources/CONTEXT.template.md) jika belum ada), lalu menjadi acuan mutlak (*immutable reference*) selama tahap Delivery. Agen dilarang memodifikasi isi `CONTEXT.md` di luar fase Planning tanpa instruksi eksplisit.
3. **Workflow Procedures (`.agents/skills/`):** Prosedur bertahap yang dimuat secara *on-demand* sesuai intensi tugas:
   - [`trend-research`](./.agents/skills/trend-research/SKILL.md): Riset eksternal, pemindaian Google Trends, berita realtime, dan sentimen komunitas/sosial media (Reddit/HN).
   - [`sdlc-brainstorming`](./.agents/skills/sdlc-brainstorming/SKILL.md): Tahap discovery, brainstorming 5W+1H, eksplorasi alternatif, analisis kebutuhan, dan deteksi ambiguitas.
   - [`sdlc-planning`](./.agents/skills/sdlc-planning/SKILL.md): Tahap arsitektur, domain modeling, kontrak interface, dan skema migrasi.
   - [`sdlc-delivery`](./.agents/skills/sdlc-delivery/SKILL.md): Tahap implementasi kode, automated testing, dan release/commit.
   - [`sdlc-lifecycle`](./.agents/skills/sdlc-lifecycle/SKILL.md): Alur komprehensif 10 fase dari 0 sampai rilis.
   - [`sdlc-audit`](./.agents/skills/sdlc-audit/SKILL.md): Audit kepatuhan proyek, evaluasi kelengkapan CONTEXT.md, dan analisis celah SDLC.
   - [`review-android-kotlin`](./.agents/skills/review-android-kotlin/SKILL.md): Code review Android Native (Kotlin), Jetpack Compose, Coroutines/Flow, dan anti-pattern leaks.
   - [`review-laravel-php`](./.agents/skills/review-laravel-php/SKILL.md): Code review Laravel & Modern PHP (PHP 8.2+), pure-write transactions, anti-N+1, bulk mutations, dan Backed Enums.
   - [`review-typescript-node`](./.agents/skills/review-typescript-node/SKILL.md): Code review TypeScript & Node.js (AdonisJS / Express), strict typing, VineJS/Zod, dan non-blocking I/O.
   - [`review-frontend-web`](./.agents/skills/review-frontend-web/SKILL.md): Code review frontend web & desktop-hybrid (Vue 3 / React / Inertia / Tauri / Electron), komponen reusable, semantik layout, standarisasi input regex, state, keamanan, dan a11y.
   - [`test-backend-io`](./.agents/skills/test-backend-io/SKILL.md): Pengujian dinamis Input/Output (I/O) backend (Laravel / Node.js TS), validasi 422, anti-IDOR 403, rollback transaksi, anti-N+1 query count, serta laporan analisis testability & refactor.
   - [`test-client-io`](./.agents/skills/test-client-io/SKILL.md): Pengujian dinamis Input/Output (I/O) client lintas stack (Web, Android, Desktop), verifikasi semantik UI/UX (bottom action, 4-state, input regex), serta laporan analisis testability & rekomendasi refactor.

---

## 3. Context & Exploration Protocol
- **Code Skeletonizing:** Jangan muat seluruh isi file jika hanya butuh struktur. Cukup ekstrak *interfaces*, *type definitions*, dan *function signatures*.
- **Top-k Strict Context:** Buka hanya file yang berhubungan langsung dengan tugas yang diberikan.
- Manfaatkan indeks relasi (seperti `graphify` / `GRAPH_REPORT.md`) jika tersedia untuk menelusuri dependensi.

---

## 4. Standar Eksekusi Teknis (Technical Guardrails)
- **Strict Typing:** Wajib mengaktifkan strict mode; dilarang menggunakan `any` atau tipe implisit ambigu.
- **Anti-N+1 Query Loops:** Dilarang keras memanggil query DB atau relasi di dalam perulangan (`for`, `foreach`, `map`). Wajib menggunakan *eager loading* (`with()`, `include()`) atau batch *WHERE IN*.
- **Pure-Write Transactions & Rollback:**
  - *No Plain-SELECT in Transactions:* Dilarang menaruh *non-locking read* (`SELECT` biasa) di dalam blok transaksi, apalagi di dalam loop. Data referensi/penyiapan wajib diambil di luar transaksi.
  - *Pengecualian Sah:* *Locking read* (`SELECT ... FOR UPDATE` / `lockForUpdate()` / `sharedLock()`) dan read yang hasilnya menentukan keputusan write di bawah konkurensi **wajib** berada di dalam transaksi (mencegah TOCTOU/race condition).
  - *Lingkup Mutasi:* Transaksi dibuka HANYA saat operasi tulis (CREATE, UPDATE, DELETE) dimulai.
  - *Mutasi dalam Loop:* Utamakan mutasi massal (*bulk/batch*). Mutasi per-item di dalam loop hanya diizinkan jika ada kebutuhan bisnis unik (validasi baris per baris / event hooks terisolasi).
  - *Proteksi Rollback:* Wajib menggunakan closure (`DB::transaction(...)`) atau `try ... catch { DB::rollBack(); throw; }`.
  - *Post-Commit Side Effects:* Job antrean, event bus, atau notifikasi eksternal dilarang dieksekusi sebelum transaksi commit (wajib gunakan hook `afterCommit` atau transaction-aware dispatch).
- **Anti-Deadlock Locking:** Penguncian baris konkuren (*pessimistic lock*) wajib terurut deterministik per-baris (misal: `ORDER BY id ASC FOR UPDATE`) serta konsisten mengikuti hierarki penguncian antar-tabel secara global.
- **Query Optimization & Bounded Scope:** Hindari subquery berlebih (*excessive subqueries*); gunakan `JOIN` terindeks. Dilarang query koleksi terbuka tanpa batas pagination (`LIMIT`).
- **Security & Anti-IDOR:** Setiap query mutasi/baca wajib menyertakan filter batas otentikasi (`tenant_id` / `user_id` dari sesi auth). Dilarang menyambung string query mentah (wajib *parameter binding*).
- **Presisi Finansial:** Dilarang menggunakan tipe `float` untuk moneter; gunakan `decimal` atau `bigint` (satuan sen).
- **UI/UX, Reusable Components & Kontrak I/O:**
  - *Strict Reusable Components:* UI wajib memakai komponen atomik terpusat (`BaseButton`, `BaseInput`, `BaseNumericInput`, `BaseModal`, `BaseScaffold`) dan token spacing 4px/8px.
  - *Semantic Bottom Action & 4-State View:* Primary action pada form/modal/mobile wajib di slot bawah (`<footer>` / `Scaffold.bottomBar`) dengan urutan `[Cancel (Kiri)] → [Submit (Kanan)]`. Setiap view wajib menangani 4 state (`Loading`, `Empty`, `Error`, `Success`) dan `truncate` teks panjang.
  - *Standar Input Angka & Idempotent Action:* Dilarang memakai `<input type="number">` polos. Untuk integer/OTP/moneter sen wajib `type="text" inputmode="numeric"` + sanitasi ASCII `/^\d+$/` (setelah strip separator tampilan); untuk matriks/bobot desimal non-moneter (seperti bobot TOPSIS) gunakan `type="text" inputmode="decimal"` + `/^\d+([.,]\d{1,4})?$/`. Tombol submit wajib mengunci diri (`disabled`/`loading`) saat proses berjalan dan form dengan `isDirty` memiliki guard konfirmasi keluar.
- **Keamanan Frontend & Lifecycle Spesifik Proyek:** Sanitasi input/output terhadap XSS & CSV Formula Injection (CWE-1236), isolasi hidrasi waktu dinamis dengan `<ClientOnly>`, serta pembersihan event listener secara simetris via `onUnmounted` atau `useEventListener` (`@vueuse/core`).
- **Production-Ready & No Boilerplate:** Kode langsung pakai, modular, dan dilarang menulis ulang fungsi/impor yang tidak dimodifikasi.

---

## 5. Conflict Decision Gate & Git Workflow
Pada tahap verifikasi pengujian:
- ⚠️ **Kondisi A (Gagal Test / Regresi / Terdeteksi Konflik):**
  - **Stop & Alert:** Berikan peringatan segera. Dilarang keras melakukan commit.
  - Biarkan modifikasi dalam status *uncommitted* di working directory untuk inspeksi pengguna.
  - Sajikan *Deep Analysis* (akar masalah, file terdampak, trade-off solusi).
- ✅ **Kondisi B (Lolos Test & Nol Konflik):**
  - **Prompt-Driven Commit:** Eksekusi `git add` dan `git commit` ditentukan oleh instruksi/prompt pengguna:
    - *Jika pengguna meminta commit:* Lakukan *selective staging* hanya pada file target fitur (`git add [file]`) dan buat commit deskriptif berformat *Conventional Commits* (`feat(...)`, `fix(...)`, `refactor(...)`).
    - *Jika pengguna tidak meminta commit:* Biarkan perubahan di working directory dan laporkan kesiapan rilis beserta saran pesan commit.

---

## 6. Reflexion & Limitations (Wajib di Setiap Solusi)
Di setiap akhir solusi teknis, sertakan analisis keterbatasan secara jujur:
- **Keterbatasan:** Hal yang tidak dapat ditangani oleh implementasi saat ini.
- **Trade-off:** Kompromi arsitektural (latensi, penggunaan memori, atau skenario gagal).

---

## 7. Standard Output Format
Gunakan struktur balasan berikut:
1. **Ringkasan:** (Maksimal 2 kalimat langsung ke poin utama)
2. **Kode / Eksekusi:** (Hanya blok kode atau langkah taktis)
3. **Keterbatasan & Cons:** (Minimal 1 poin jujur mengenai kelemahan solusi)

*Prioritas:* Jika skill aktif memiliki format laporan sendiri (review/audit), format skill dipakai di bagian **Kode / Eksekusi**; struktur 3 bagian di atas tetap menjadi kerangka luar.
