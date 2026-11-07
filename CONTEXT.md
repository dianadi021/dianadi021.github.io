# Developer Context & Project Domain State

Dokumen ini adalah **Single Source of Truth (SSOT)** spesifik proyek `dianadi021.github.io`. Disusun pada tahap **SDLC Planning** dan menjadi acuan mutlak (*immutable reference*) bagi agen dan perekayasa selama tahap **SDLC Delivery**.

---

## 1. Profile Overview
- **Name**: Dian Adi Nugroho
- **Role**: Web Developer / Backend Developer
- **Location**: Kab. Sleman, D.I. Yogyakarta, Indonesia
- **Contact**: contactmedianadi021@gmail.com | +62851-7999-7321
- **Domain**: dianadi021.github.io

---

## 2. Core Technical Stack
- **Framework**: Nuxt 4 (`future.compatibilityVersion: 4`) dengan Vue 3.5 (Composition API `<script setup>`) dan Nitro Engine.
- **Language**: TypeScript 5.9 (`strict: true`).
- **Styling**: Tailwind CSS v3 (`@nuxtjs/tailwindcss`) dengan plugin Typography, Forms, Aspect-Ratio, dan helper `cn()` (`clsx` + `tailwind-merge`).
- **State & Storage**: Pinia (`@pinia/nuxt`), VueUse (`@vueuse/nuxt` & `@vueuse/core` — `useEventListener`, `useLocalStorage`, `useTimeoutFn`).
- **Networking & Validation**: Axios (`app/plugins/axios.ts` via `$api`), Zod (`zod`).
- **Icons & UI**: Headless UI Vue (`@headlessui/vue`), `@nuxt/icon` (Heroicons, Lucide, Carbon, Phosphor), Swiper (`swiper`), SweetAlert2 (`app/plugins/sweetalert2.client.ts` via `$swal`).

---

## 3. Stack Verification Commands (Quality Gate)
- **Typecheck (Wajib Lolos 0 Error)**: `pnpm run typecheck` (`nuxt typecheck`)
- **Build Node Server (SSR)**: `CI=true pnpm run build` (`nuxt build`)
- **Generate Static Jamstack (SSG - GitHub Pages)**: `CI=true pnpm run generate` (`nuxt generate`)
- **Local Preview**: `pnpm run preview`

---

## 4. Design System Tokens
Palet warna kustom berbasis aksen warm & cold contrast:
- **Dark Background / Text**: Prussian Blue (`#023047`) — `bg-[#023047]`, `text-[#023047]`
- **Primary Accent / Brand**: Cerulean Blue (`#219EBC`) — `text-[#219EBC]`, `border-[#219EBC]`
- **Soft Accent / Badges**: Ice Blue (`#8ECAE6`) — `bg-[#8ECAE6]/20`, `text-[#8ECAE6]`
- **Highlight / Secondary**: Amber Gold (`#FFB703`) — `text-[#FFB703]`, `bg-[#FFB703]`
- **Primary CTA / Buttons**: UT Orange (`#FB8500`) — `bg-[#FB8500] hover:bg-[#FB8500]/90`

---

## 5. Domain Entities & State Machines

### Modul A: Wedding Invitation Platform (`app/types/wedding.ts`)
#### 1. Entitas Kunci
- **`GuestContext`**: `{ guestName: string, isVip: boolean, invitationCode?: string }`
- **`CoupleProfile`**: Profil lengkap mempelai pria dan wanita beserta nama orang tua dan biodata.
- **`WeddingEventSchedule`**: Jadwal akad & resepsi, lokasi fisik, tautan Google Maps, dan tautan kalender.
- **`RsvpEntryRecord`**: `{ id: string, guestName: string, attendance: RsvpAttendanceStatus, totalGuests: number, message: string, createdAt: string }`
- **`DigitalGiftAccount`**: Detail rekening bank / QRIS untuk amplop digital.

