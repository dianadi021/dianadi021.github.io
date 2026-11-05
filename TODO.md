# 📋 Engineering TODO & Quality Roadmap

Daftar tugas terstruktur berdasarkan hasil **SDLC Audit**, **SDLC Planning**, **Code Review Frontend Web**, dan **Code Review TypeScript/Node**.

---

## 🎯 Status Progres Keseluruhan
- [x] **Fase 0: Spesifikasi Kontrak & Kristalisasi CONTEXT.md** *(Selesai)*
- [x] **Fase 1: P1 Blocker — Type Safety & Build Integrity (`topsis.vue`)** *(Selesai)*
- [x] **Fase 2: P2 Quality Gate CI/CD & Automasi Pengujian** *(Selesai)*
- [x] **Fase 3: P3 Stabilitas Lifecycle, Memory Leak & Reaktivitas** *(Selesai)*
- [ ] **Fase 4: P4 Dekomposisi Layout & Rekayasa Komponen Modular**
- [ ] **Fase 5: P5 Keamanan Frontend & Strict Typing Guard**
- [ ] **Fase 6: P6 Pembersihan Artefak Zombie & Codebase Hygiene**

---

## ✅ Fase 0: Spesifikasi Kontrak & Perencanaan (SELESAI)
- [x] **Penyusunan Kontrak Tipe Matematis TOPSIS ([`app/types/topsis.ts`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/types/topsis.ts))**
  - [x] Definisikan interface `Criterion`, `Alternative`, `RankedAlternative`, dan `TopsisCalculationResult`.
  - [x] Definisikan union type `TopsisState` (`INSUFFICIENT_DATA`, `INVALID_PARAMETERS`, `READY_AND_RANKED`).
  - [x] Tetapkan signature skeleton fungsi kalkulator tanpa logika bisnis (`TopsisCalculatorFn`).
  - [x] Verifikasi sintaks dan typing via `tsc --noEmit`.
