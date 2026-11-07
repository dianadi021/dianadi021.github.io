# 📋 Engineering TODO & Quality Roadmap

Daftar tugas terstruktur untuk platform portofolio dan showcase arsitektur [dianadi021.github.io](https://dianadi021.github.io), disusun berdasarkan temuan **SDLC Audit**, **Code Review Frontend Web**, **Code Review TypeScript/Node**, dan **SDLC Planning Wedding Platform**.

---

## 🎯 Status Progres Keseluruhan

- [x] **Fase 0: Spesifikasi Kontrak Tipe Matematis TOPSIS** *(Selesai)*
- [x] **Fase 1: Resolusi Error Kompilasi & Type Safety TOPSIS** *(Selesai)*
- [x] **Fase 2: Fail-Fast CI/CD Quality Gate (Typecheck Step)** *(Selesai)*
- [x] **Fase 3: Stabilisasi Lifecycle, Memory Cleanup & Event Listeners** *(Selesai)*
- [x] **Fase 4: Dekomposisi Monolit Halaman Utama (`index.vue`) & Command Palette** *(Selesai)*
- [x] **Fase 5: Mitigasi Keamanan Frontend (CSV Formula Injection CWE-1236)** *(Selesai)*
- [x] **Fase 6: Pembersihan Zombie Artifacts (Vite boilerplate & Tailwind nesting)** *(Selesai)*
- [x] **Fase 7: Resolusi Temuan Review Frontend & Dekomposisi Showcase** *(Selesai)*
- [x] **Fase 8: Automasi Pengujian Unit Matematis (Vitest)** *(Selesai)*
- [x] **Fase 9: Penguatan Strict Typing & Standarisasi Plugin Node/TS** *(Selesai)*
- [x] **Fase 10: SDLC Planning & Kontrak Domain Wedding Platform** *(Selesai)*
- [x] **Fase 11: Implementasi Delivery Layout Wedding Invitation (Scrollytelling)** *(Selesai)*

---

## 🚀 Fase Aktif & Item Dalam Antrean

### 📌 Fase 7: Resolusi Temuan Review Frontend & Dekomposisi Showcase
- [x] **Dekomposisi Monolit Showcase ([`app/pages/about.vue`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/about.vue#L1-L812) — 812 baris ➔ 60 baris)**
  - [x] Ekstraksi bagian Swiper Carousel ke `app/components/showcase/ShowcaseSwiper.vue`.
  - [x] Ekstraksi demo Headless UI (Switch, Disclosure, Menu, Modal) ke `app/components/showcase/ShowcaseHeadlessUi.vue`.
  - [x] Ekstraksi form validasi Zod ke `app/components/showcase/ShowcaseZodForm.vue`.
  - [x] Ekstraksi interaksi Axios & SweetAlert2 ke `app/components/showcase/ShowcaseAxios.vue`.
  - [x] Ekstraksi komponen pendukung `ShowcaseTailwindColors.vue`, `ShowcaseVueUse.vue`, `ShowcasePinia.vue`, `ShowcaseSweetAlert.vue`, dan `ShowcaseDayjs.vue`.
  - [x] Rampingkan `app/pages/about.vue` menjadi orkestrator presenter (< 60 baris).
- [x] **Pencegahan Hydration Text Mismatch ([`app/pages/about.vue:684`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/about.vue#L684))**
  - [x] Bungkus interpolasi `{{ now }}` dan relative time dengan tag `<ClientOnly>` dan sediakan skeleton placeholder fallback.
- [x] **Stabilisasi Virtual DOM Key Matriks TOPSIS ([`app/pages/portofolio/topsis.vue:150,154`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/portofolio/topsis.vue#L150))**
  - [x] Ganti binding `:key="criterion.name"` menjadi `:key="criterion.id"` untuk mencegah collision saat nama kriteria bernilai sama.
- [x] **Isolasi Request Showcase Eksternal ([`app/pages/about.vue:77`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/about.vue#L77))**
  - [x] Ganti endpoint eksternal dengan mock internal Nitro server route (`server/api/demo.get.ts`).

---

### 📌 Fase 8: Automasi Pengujian Unit Matematis (Vitest)
- [x] **Instalasi & Konfigurasi Vitest Runner ([`package.json`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/package.json))**
  - [x] Pasang dependensi dev: `pnpm add -D vitest @nuxt/test-utils happy-dom`.
  - [x] Daftarkan script pengujian `"test": "vitest run"` pada `package.json` dan buat `vitest.config.ts`.
- [x] **Spesifikasi Unit Test TOPSIS Engine ([`app/composables/useTopsis.ts`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/composables/useTopsis.ts#L3-L98))**
  - [x] Buat file test `app/composables/__tests__/useTopsis.spec.ts`.
  - [x] Test case 1: Deteksi `INSUFFICIENT_DATA` jika criteria < 1 atau alternatives < 2.
  - [x] Test case 2: Deteksi `INVALID_PARAMETERS` jika total bobot <= 0 atau ada bobot negatif.
  - [x] Test case 3: Deteksi `INVALID_PARAMETERS` jika seluruh nilai kolom nol (zero norm divisor guard).
  - [x] Test case 4: Validasi akurasi peringkat Euclidean distance dan skor TOPSIS (0..1 range).
- [x] **Integrasi Test Step ke CI Workflow ([`.github/workflows/deploy-pages.yml`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/.github/workflows/deploy-pages.yml))**
  - [x] Tambahkan perintah `run: pnpm test` berdampingan dengan `pnpm run typecheck` sebelum fase packaging `pnpm generate`.

---

### 📌 Fase 9: Penguatan Strict Typing & Standarisasi Plugin Node/TS
- [x] **Pengetatan Opsi Kompiler TypeScript ([`nuxt.config.ts:93-96`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/nuxt.config.ts#L93-L96))**
  - [x] Aktifkan `noUncheckedIndexedAccess: true` pada konfigurasi compiler Nuxt TypeScript untuk menjamin null safety pada akses array `array[i]`.
  - [x] Jalankan audit kompilasi `pnpm run typecheck` untuk memverifikasi seluruh fallback indexing (`?? 0`).
- [x] **Penyempurnaan Plugin Axios ([`app/plugins/axios.ts:16-33`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/plugins/axios.ts#L16-L33))**
  - [x] Implementasikan transformasi error terpusat pada response interceptor dengan type narrowing (`error: unknown`).
  - [x] Hapus boilerplate request passthrough kosong jika belum ada injeksi bearer token.

---

### 📌 Fase 11: Implementasi Delivery Layout Wedding Invitation (Vertical Scrollytelling)
- [x] **Komponen Cover Gate & Amplop Pembuka (`app/components/wedding/WeddingCoverGate.vue`)**
  - [x] Implementasi interaksi klik "Buka Undangan" untuk mentransisikan gate status dari `LOCKED_COVER` ke `OPENED_UNLOCKED`.
  - [x] Parsing nama tamu dari URL query parameter (`?to=...`) dengan fallback aman `"Tamu Undangan"` dan sanitasi XSS.
- [x] **Komponen Floating Audio Player (`app/components/wedding/WeddingAudioPlayer.vue`)**
  - [x] Integrasi pemutaran audio latar setelah transisi `OPENED_UNLOCKED` dengan penanganan fallback status `BLOCKED_AUTOPLAY`.
  - [x] Tombol toggle putar/jeda mengambang (*floating circular vinyl button*).
- [x] **Komponen Profil Mempelai & Rincian Acara (`app/components/wedding/WeddingCouple.vue`, `WeddingEventSchedule.vue`)**
  - [x] Tampilan profil kedua mempelai, foto, dan informasi keluarga besar.
  - [x] Informasi agenda akad dan resepsi dengan tombol tautan langsung ke Google Maps & *Add to Google Calendar*.
- [x] **Komponen Live Countdown Waktu Acara (`app/components/wedding/WeddingCountdown.vue`)**
  - [x] Hitung mundur reaktif (hari, jam, menit, detik) dengan pembungkus `<ClientOnly>` untuk mencegah SSR *hydration mismatch*.
- [x] **Komponen Formulir RSVP & Buku Tamu (`app/components/wedding/WeddingRsvp.vue`)**
  - [x] Formulir kehadiran dan ucapan doa dengan validasi skema Zod.
  - [x] Penyimpanan entri ucapan secara reaktif pada `useLocalStorage` dengan ID deterministik.
- [x] **Komponen Amplop Digital & Salin Rekening (`app/components/wedding/WeddingGift.vue`)**
  - [x] Informasi nomor rekening bank / QRIS dengan aksi salin clipboard instan via `useClipboard` dan alert toast.
- [x] **Halaman Rute Undangan Utama (`app/pages/wedding.vue`)**
  - [x] Komposisi terpadu seluruh subkomponen dalam tata letak vertikal mulus (*Vertical Scrollytelling*).
  - [x] Pendaftaran shortcut rute baru ke [CommandPalette.vue](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/components/ui/CommandPalette.vue).
- [x] **Verifikasi & Quality Gate**
  - [x] Validasi responsivitas tata letak pada viewport seluler, pengujian unit Vitest (5/5 PASS), dan kompilasi statis `CI=true pnpm run build` (12.6s, 0 error).

---

## 🏛️ Rekam Jejak Fase Selesai

### ✅ Fase 0–1: Spesifikasi Kontrak & Type Safety TOPSIS
- [x] Pembuatan kontrak antarmuka TypeScript di [`app/types/topsis.ts`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/types/topsis.ts) (`Criterion`, `Alternative`, `RankedAlternative`, `TopsisState`).
- [x] Resolusi error compiler `vue-tsc` pada kalkulator TOPSIS dengan safe array indexing dan fallback guards.

### ✅ Fase 2–3: Quality Gate CI/CD & Stabilitas Lifecycle
- [x] Penambahan langkah `pnpm run typecheck` pada `.github/workflows/deploy-pages.yml`.
- [x] Penggantian event listener window manual dengan `useEventListener` dari `@vueuse/core` pada layout dan command palette.
- [x] Integrasi `AbortController` untuk pembatalan fetch asinkron Axios saat komponen unmount.

### ✅ Fase 4–6: Rekayasa Komponen Modular, Keamanan & Code Hygiene
- [x] Dekomposisi monolit `index.vue` (878 baris ➔ 51 baris) ke 6 komponen modular di `app/components/home/`.
- [x] Implementasi Global Command Palette (`Ctrl+K`) menggunakan Headless UI Combobox.
- [x] Mitigasi CSV Formula Injection (CWE-1236) pada ekspor CSV hasil TOPSIS.
- [x] Pembersihan direktori sisa scaffolding `src/` dan file konfigurasi Vite lama.

### ✅ Fase 10: SDLC Planning & Kontrak Domain Wedding Platform
- [x] Penyusunan kontrak antarmuka TypeScript lengkap di [`app/types/wedding.ts`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/types/wedding.ts) (`GuestContext`, `CoupleProfile`, `WeddingEventSchedule`, `RsvpEntryRecord`, `InvitationGateState`).
- [x] Kristalisasi Single Source of Truth baru pada [`CONTEXT.md`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/CONTEXT.md) memuat 4 invarian kritis wedding dan FSM.
- [x] Verifikasi tipe statis via `pnpm run typecheck` (0 error, lolos 100%).
