# Developer Context & Design System

## 1. Profile Overview
- **Name**: Dian Adi Nugroho[cite: 2]
- **Role**: Web Developer / Backend Developer[cite: 1]
- **Location**: Kab. Sleman, D.I. Yogyakarta[cite: 2]
- **Contact**: contactmedianadi021@gmail.com | +62851-7999-7321[cite: 2]
- **GitHub Pages Domain**: dianadi021.github.io[cite: 2]

## 2. Core Technical Stack
- **Primary Languages**: PHP, JavaScript, TypeScript, Lua, HTML/CSS[cite: 1, 2]
- **Frameworks**: Laravel, CodeIgniter, Express.js, Vue.js, Tailwind CSS[cite: 1, 2]
- **Databases**: PostgreSQL, MySQL, MongoDB, Oracle[cite: 1, 2]
- **Tools & Infrastructure**: Docker, Node.js, Postman, Ubuntu Linux, Git (GitHub/GitLab)[cite: 1, 2]

## 3. Project Tooling & Package Ecosystem (from package.json & Graphify Mapping)

Berdasarkan analisis dependency graph pada `graphify-out/GRAPH_REPORT.md`, project ini menggunakan arsitektur hybrid modern dengan pengelompokan tools sebagai berikut:

### A. Core Runtime & Framework (Community 4)
- **`nuxt` (`^4.5.2`)**: Fullstack Vue framework inti yang mengelola SSR (Server-Side Rendering), SSG (Static Site Generation), routing berbasis file, auto-imports, dan server engine Nitro.
- **`vue` (`^3.5.43`) & `vue-router` (`^5.3.1`)**: Reactivity engine berbasis Composition API (`<script setup>`) dan router client-side yang terintegrasi secara native di Nuxt.

### B. State Management & Plugins (Community 1 & Community 6)
- **`pinia` (`^4.0.3`) & `@pinia/nuxt` (`^1.0.2`)**: Store management modular dan type-safe. Digunakan oleh `app/stores/app.ts` (`useAppStore`) untuk mengelola global state (misal: status loading, metadata aplikasi, counter).
- **`@nuxtjs/color-mode` (`^4.0.1`)**: Modul pendukung tema (dark/light/system) dengan integrasi kelas Tailwind tanpa flicker saat hidrasi SSR di `app/layouts/default.vue`.
- **`@vueuse/core` & `@vueuse/nuxt` (`^15.0.0`)**: Kumpulan composables reaktif untuk utilitas browser API (media queries, click outside, localStorage) dan optimasi lifecycle Vue.

### C. UI, Styling & Visual Presentation (Community 0, 3, 5)
- **`@nuxtjs/tailwindcss` (`^6.14.0`)**: Integrasi engine Tailwind CSS v3 ke pipeline build Nuxt dengan konfigurasi di `tailwind.config.ts`.
- **`@tailwindcss/typography` (`^0.5.20`)**: Plugin official untuk styling konten kaya (markdown/prose) secara otomatis.
- **`@tailwindcss/forms` (`^0.5.11`)**: Plugin reset form input untuk konsistensi cross-browser sebelum diberi styling kustom.
- **`@tailwindcss/aspect-ratio` (`^0.4.2`)**: Utilitas aspect ratio untuk responsivitas wadah gambar dan kartu portofolio.
- **`clsx` (`^2.1.1`) & `tailwind-merge` (`^3.7.0`)**: Pondasi helper `cn()` (`app/utils/cn.ts`) untuk conditional class combining dan resolusi konflik utility class Tailwind secara aman.
- **`@headlessui/vue` (`^1.7.23`)**: Komponen UI headless (unstyled & accessible/WAI-ARIA compliant) seperti modal dialog, dropdown menu, dan toggle switch.
- **`@nuxt/icon` (`^2.5.1`)**: Komponen ikon resolusi on-demand universal (Iconify, Heroicons, Lucide).
- **`swiper` (`^14.3.0`)**: Library carousel touch-slider modern untuk showcase proyek atau galeri portofolio responsif.
- **Vendor Font Awesome Assets (`@7.3.1`)**: Terletak di `public/assets/scripts/vendor/font-awesome/@7.3.1/` (minified bundle) yang dimuat via `nuxt.config.ts` untuk ikon statis lokal.