- [x] **Kristalisasi [`CONTEXT.md`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/CONTEXT.md#L89-L123)**
  - [x] Bagian 7: *Stack Verification Commands* (`pnpm run typecheck`, `build`, `generate`).
  - [x] Bagian 8: *Domain Entities & TOPSIS State Machine Transitions*.
  - [x] Bagian 9: *5 Critical Invariants* (matrix bounds, zero-divisor guard, strict indexing, lifecycle cleanup, CI gate).

---

## ✅ Fase 1: P1 Blocker — Type Safety & Build Integrity (`topsis.vue`) (SELESAI)
- [x] **Selesaikan 14 Error Kompilasi pada [`app/pages/portofolio/topsis.vue`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/portofolio/topsis.vue#L33-L74)**
  - [x] Implementasikan defensive indexing `(row[column] ?? 0) ** 2` untuk mengatasi `TS2532: Object is possibly 'undefined'`.
  - [x] Pasang guard normalisasi pembagi nol `norms[column] ?? 1` dan validasi bobot kriteria `criteria.value[column]`.
  - [x] Filter array `values` dengan fallback numerik (`row[column] ?? 0`) sebelum passing ke `Math.max` / `Math.min` (`TS2345`).
  - [x] Terapkan type narrowing pada `results.value[0]` sebelum membaca properti `.name` dan `.score` (`TS18048`).
  - [x] Tambahkan defensive guard pada mutasi `alternatives.value[alternativeIndex]`.
  - [x] Jalankan verifikasi statis `pnpm run typecheck` hingga lulus 100% dengan status 0 error.

---

## ✅ Fase 2: P2 Quality Gate CI/CD & Automasi (SELESAI)
- [x] **Penguncian Pipeline GitHub Actions ([`.github/workflows/deploy-pages.yml`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/.github/workflows/deploy-pages.yml#L38-L39))**
  - [x] Sisipkan step validasi statis `run: pnpm run typecheck` sebelum langkah `pnpm generate`.
  - [x] Pastikan alur kerja otomatis *fail-fast* jika terdapat regresi tipe data.
- [x] **Konfigurasi Verifikasi Tambahan (`package.json`)**
  - [x] Quality gate terintegrasi pada workflow deployment.

---

## ✅ Fase 3: P3 Stabilitas Lifecycle, Memory Leak & Reaktivitas (SELESAI)
- [x] **Pencegahan Memory Leak pada Layout ([`app/layouts/default.vue:31`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/layouts/default.vue#L31))**
  - [x] Ganti `window.addEventListener('scroll', ...)` dengan `useEventListener(window, 'scroll', ...)` dari `@vueuse/core` atau pasang pembersihan simetris di `onUnmounted`.
- [x] **Pencegahan Floating Response & Timer Leak**
  - [x] Bungkus reset timer clipboard di [`app/pages/portofolio/topsis.vue:98`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/portofolio/topsis.vue#L98) dengan `useTimeoutFn` dari `@vueuse/core`.
  - [x] Pasang `AbortController` pada pemanggilan `$api.get(...)` di [`app/pages/about.vue:63`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/about.vue#L63) untuk membatalkan request saat unmount.
- [x] **Perbaikan Reaktivitas Jam Sistem ([`app/pages/index.vue:23-25`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/index.vue#L23-L25))**
  - [x] Ganti `computed` waktu statis dengan composable `useNow()` + Day.js di dalam tag `<ClientOnly>` untuk mencegah SSR/SSG hydration mismatch.

---

## 🧱 Fase 4: P4 Dekomposisi Layout & Rekayasa Komponen Modular
- [ ] **Perbaikan Multi-Root Fragment ([`app/pages/index.vue:858-859`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/index.vue#L858-L859))**
  - [ ] Pindahkan elemen `<section id="portofolio">` ke dalam kontainer pembungkus utama `<div>` untuk mencegah peringatan transisi Nuxt.
- [ ] **Dekomposisi Monolit Halaman Utama ([`app/pages/index.vue`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/index.vue) — 878 baris)**
  - [ ] Ekstraksi ke `app/components/home/HomeHero.vue` (Hero section, branding, dan CTA).
  - [ ] Ekstraksi ke `app/components/home/HomeTerminal.vue` (Terminal developer live status).
  - [ ] Ekstraksi ke `app/components/home/HomeExperience.vue` (Riwayat kerja industri PT Medika & Zettabyte).
  - [ ] Ekstraksi ke `app/components/home/HomeSkills.vue` (Tab filter tech stack & kartu skill).
  - [ ] Ekstraksi ke `app/components/home/HomeContact.vue` (Section kontak & copy email).
- [ ] **Ekstraksi Logika TOPSIS ke Composable (`app/composables/useTopsis.ts`)**
  - [ ] Pindahkan aljabar linear dari [`topsis.vue`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/portofolio/topsis.vue) ke composable yang mengadopsi [`app/types/topsis.ts`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/types/topsis.ts).
- [ ] **Stabilisasi Virtual DOM Key ([`app/pages/portofolio/topsis.vue:156,175`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/portofolio/topsis.vue#L156))**
  - [ ] Ganti `:key="index"` dan `:key="rowIndex"` dengan properti ID stabil (`id: string`) pada kriteria dan alternatif.
- [ ] **Fitur Interaktif Unggulan: Global Command Palette (`Ctrl+K` / `Meta+K`)**
  - [ ] Buat komponen `app/components/ui/CommandPalette.vue` menggunakan `@headlessui/vue` Combobox + Dialog.
  - [ ] Hubungkan aksi shortcut cepat: Navigasi rute, Salin Email, Cetak CV ATS, dan Toggle Theme.

---

## 🛡️ Fase 5: P5 Keamanan Frontend & Strict Typing Guard
- [ ] **Mitigasi CSV Formula Injection (CWE-1236) ([`app/pages/portofolio/topsis.vue:112`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/portofolio/topsis.vue#L112))**
  - [ ] Tambahkan sanitasi prefix kutip satu (`'`) pada sel teks yang diawali karakter formula (`=`, `+`, `-`, `@`, `\t`, `\r`) saat export CSV.
- [ ] **Eliminasi Penggunaan Tipe Longgar `any` & Error Narrowing**
  - [ ] Refactor `catch (error: any)` di [`app/pages/about.vue:73`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/about.vue#L73) menjadi `catch (error: unknown)` dengan safe narrowing `error instanceof Error`.
  - [ ] Refactor `ref<any>(null)` di [`app/pages/about.vue:57`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/about.vue#L57) menjadi typed response DTO.
- [ ] **Validasi Lingkungan Runtime ([`nuxt.config.ts:8,72`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/nuxt.config.ts#L8))**
  - [ ] Berikan penanganan fallback bertipe ketat pada pembacaan `process.env`.

---

## 🧹 Fase 6: P6 Pembersihan Artefak Zombie & Codebase Hygiene
- [ ] **Pembersihan Warning PostCSS / Tailwind ([`package.json:40`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/package.json#L40))**
  - [ ] Hapus dependensi `@tailwindcss/nesting` yang memicu peringatan `[NUXT_B5010]` dan `[NUXT_B7007]`.
- [ ] **Eliminasi Scaffolding Lama (`src/` & Config Vite)**
  - [ ] Hapus folder `src/` (12+ file boilerplate lama Vue+Vite yang tidak digunakan Nuxt 4).
  - [ ] Hapus file konfigurasi sisa: [`vite.config.ts`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/vite.config.ts), [`tsconfig.app.json`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/tsconfig.app.json), dan `tsconfig.node.json`.
- [ ] **Penyegaran Graf Dependensi**
  - [ ] Jalankan pembaruan graf arsitektur via Graphify setelah pembersihan direktori selesai.
