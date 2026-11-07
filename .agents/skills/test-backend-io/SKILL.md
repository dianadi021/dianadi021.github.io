---
name: test-backend-io
description: Activate this skill when writing, executing, or auditing backend API and service Input/Output (I/O) tests, validation gates (422), anti-IDOR isolation (403), concurrency/idempotency, transaction rollback, anti-N+1 query count assertions, and generating backend testability refactor reports across Laravel (PHP) and Node.js TypeScript (AdonisJS/Express).
---

# ⚙️ Skill: Backend I/O Testing, Transaction Verification & Refactor Analysis

Panduan operasional lintas-backend (Laravel PHP 8.2+ & Node.js TypeScript AdonisJS/Express) untuk menguji kontrak Input/Output (I/O) secara dinamis, memverifikasi integritas transaksi, isolasi data, serta menghasilkan laporan analisis dan rekomendasi refactor berbasis bukti pengujian.

---

## 0. Protokol Eksekusi (Wajib)
1. **Identifikasi Stack & Runner:** Baca `CONTEXT.md` atau `composer.json` / `package.json` untuk menentukan test runner:
   - **Laravel / Modern PHP:** `php artisan test` atau `vendor/bin/pest` / `vendor/bin/phpunit` (gunakan `RefreshDatabase` / `DatabaseTransactions`).
   - **AdonisJS v6 (TypeScript):** `node ace test` (Japa runner + `@japa/api-client` + global database transaction).
   - **Express / Node.js (TypeScript):** `vitest run` atau `jest` (+ `supertest` & test database rollback).
2. **Zero Side-Effect Leakage:** Queue, Mail, Notification, Storage, dan HTTP eksternal wajib di-fake/mock (`Queue::fake()`, `Mail::fake()`, `Http::fake()`, `nock` / `MSW`).
3. **Strict Database Assertion:** Jangan hanya menguji status HTTP (`200`/`201`); wajib memverifikasi state akhir tabel database (`assertDatabaseHas`, `assertDatabaseMissing`, atau query count).

---

## 1. Matriks Vektor Uji Input/Output Backend (Wajib Diuji)

Setiap endpoint API, Action, atau Service mutasi wajib diuji terhadap **5 Kontrak I/O** berikut:

| # | Dimensi Uji | Input yang Disuntikkan (Test Vector) | Output yang Wajib Terbukti (Assertion) |
| :--- | :--- | :--- | :--- |
| **1** | **Validation Gate & Sanitization (`422` / Session Error)** | Suntikkan payload rusak: string angka ilmiah (`"1e5"`), nilai uang negatif/float (`-100`, `10.555`), field wajib kosong, payload XSS, dan *unpermitted field* (uji mass-assignment seperti `role: "admin"`, `tenant_id: 999`). | **REST/JSON API:** HTTP `422` dengan struktur error standar. **Inertia.js Web:** Redirect `302`/`303` + `assertSessionHasErrors()`. Pada kedua mode: field ilegal ditolak/diabaikan dan **0 baris database berubah**. |
| **2** | **Standard Response Envelope & No Data Leak** | Panggil endpoint pada skenario sukses (`200`/`201`) dan gagal (`400`/`404`/`422`/`500`). | Output JSON mematuhi kontrak amplop proyek di `CONTEXT.md` (default `{ data, meta }` & `{ success: false, code, message, errors }` atau Inertia props); **tidak membocorkan** stack trace, SQL query, `password`, `token`, atau kolom internal. |
| **3** | **Auth & Anti-IDOR Isolation (`401`/`403`/`404`)** | Login sebagai **User A (Tenant A)**, lalu kirim request `GET`/`PUT`/`DELETE` menggunakan `id` resource milik **User B (Tenant B)**, serta coba kirim request tanpa token. | Mengembalikan `401` (tanpa auth) dan `403`/`404` (lintas user/tenant); data milik User B di database **terbukti tidak berubah**. |
| **4** | **Idempotency, Concurrency & Monetary Precision** | Kirim request mutasi ganda (atau 2 eksekusi berurutan dengan *idempotency key* / saldo terbatas) serta uji perhitungan harga/diskon/pajak. | Saldo/stok tidak menjadi negatif; mutasi duplikat ditolak atau idempoten; hasil kalkulasi moneter akurat hingga satuan terkecil (integer sen / `decimal`, bebas selisih `float`). |
| **5** | **Transaction Rollback, After-Commit & Anti-N+1** | Paksa kegagalan (throw exception) pada langkah terakhir di dalam transaksi multi-tabel; serta uji endpoint list dengan 10+ record relasi. | Saat langkah terakhir gagal, mutasi langkah pertama **wajib ter-rollback 100%** dan **tidak ada job/email yang terkirim** (`Queue::assertNothingPushed`). Pada endpoint list, jumlah query DB tetap konstan (`assertQueryCount` / bebas N+1). |

