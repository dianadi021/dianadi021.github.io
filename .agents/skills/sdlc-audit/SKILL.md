---
name: sdlc-audit
description: Activate this skill when the user wants to audit, review, or analyze whether a project, its CONTEXT.md, codebase, or rules comply with the professional SDLC framework, technical invariants, and architectural standards.
---

# 🔍 Skill: SDLC Project & Compliance Audit

## 0. Protokol Audit (Wajib)
1. **Scope:** Tentukan target (repo/modul/diff). Jika tidak jelas, tanyakan.
2. **Navigasi berbasis indeks:** Baca `graphify-out/GRAPH_REPORT.md` jika ada; cek kesegaran (`git rev-parse HEAD` vs commit graph). Buka hanya node dalam *blast radius*.
3. **Tooling dulu:** Jalankan perintah verifikasi dari `CONTEXT.md` (test, lint, typecheck/static analysis).
4. **Bukti wajib:** Setiap temuan menyertakan `file:line` atau output perintah. Dimensi yang relevan namun tidak diperiksa wajib ditandai **NOT CHECKED**; dimensi yang secara arsitektur tidak relevan (mis. `D3 Basis Data` pada aplikasi frontend statis/SSG tanpa DB) ditandai **N/A (<alasan stack>)**.
5. **Stack-specific:** Untuk dimensi kode & pengujian I/O, terapkan rubrik skill `review-*` dan `test-*-io` yang sesuai (`review-laravel-php`, `review-typescript-node`, `review-android-kotlin`, `review-frontend-web`, `test-backend-io`, `test-client-io`).

---

## 1. Dimensi Audit

### D1. Dokumen & Domain State (`CONTEXT.md`)
- [ ] Perintah verifikasi (test, lint, typecheck) tersedia dan dapat dieksekusi.
- [ ] Invarian bisnis kritis tertulis eksplisit.
- [ ] State machine entitas utama (transisi valid & terlarang) terdefinisi.
- [ ] Kebijakan isolasi data (user/tenant) terdokumentasi (jika relevan).

### D2. Guardrails Teknis
- [ ] Strict typing aktif di konfigurasi (tsconfig / phpstan / detekt).
- [ ] Query dibatasi kepemilikan (anti-IDOR) dan memakai parameter binding.
- [ ] Mutasi multi-tabel atomik dengan rollback.
- [ ] Tidak ada `float` untuk nilai moneter.

### D3. Basis Data & Konkurensi
1. **Read di Transaksi:** Tidak ada non-locking read di dalam transaksi. Locking read (`FOR UPDATE`) dan read penentu write diizinkan.
2. **N+1:** Tidak ada query di dalam loop; eager loading / `WHERE IN`.
3. **Bulk vs Loop:** Mutasi massal diutamakan; mutasi per-item di loop hanya jika logika bisnis mewajibkan, di dalam transaksi.
4. **Subquery:** Tidak ada correlated subquery berlebih tanpa indeks; gunakan JOIN/CTE.
5. **Rollback:** Transaksi memakai closure/managed transaction atau try-catch-rollback.
6. **Bounded Query:** Koleksi besar dipaginasi/di-chunk.
7. **Race Condition (Read-Then-Write):** Pola `find → if → save` pada resource bersama wajib dimitigasi. Rekomendasikan salah satu:
   - Pessimistic lock terurut (`ORDER BY id ASC FOR UPDATE`).
   - Atomic update (`UPDATE ... SET qty = qty - ? WHERE id = ? AND qty >= ?`).
   - Constraint DB (`CHECK (qty >= 0)`, `UNIQUE`).
   - Distributed lock (Redis) untuk lintas service.
8. **Side Effect After Commit:** Job/event dari dalam transaksi dijalankan setelah commit.
9. **Presisi & Pembulatan:** Kalkulasi moneter memiliki aturan pembulatan eksplisit dan jejak selisih (jika domain mensyaratkan).
10. **Background Worker:** Job membawa konteks user/tenant eksplisit dan idempoten.

### D4. Keamanan & Kontrak I/O (OWASP & Client/Backend Boundary)
- [ ] Otorisasi per aksi, tidak ada secret di repo, validasi upload, error tanpa stack trace, log bebas PII.
- [ ] **Backend I/O (`test-backend-io`):** Validasi input ketat (`422`), amplop JSON konsisten, anti-IDOR (`403`), dan bukti test rollback transaksi.
- [ ] **Client UI/UX & I/O (`test-client-io`):** Penggunaan reusable base components, input angka berbasis regex (bukan `type="number"` polos), primary action di slot bawah (`<footer>`/`bottomBar`), dan kelengkapan 4-state view.

### D5. Gate SDLC
Tentukan posisi: **Discovery** · **Planning** · **Ready for Delivery** · **Released** · **Non-Compliant** (ada BLOCKER).

---

## 2. Rubrik Status (Pengganti Skor %)
| Status | Kriteria |
|---|---|
| **COMPLIANT** | 0 BLOCKER, 0 MAJOR, semua dimensi relevan CHECKED (atau N/A dengan alasan sah) |
| **COMPLIANT WITH WARNINGS** | 0 BLOCKER, ada MAJOR/MINOR, semua dimensi relevan CHECKED/N/A |
| **NON-COMPLIANT** | ≥ 1 BLOCKER |
| **INCOMPLETE** | Ada dimensi relevan berstatus NOT CHECKED |

---

## 3. Format Laporan
```
Status: <rubrik di atas>
Gate: <posisi SDLC>
Tooling: <ringkasan output perintah>
Cakupan: D1 ✓ · D2 ✓ · D3 ✓/N/A · D4 ✓ · D5 ✓
Ringkasan: BLOCKER x · MAJOR x · MINOR x · NIT x

[SEVERITY] path/file:LINE — Temuan
  Alasan: dampak
  Remediasi: langkah/potongan kode
```
Tutup dengan **Remediation Plan** (maks. 3 langkah, urut prioritas).