### D. Data, Utilities & Validation (Community 1 & Community 2)
- **`axios` (`^1.20.0`)**: HTTP client berbasis Promise yang dikonfigurasi melalui plugin `app/plugins/axios.ts` (`$api`) lengkap dengan request/response interceptor dan integrasi `runtimeConfig.public.apiBase`.
- **`zod` (`^4.6.5`)**: TypeScript-first schema validator untuk memvalidasi struktur form input (misal: contact form di `app/pages/about.vue`) dan payload response API secara strict.
- **`dayjs` (`^1.11.23`)**: Library manipulasi tanggal ringan yang di-inject via `app/plugins/dayjs.ts` (`$dayjs`) dengan ekstensi relative time dan locale ID (Indonesia).
- **`sweetalert2` (`^11.26.25`)**: Modal alert interaktif yang di-inject via client plugin `app/plugins/sweetalert2.client.ts` (`$swal`) agar aman dari isu SSR execution context.

### E. Developer Tooling & Build Scripts (Community 5 & Community 7)
- **`typescript` (`^5.9.3`) & `@types/node` (`^26.6.4`)**: Compiler dan deklarasi type static typing level sistem.
- **`vue-tsc` (`^3.3.12`)**: Type-checker khusus Vue Single File Component (SFC) untuk command `npm run typecheck`.
- **NPM Scripts Workflow (`package.json`)**:
  - `npm run dev`: Menjalankan Nuxt local development server dengan hot module replacement (HMR).
  - `npm run build`: Kompilasi aplikasi untuk mode SSR / server deployment (Nitro engine).
  - `npm run generate`: Pre-rendering seluruh route ke static assets (SSG / Jamstack) khusus target GitHub Pages.
  - `npm run preview`: Menjalankan web server lokal untuk menguji build produksi secara akurat.
  - `npm run postinstall` (`nuxt prepare`): Men-generate interface TypeScript dan stub `.nuxt` secara otomatis setelah instalasi modul.
  - `npm run typecheck`: Menjalankan validasi static typing tanpa melakukan kompilasi file.

### F. Architectural Invariants & Module Boundaries (dari GRAPH_REPORT)
1. **Plugin Injection Invariant**: Helper seperti `$api`, `$dayjs`, dan `$swal` disediakan melalui plugin Nuxt (`app/plugins/`) dan diakses via `useNuxtApp()`. Jangan membuat instansiasi Axios atau SweetAlert terpisah di dalam komponen untuk menjaga konsistensi interceptor.
2. **SSR Boundary Invariant**: SweetAlert2 hanya dieksekusi di sisi client (`sweetalert2.client.ts`). Jangan pernah mengeksekusi `$swal` dalam top-level script `<script setup>` tanpa pengecekan hydration atau hook `onMounted`.
3. **State Isolation**: Logika state bersama wajib diletakkan di `app/stores/` (Pinia), bukan disimpan sebagai global variable di layout atau page.
4. **Zero Import Cycles**: Berdasarkan Graphify report, tidak ada siklus impor. Pertahankan dependency flow satu arah: `utils` → `plugins` → `stores` → `components/layouts` → `pages`.

## 4. Experience Highlights
- **Web Developer @ PT Medika Digital Nusantara**: Server monitoring, bug fixing, critical thinking under shifting schedules, building features using Laravel/PHP/Oracle/Docker[cite: 1].
- **Backend Developer (Trainee) @ Zettabyte Pte Ltd**: Database schema design (MongoDB/PostgreSQL), REST API security, JWT authentication[cite: 1].

## 5. Design System & Theme
Use Tailwind CSS classes or CSS variables based on this custom palette, but still used default bootstrap colour primary, secondary, secondary white, secondary black, info, warning, danger:

| Element Role | Color Name | Hex Code | Tailwind / Usage Example |
| :--- | :--- | :--- | :--- |
| **Dark Background / Text** | Prussian Blue | `#023047` | `bg-[#023047]`, `text-[#023047]` |
| **Primary Accent / Brand** | Cerulean Blue | `#219EBC` | `text-[#219EBC]`, `border-[#219EBC]` |
| **Soft Accent / Badges** | Ice Blue | `#8ECAE6` | `bg-[#8ECAE6]/10`, `text-[#8ECAE6]` |
| **Highlight / Secondary** | Amber Gold | `#FFB703` | `text-[#FFB703]`, `bg-[#FFB703]` |
| **Primary CTA / Buttons** | UT Orange | `#FB8500` | `bg-[#FB8500] hover:bg-[#FB8500]/90` |

## 6. Agent Rules for Code & Content Generation
1. **Tone & Style**: Clean, modern, developer-centric, responsive, and minimalist.
2. **Code Quality**: Write semantic HTML5 and clean Tailwind CSS. Avoid extra heavy JavaScript libraries if standard features can be achieved natively.
3. **Sections Required**:
   - Hero Section (Greeting, role, quick links, CTA)
   - About & GitHub Stats
   - Experience Timeline
   - Tech Stack & Skills (grouped by category)
   - Projects / Showcase
   - Contact & Social Links