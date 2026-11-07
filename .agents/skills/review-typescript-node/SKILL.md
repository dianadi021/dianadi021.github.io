---
name: review-typescript-node
description: Activate this skill when reviewing, auditing, or inspecting backend TypeScript/JavaScript Node.js applications (AdonisJS v6, Express.js), ORMs (Lucid, Prisma, TypeORM), and async APIs.
---

# 🌐 Skill: Code Review TypeScript / JavaScript Node.js (AdonisJS & Express)

## 0. Protokol Review (Wajib)
1. **Scope:** Review hanya diff (`git diff <base>...HEAD`) atau file yang disebut user. Jika tidak jelas, tanyakan.
2. **Tooling dulu:** Jalankan perintah di `CONTEXT.md` (default: `tsc --noEmit`, `eslint .` / `biome check`, test runner `node ace test` / `vitest` / `jest`).
3. **Bukti:** Setiap temuan wajib `file:line`.
4. **Identifikasi framework:** Terapkan kolom yang sesuai (AdonisJS v6 vs Express).

---

## 1. Rubrik Pemeriksaan

### A. Type Safety
- [ ] `strict: true`; rekomendasi `noUncheckedIndexedAccess`. Dilarang `any` dan `as unknown as T` tanpa type guard.
- [ ] `catch (e: unknown)` + narrowing; dilarang asumsi `e.message`.
- [ ] Proyek JS murni: aktifkan `checkJs` + JSDoc, atau tandai sebagai risiko.
- [ ] **Validasi runtime:** AdonisJS → **VineJS** (`request.validateUsing`); Express → **Zod**. Tipe TS tidak berlaku saat runtime.

### B. Async & Event Loop
- [ ] Tidak ada API sinkron pemblokir di jalur request (`*Sync`, crypto berat, `JSON.parse` payload raksasa). CPU berat → `worker_threads`/queue.
- [ ] Tidak ada *floating promise* (aktifkan `@typescript-eslint/no-floating-promises`).
- [ ] Paralel independen: `Promise.all` / `Promise.allSettled`; dilarang `await` berurutan di loop jika tidak saling bergantung.
- [ ] **Express 4:** handler async wajib dibungkus/forward ke `next(err)`. Express 5 & AdonisJS menangani rejection secara native.

### C. Database & Transaksi
- [ ] **Read di Transaksi:** Dilarang *non-locking read* di dalam transaksi; locking read (`forUpdate()` / `SELECT ... FOR UPDATE`) dan read penentu write diizinkan.
- [ ] **Anti-N+1:** Lucid `.preload()` / Prisma `include` / TypeORM `relations`. Dilarang query ORM di dalam `for`/`map`.
- [ ] **Bulk:** `createMany` / `updateOrCreateMany` (Lucid), `createMany` (Prisma), kecuali logika per-baris mewajibkan serial.
- [ ] **Rollback:**
  - Utamakan *managed transaction*: Lucid `db.transaction(async (trx) => ...)`, Prisma interactive `$transaction(async (tx) => ...)` → auto-rollback.
  - Transaksi manual wajib `try { ... await trx.commit() } catch (e) { await trx.rollback(); throw e }`.
- [ ] **Bounded Query:** Pagination wajib (`.paginate()`, `take/skip`, cursor).
- [ ] Side effect (email/queue) dijalankan setelah commit.

### D. Arsitektur
- [ ] Controller tipis → Service/Action → Model/Repository. Dilarang query DB langsung di route callback Express.
- [ ] Dependency via IoC (Adonis `@inject()`) / constructor injection.
- [ ] Konfigurasi via env tervalidasi (Adonis `start/env.ts`, Express: Zod env schema).

### E. Keamanan (OWASP)
| Kontrol | AdonisJS v6 | Express |
|---|---|---|
| Security headers / CSRF | `@adonisjs/shield` | `helmet` (+ csrf untuk cookie session) |
| CORS | `@adonisjs/cors` (whitelist) | `cors` (whitelist, bukan `*` untuk API ter-auth) |
| Rate limit | `@adonisjs/limiter` | `express-rate-limit` |
| Otorisasi | `@adonisjs/bouncer` | middleware/policy eksplisit |
- [ ] Query dibatasi kepemilikan (user/tenant dari auth context, bukan body).
- [ ] Dilarang string-concat SQL; gunakan binding.
- [ ] Error response tanpa stack trace di produksi; format seragam `{ success, code, message, errors }`.
- [ ] Tidak ada secret di kode; upload divalidasi tipe & ukuran; tidak ada SSRF dari URL input user tanpa allowlist; log bebas PII/token.

### F. Testing
- [ ] Endpoint dan Service/Action yang berubah memiliki pengujian kontrak I/O (validasi `422`, anti-IDOR `403`, rollback transaksi, dan query count anti-N+1) sesuai standar [`test-backend-io`](../test-backend-io/SKILL.md).

---

## 2. Format Laporan
```
Status: APPROVED | REQUEST CHANGES | BLOCKED
Tooling: <hasil tsc / eslint / test>
Ringkasan: BLOCKER x · MAJOR x · MINOR x · NIT x

[SEVERITY] path/file.ts:LINE — Masalah
  Alasan: dampak
  Perbaikan: potongan kode
```
Severity: **BLOCKER** (keamanan, korupsi data, race) · **MAJOR** (N+1, floating promise, missing validation) · **MINOR** (typing, maintainability) · **NIT** (gaya).
