---
name: review-frontend-web
description: Activate this skill when reviewing, auditing, or inspecting web & desktop-hybrid frontend code (Vue 3, React, Inertia.js, Tauri/Electron UI, TypeScript/JavaScript SPA), reusable components, layout/UX consistency, input sanitization, state management, accessibility, or frontend security.
---

# 🖥️ Skill: Code Review Frontend Web & Desktop Hybrid (Vue 3 / React / Inertia / Tauri / Electron)

## 0. Protokol Review (Wajib)
1. **Scope:** Review hanya diff atau file yang disebut user.
2. **Tooling dulu:** Jalankan perintah di `CONTEXT.md` (default: `vue-tsc --noEmit` / `tsc --noEmit`, `eslint .`, `vitest run`).
3. **Bukti:** Setiap temuan wajib `file:line`.

---

## 1. Rubrik Pemeriksaan

### A. Komponen Reusable, Struktur Layout & Konsistensi UI/UX
- [ ] **Strict Reusable Components:** UI wajib memakai komponen atomik terpusat (`BaseButton`, `BaseInput`, `BaseNumericInput`, `BaseSelect`, `BaseModal`, `BaseTable`, `BaseCard`) dan design token (4px/8px spacing grid, warna, typography). Dilarang membuat elemen form/tombol ad-hoc atau hardcode pixel acak.
- [ ] **Presentational Separation:** Komponen reusable bersifat stateless/presentational (data via props, aksi via emits/callback; dilarang memanggil API/IPC langsung). Logika berulang diekstrak ke composable (Vue) / custom hook (React). Komponen > ±300 baris wajib dipecah.
- [ ] **Semantic Layout & Action Placement:**
  - Struktur halaman memakai landmark semantik (`<header>`, `<main>`, `<footer>`).
  - **Bottom Action Rule:** Primary action pada Form, Mobile View, Drawer, dan Modal wajib berada di slot bawah (`<footer>` / sticky bottom bar dengan `safe-area-inset-bottom`). Urutan tombol di footer modal/form: `[Secondary/Cancel (Kiri)]` → `[Primary/Submit (Kanan)]`.
  - **Destructive Guard:** Aksi hapus/reset memakai varian `danger` terpisah dan wajib melewati dialog konfirmasi.
- [ ] **4-State View & Overflow Resilience:** Setiap view berdata wajib menangani 4 state (`loading` skeleton/spinner, `empty` state + CTA, `error` state + retry, `success`). Teks dinamis panjang atau nominal besar wajib memiliki `truncate` / `line-clamp` agar tidak merusak posisi tombol.

### B. Typing, Standarisasi Input & Kontrak Data
- [ ] Vue: `defineProps<T>()` / `defineEmits<T>()` bertipe; React: props interface eksplisit. Dilarang `any`.
- [ ] Tipe respons API/IPC dibagi bersama (shared types) atau divalidasi (Zod) saat batas sistem.
- [ ] **Standar Input Angka & Moneter (Anti `type="number"` Polos):**
  - Dilarang memakai `<input type="number">` mentah (rawan input `e`/`+`/`-`, scroll wheel change, dan hilang leading zero).
  - *Integer / Kuantitas Bulat / OTP / Moneter:* Wajib `type="text" inputmode="numeric"` dengan sanitasi regex ASCII `/^\d+$/` (setelah strip separator ribuan tampilan) dan parser yang menghasilkan `bigint`/integer sen (bebas `float`).
  - *Desimal Pengukuran Non-Moneter (dosis, suhu, berat, rasio):* Gunakan `type="text" inputmode="decimal"` dengan guard regex `/^\d+([.,]\d{1,4})?$/` dan normalisasi separator desimal eksplisit.
- [ ] **Dirty Form & Idempotent Submit:** Form dengan perubahan belum tersimpan (`isDirty`) memiliki guard saat ditutup/navigasi keluar. Tombol submit wajib terkunci (`disabled` + `aria-busy="true"`) selama request berjalan untuk mencegah *double-submit*.

### C. State & Reaktivitas
- [ ] State lokal tetap lokal; state global (Pinia/Zustand/Redux) hanya untuk data lintas halaman.
- [ ] Vue: `computed` untuk turunan (bukan `watch` + assign); jangan mutasi props; `key` stabil di `v-for` (bukan index untuk list dinamis).
- [ ] React: dependency array `useEffect`/`useMemo` benar; tidak ada state turunan yang disimpan ganda.
- [ ] Listener/interval/subscription/IPC listener dibersihkan (`onUnmounted` / cleanup effect).

### D. Data Fetching & Performa
- [ ] Tidak ada request di dalam loop render / N request per item (gunakan endpoint batch).
- [ ] Request dibatalkan saat unmount (`AbortController`).
- [ ] List besar memakai pagination/virtualization; route/komponen berat di-lazy-load.
- [ ] Inertia: gunakan partial reload (`only`) dan props yang ramping.

### E. Keamanan
- [ ] Dilarang `v-html` / `dangerouslySetInnerHTML` dengan input user tanpa sanitasi (DOMPurify).
- [ ] Tidak ada secret/API key privat di bundle frontend atau `VITE_*` publik.
- [ ] Token tidak disimpan di `localStorage` bila tersedia cookie `HttpOnly`; CSRF token disertakan untuk session auth.
- [ ] Desktop (Tauri/Electron): `contextIsolation: true`, `nodeIntegration: false`, dan allowlist IPC command ketat.
- [ ] Otorisasi UI hanya kosmetik; backend tetap memvalidasi.

### F. Aksesibilitas & Semantik Keyboard (WCAG 2.1 AA)
- [ ] Elemen interaktif memakai elemen semantik (`button`, `a`), label form terhubung (`for`/`id`), `alt` pada gambar, ukuran sentuh minimal `44x44px`.
- [ ] Navigasi keyboard bekerja penuh: urutan `Tab` logis, `Enter` men-submit form, `Esc` menutup modal, focus trap di dalam modal aktif, dan auto-focus ke field pertama yang gagal validasi (`aria-invalid="true"`).

### G. Testing
- [ ] Komponen reusable, form kritis, dan composable memiliki unit/component I/O test sesuai standar [`test-client-io`](../test-client-io/SKILL.md).

---

## 2. Format Laporan
```
Status: APPROVED | REQUEST CHANGES | BLOCKED
Tooling: <hasil typecheck / eslint / test>
Ringkasan: BLOCKER x · MAJOR x · MINOR x · NIT x

[SEVERITY] path/Component.vue:LINE — Masalah
  Alasan: dampak
  Perbaikan: potongan kode
```
Severity: **BLOCKER** (XSS, secret bocor, crash, float moneter) · **MAJOR** (duplikasi komponen, input angka tanpa regex guard, primary button salah posisi, leak listener, request per item) · **MINOR** · **NIT**.
