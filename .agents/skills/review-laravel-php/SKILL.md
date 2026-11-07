---
name: review-laravel-php
description: Activate this skill when reviewing, auditing, or inspecting Laravel & Modern PHP (PHP 8.2+) codebases, Eloquent queries, transactions, queues, or architecture.
---

# 🐘 Skill: Code Review Laravel & Modern PHP

## 0. Protokol Review (Wajib)
1. **Scope:** Review hanya diff (`git diff <base>...HEAD`) atau file yang disebut user. Jika scope tidak jelas, tanyakan.
2. **Tooling dulu:** Jalankan perintah di `CONTEXT.md` (default: `vendor/bin/pint --test`, `vendor/bin/phpstan analyse` / Larastan level ≥ 6, `php artisan test`). LLM fokus pada hal yang tidak terdeteksi tool (arsitektur, konkurensi, logika bisnis).
3. **Bukti:** Setiap temuan wajib menyertakan `file:line`. Dilarang melaporkan temuan tanpa bukti kode.

---

## 1. Rubrik Pemeriksaan

### A. Transaksi & Kinerja Basis Data
- [ ] **Read di Transaksi:** Dilarang *non-locking read* di dalam `DB::transaction`. **Diizinkan/wajib:** `lockForUpdate()` / `sharedLock()` dan read yang menentukan write di bawah konkurensi.
- [ ] **Anti-N+1:** Tidak ada query di dalam loop. Gunakan `with()`, `loadMissing()`, `withCount()`, atau `whereIn()`. Pastikan `Model::preventLazyLoading(! app()->isProduction())` aktif di `AppServiceProvider`.
- [ ] **Bulk Mutation:** Utamakan `insert()`, `upsert()`, `whereIn()->update/delete()`. Mutasi per-item di loop hanya jika logika bisnis per-baris (event/observer, validasi baris) mewajibkannya, dan tetap di dalam transaksi.
- [ ] **Rollback & Retry:** Gunakan closure `DB::transaction($cb, attempts: 3)` (auto-rollback + retry deadlock). Transaksi manual wajib `try/catch { DB::rollBack(); throw $e; }`.
- [ ] **Urutan Lock:** Penguncian multi-baris terurut deterministik (`orderBy('id')->lockForUpdate()`).
- [ ] **Data Besar:** Gunakan `chunkById()` / `lazyById()` / `cursorPaginate()`. Dilarang `all()` / `get()` tanpa batas pada tabel yang tumbuh.
- [ ] **Indeks:** Kolom filter/join/sort baru memiliki indeks di migrasi.

### B. Queue, Event & Side Effects
- [ ] **After Commit:** Job/event/notification/mail yang di-dispatch dari dalam transaksi wajib `->afterCommit()` atau mengimplementasikan `ShouldDispatchAfterCommit`/`ShouldQueueAfterCommit`.
- [ ] **Idempotensi:** Job aman dijalankan ulang (`ShouldBeUnique`, idempotency key, atau cek state), dengan `tries`/`backoff` eksplisit.
- [ ] **Konteks Tenant (jika multi-tenant):** Job membawa tenant ID secara eksplisit; jangan bergantung pada state request/session.

### C. Arsitektur
- [ ] **Thin Controller:** Validasi di `FormRequest`, logika di Service/Action, respons via API Resource / Inertia.
- [ ] **DTO / Typed Data:** Data antar-layer memakai DTO bertipe, bukan array asosiatif bebas.
- [ ] **Backed Enums:** Status/tipe memakai PHP Backed Enum + Eloquent cast. Dilarang magic string.
- [ ] **Strict Types:** `declare(strict_types=1);`, typed properties, return types.
- [ ] **Presisi Moneter:** Kolom `decimal`; kalkulasi via integer (sen) / `bcmath` / brick/money. Dilarang `float`.

### D. Keamanan (OWASP)
- [ ] **Otorisasi:** Setiap aksi dilindungi Policy/Gate (`$this->authorize`, `can` middleware). Query dibatasi scope kepemilikan (user/tenant dari auth, bukan dari request body).
- [ ] **Mass Assignment:** `$fillable` eksplisit; dilarang `$guarded = []` + `$request->all()`. Gunakan `$request->validated()`.
- [ ] **Injection:** Raw query (`whereRaw`, `DB::select`) wajib binding parameter.
- [ ] **XSS:** Hindari `{!! !!}` untuk input user.
- [ ] **Secrets & Upload:** Tidak ada secret di kode (gunakan `config()`/env); upload divalidasi `mimes`, `max`, disimpan di luar public root.
- [ ] **Error Contract & Log:** Respons error API tanpa stack trace di produksi dengan format konsisten `{ success: false, code, message, errors }`; log bebas PII/token/password.

### E. Testing
- [ ] Endpoint dan Service/Action yang berubah memiliki pengujian kontrak I/O (validasi `422`, anti-IDOR `403`, rollback transaksi, dan query count anti-N+1) sesuai standar [`test-backend-io`](../test-backend-io/SKILL.md).

---

## 2. Format Laporan
```
Status: APPROVED | REQUEST CHANGES | BLOCKED
Tooling: <hasil pint / phpstan / test>
Ringkasan: BLOCKER x · MAJOR x · MINOR x · NIT x

[SEVERITY] path/file.php:LINE — Masalah
  Alasan: dampak teknis/bisnis
  Perbaikan: potongan kode
```
- **BLOCKER:** korupsi data, celah keamanan, race condition, regresi.
- **MAJOR:** N+1, missing afterCommit, pelanggaran arsitektur.
- **MINOR:** maintainability, naming, typing kurang.
- **NIT:** gaya/opsional.
