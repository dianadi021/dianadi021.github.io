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
- [x] **Fase 12: Visual Refinement & Aesthetic Polish (Wedding Palette & Portfolio Depth)** *(Selesai)*

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

### ✅ Fase 7: Resolusi Review Frontend & Dekomposisi Showcase
- [x] Dekomposisi monolit [about.vue](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/about.vue) (812 baris ➔ 60 baris) ke 9 subkomponen modular di `app/components/showcase/`.
- [x] Pembuatan mock internal Nitro server route [server/api/demo.get.ts](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/server/api/demo.get.ts) untuk mengisolasi request Axios.
- [x] Pembungkusan `<ClientOnly>` pada evaluasi waktu dinamis `now` untuk mencegah hydration mismatch.
- [x] Stabilisasi virtual DOM key `:key="criterion.id"` pada [app/pages/portofolio/topsis.vue](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/portofolio/topsis.vue).

### ✅ Fase 8: Automasi Pengujian Unit Matematis (Vitest)
- [x] Pemasangan Vitest runner, `@nuxt/test-utils`, dan konfigurasi [vitest.config.ts](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/vitest.config.ts).
- [x] Penulisan 5 automated unit test cases di [useTopsis.spec.ts](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/composables/__tests__/useTopsis.spec.ts) (invarian matriks, zero-divisor guard, Euclidean distance).
- [x] Pendaftaran runner `pnpm run test` pada CI workflow [.github/workflows/deploy-pages.yml](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/.github/workflows/deploy-pages.yml).

### ✅ Fase 9: Penguatan Strict Typing & Standarisasi Plugin Node/TS
- [x] Pengaktifan `noUncheckedIndexedAccess: true` pada [nuxt.config.ts](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/nuxt.config.ts).
- [x] Standarisasi global response error interceptor dengan safe type narrowing pada [app/plugins/axios.ts](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/plugins/axios.ts).

### ✅ Fase 10: SDLC Planning & Kontrak Domain Wedding Platform
- [x] Penyusunan kontrak antarmuka TypeScript lengkap di [`app/types/wedding.ts`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/types/wedding.ts) (`GuestContext`, `CoupleProfile`, `WeddingEventSchedule`, `RsvpEntryRecord`, `InvitationGateState`).
- [x] Kristalisasi Single Source of Truth baru pada [`CONTEXT.md`](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/CONTEXT.md) memuat 4 invarian kritis wedding dan FSM cover/audio.

### ✅ Fase 11: Delivery Layout Wedding Invitation (Scrollytelling)
- [x] Pembuatan 7 subkomponen interaktif di `app/components/wedding/` (`WeddingCoverGate`, `WeddingAudioPlayer`, `WeddingCouple`, `WeddingCountdown`, `WeddingEventSchedule`, `WeddingGift`, `WeddingRsvp`).
- [x] Implementasi rute [app/pages/wedding.vue](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/wedding.vue) dengan sanitasi XSS query `?to=...` dan integrasi shortcut ke [CommandPalette.vue](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/components/ui/CommandPalette.vue).

### ✅ Fase 12: Visual Refinement & Aesthetic Polish (Wedding Palette & Portfolio Depth)
- [x] Isolasi layout [app/pages/wedding.vue](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/pages/wedding.vue) menggunakan `definePageMeta({ layout: false })` dan penambahan tombol floating minimalis portofolio.
- [x] Transformasi palet warna seluruh subkomponen wedding dari developer palette (`#023047`, `#219EBC`, `#FB8500`) ke *Warm Botanical & Champagne Gold* (`#FAF7F2`, `#1C3026`, `#D4AF37`, `#C5A880`, `#E8D5CE`).
- [x] Peningkatan kedalaman visual portofolio di [HomeMetrics.vue](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/components/home/HomeMetrics.vue) dan integrasi kartu showcase wedding di [HomeProjects.vue](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/app/components/home/HomeProjects.vue).
- [x] Kristalisasi token desain *Wedding Champagne Botanical* pada [CONTEXT.md](file:///home/wannacry021/Public/Project/Skuad/dianadi021.github.io/CONTEXT.md).