---

## 2. Rubrik Analisis Testability & Trigger Refactor

Jika saat penulisan atau eksekusi test ditemukan kondisi di bawah ini, agen **wajib** mengeluarkan rekomendasi refactor pada laporan:

1. **Fat Controller (Logika Bisnis Terkunci di HTTP Layer):** Logika kalkulasi/transaksi ditulis langsung di dalam Controller/Route callback sehingga tidak bisa dites secara unit tanpa membangkitkan seluruh HTTP stack → **Refactor:** Ekstrak ke `Service` / `Action` class yang menerima DTO bertipe.
2. **Hardcoded External Dependency (Sulit Di-mock):** Memanggil SDK pihak ketiga, waktu statis (`now()` / `new Date()`), atau koneksi eksternal tanpa Dependency Injection / Interface → **Refactor:** Gunakan constructor injection / IoC container agar mudah di-swap dengan Fake saat testing.
3. **Plain-SELECT Inside Transaction / N+1 Loop:** Ditemukan query `SELECT` non-locking di dalam blok `DB::transaction` atau jumlah query membengkak seiring jumlah item (`N+1`) → **Refactor:** Pindahkan *non-locking read* ke luar transaksi; gunakan `with()` / `.preload()` / `whereIn()` dan *bulk insert/upsert*.
4. **Premature Side-Effects:** Job/Email/Event terpanggil meskipun transaksi sengaja digagalkan dalam test → **Refactor:** Tambahkan `->afterCommit()` / `ShouldDispatchAfterCommit` atau pindahkan dispatch ke luar blok transaksi setelah commit berhasil.

---

## 3. Format Laporan Standar (Backend I/O & Refactor Report)

Gunakan format ini di dalam bagian **2. Kode / Eksekusi** untuk melaporkan hasil pengujian sekaligus menjadi referensi refactor bagi pengguna:

```markdown
Status I/O: PASS | FAIL | NEEDS REFACTOR
Stack & Runner: <Laravel-Pest/PHPUnit | Adonis-Japa | Node-Vitest> (<X> passed, <Y> failed)
Skor Testability: HIGH (Modular Service/Action) | MEDIUM | LOW (Fat Controller / Coupled)

### 1. Matriks Verifikasi I/O & Transaksi
- [PASS/FAIL] 1. Validation Gate & Mass-Assignment (422): <bukti input "1e5" / negatif / extra field ditolak>
- [PASS/FAIL] 2. Response Envelope & No Sensitive Leak: <bukti struktur JSON & tidak ada leak kolom/stacktrace>
- [PASS/FAIL] 3. Anti-IDOR & Tenant Isolation (401/403): <bukti akses lintas user/tenant terblokir>
- [PASS/FAIL] 4. Idempotency & Monetary Precision: <bukti stok/saldo aman & bebas float>
- [PASS/FAIL] 5. Transaction Rollback, After-Commit & Query Count: <bukti rollback bersih & X queries (0 N+1)>

### 2. Analisis & Rekomendasi Refactor
[PRIORITY: HIGH | MEDIUM | LOW] path/to/File.ext:LINE — <Judul Masalah>
  Gejala I/O: <mengapa test gagal, lambat, atau sulit di-mock>
  Akar Masalah: <Fat Controller / N+1 / missing afterCommit / IDOR>
  Rekomendasi Refactor:
  ```<lang>
  // Potongan kode perbaikan yang direkomendasikan
  ```
```