#### 2. State Machine Transitions
```text
[LOCKED_COVER] (Cover amplop tertutup, audio PAUSED)
  │ (Event: User clicks "Buka Undangan")
  ├──(Guard: Gestur interaksi fisik pengguna terdeteksi)
  ▼
[OPENED_UNLOCKED] (Cover terbuka, trigger audio PLAYING, scrollytelling diizinkan)
```
```text
Audio State:
[PAUSED] ──(Open Invitation / Unmute Click)──► [PLAYING]
[PLAYING] ──(Mute Click)──► [PAUSED]
[PLAYING] ──(Browser Rejection)──► [BLOCKED_AUTOPLAY]
```
- **Transisi Terlarang**: Dilarang memutar audio atau melakukan scrolling otomatis ke seksi acara saat gate berada pada status `LOCKED_COVER`.

---

### Modul B: TOPSIS SPK Engine (`app/types/topsis.ts`)
#### 1. Entitas Kunci
- **`Criterion`**: `{ id?: string, name: string, weight: number, impact: 'benefit' | 'cost' }`
- **`Alternative`**: `{ id?: string, name: string, values: number[] }`
- **`RankedAlternative`**: Alternatif dengan skor kedekatan relatif (0..1), jarak Euclidean ideal positif/negatif, dan peringkat 1..N.
- **`TopsisCalculationResult`**: Hasil komputasi, alternatif terbaik, total bobot, dan ringkasan.

#### 2. State Machine Transitions
```text
[INSUFFICIENT_DATA] (Guard: criteria.length >= 1 && alternatives.length >= 2)
  ▼
[DATA_INPUT] (Guard: totalWeight > 0 && column norms > 0 && values are finite)
  ├──(Failed Guards)──► [INVALID_PARAMETERS]
  ▼
[READY_AND_RANKED] (Sort descending by score, assign rank 1..N)
```

---

## 6. Critical Technical & Domain Invariants
1. **Wedding Invariant 1 (Strict Autoplay Compliance Gate)**: Audio latar dilarang dieksekusi secara otomatis sebelum pengguna menekan tombol "Buka Undangan" (`OPEN_INVITATION` event). Kegagalan pemutaran audio wajib ditangkap secara anggun (*graceful fallback*) tanpa menghentikan rendering visual.
2. **Wedding Invariant 2 (Hydration & Time Isolation)**: Seluruh komponen yang bergantung pada waktu dinamis (komponen `WeddingCountdown` dan evaluasi tanggal Day.js) wajib diisolasi di dalam tag `<ClientOnly>` dengan fallback skeleton untuk mencegah SSR/SSG *hydration text mismatch*.
3. **Wedding Invariant 3 (Safe Guest Parameter Parsing & XSS Guard)**: Pembacaan nama tamu dari parameter query URL (`?to=...`) wajib disanitasi dari tag HTML dan karakter injeksi, serta memiliki fallback nilai default `"Tamu Undangan"` jika parameter kosong.
4. **Wedding Invariant 4 (RSVP Local Storage Idempotency)**: Pengiriman konfirmasi RSVP lokal wajib menghasilkan ID deterministik unik dan tidak menduplikasi entri jika dikirim ulang dengan payload identik.
5. **TOPSIS Invariant 1 (Strict Matrix Bounds & Cardinality)**: Minimal 1 kriteria dan minimal 2 alternatif. Total bobot kriteria wajib berangka riil positif (`totalWeight > 0`).
6. **TOPSIS Invariant 2 (Vector Normalization & Zero-Divisor Guard)**: Setiap kolom kriteria wajib memiliki norma vektor > 0 (`norm !== 0`). Dilarang membagi dengan nol (`NaN`). Jika norma 0, status kalkulasi diturunkan menjadi `INVALID_PARAMETERS`.
7. **TOPSIS Invariant 3 (Strict Indexing & Null Safety)**: Akses elemen matriks dua dimensi (`row[c] ?? 0`) wajib memiliki fallback safe indexing untuk mematuhi konfigurasi `strict: true`. Objek `bestAlternative` wajib di-narrowing sebelum membaca properti `.name` atau `.score`.
8. **Lifecycle & Memory Cleanup Invariant**: Seluruh browser-level event listener (`window.addEventListener`) wajib dibersihkan secara simetris atau dibungkus menggunakan helper reaktif auto-cleanup (`useEventListener` dari `@vueuse/core`).
9. **CI Quality Gate Invariant**: Pipeline GitHub Actions (`deploy-pages.yml`) wajib mengeksekusi perintah `pnpm run typecheck` sebelum fase packaging `pnpm generate` untuk mencegah regresi tipe lolos ke production.
