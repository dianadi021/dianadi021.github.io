# 🚀 Vue Professional Base Template

[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Template dasar (boilerplate) profesional untuk pengembangan Front-End menggunakan **Vue 3, TypeScript, dan Vite**. Dirancang dengan arsitektur yang bersih, _scalable_, dan siap untuk diintegrasikan dengan **Laravel 12 + Inertia.js**.

## ✨ Fitur Utama

- ⚡ **Super Fast:** Dibangun dengan Vite 8 dan Vue 3.5.
- 🛡️ **Type Safe:** Full TypeScript 6.0 support dengan strict mode.
- 🎨 **Modern Styling:** Tailwind CSS 3.4 + Headless UI untuk komponen yang _accessible_.
- 📊 **Enterprise Grid:** Terintegrasi dengan AG Grid untuk kebutuhan tabel data kompleks.
- 📦 **State Management:** Pinia untuk state management yang reaktif dan type-safe.
- 🧹 **Code Quality:** Terintegrasi dengan Prettier untuk formatting kode yang konsisten.

---

## 🛠️ Tech Stack & Dependencies

Berikut adalah daftar lengkap library, tools, dan versi yang digunakan dalam template ini, beserta link dokumentasi resminya:

### 🧠 Core & State Management

| Package      | Versi     | Deskripsi                                  | Dokumentasi / Link                            |
| :----------- | :-------- | :----------------------------------------- | :-------------------------------------------- |
| `vue`        | `^3.5.40` | Framework UI utama dengan Composition API. | [vuejs.org](https://vuejs.org/)               |
| `vue-router` | `^5.2.0`  | Router resmi untuk navigasi halaman Vue.   | [router.vuejs.org](https://router.vuejs.org/) |
| `pinia`      | `^4.0.2`  | Store resmi Vue, intuitif dan fully typed. | [pinia.vuejs.org](https://pinia.vuejs.org/)   |

### 🎨 UI, Grid & Components

| Package              | Versi        | Deskripsi                                                             | Dokumentasi / Link                                                               |
| :------------------- | :----------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| `@headlessui/vue`    | `^1.7.23`    | Komponen UI _unstyled_ (Dropdown, Modal, dll) yang _accessible_.      | [headlessui.com](https://headlessui.com/)                                        |
| `ag-grid-vue`        | `^31.3.4`    | Data Grid kelas enterprise untuk tabel data yang kompleks.            | [ag-grid.com](https://www.ag-grid.com/vue-data-grid/)                            |
| `swiper`             | `^14.0.6`    | Library carousel/slider modern dan _touch-friendly_.                  | [swiperjs.com](https://swiperjs.com/)                                            |
| `sweetalert2`        | `^11.26.25`  | Library untuk membuat pop-up alert, modal, dan notifikasi yang indah. | [sweetalert2.github.io](https://sweetalert2.github.io/)                          |
| `vue-toastification` | `2.0.0-rc.5` | Library notifikasi _toast_ yang ringan dan mudah digunakan.           | [npmjs.com/vue-toastification](https://www.npmjs.com/package/vue-toastification) |

### 🛠️ Utilities

| Package | Versi      | Deskripsi                                            | Dokumentasi / Link                |
| :------ | :--------- | :--------------------------------------------------- | :-------------------------------- |
| `dayjs` | `^1.11.21` | Library manipulasi tanggal yang sangat ringan (2kB). | [day.js.org](https://day.js.org/) |

### 🏗️ Build, Tooling & Developer Experience (DevDependencies)

| Package                    | Versi      | Deskripsi                                                                      | Dokumentasi / Link                                                             |
| :------------------------- | :--------- | :----------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| `vite`                     | `^8.1.5`   | Build tool generasi baru yang sangat cepat (Next Generation Frontend Tooling). | [vitejs.dev](https://vitejs.dev/)                                              |
| `@vitejs/plugin-vue`       | `^6.0.8`   | Plugin resmi Vite untuk mendukung Single-File Components (SFC) Vue.            | [github.com/vitejs/vite-plugin-vue](https://github.com/vitejs/vite-plugin-vue) |
| `typescript`               | `~6.0.0`   | Superset JavaScript untuk _static type checking_.                              | [typescriptlang.org](https://www.typescriptlang.org/)                          |
| `vue-tsc`                  | `^3.3.7`   | Type checker khusus untuk file `.vue` (berjalan di atas tsc).                  | [github.com/vuejs/language-tools](https://github.com/vuejs/language-tools)     |
| `tailwindcss`              | `^3.4.19`  | Utility-first CSS framework untuk styling cepat dan konsisten.                 | [tailwindcss.com](https://tailwindcss.com/)                                    |
| `postcss`                  | `^8.5.23`  | Tool untuk mentransformasi CSS dengan plugin JS (digunakan oleh Tailwind).     | [postcss.org](https://postcss.org/)                                            |
| `autoprefixer`             | `^10.5.4`  | Plugin PostCSS untuk menambahkan vendor prefixes secara otomatis.              | [github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)     |
| `prettier`                 | `3.9.5`    | Formatter kode otomatis untuk menjaga konsistensi style kode.                  | [prettier.io](https://prettier.io/)                                            |
| `vite-plugin-vue-devtools` | `^8.1.5`   | Plugin Vite untuk mengintegrasikan Vue Devtools langsung di browser.           | [github.com/vuejs/devtools](https://github.com/vuejs/devtools)                 |
| `npm-run-all2`             | `^9.0.2`   | CLI tool untuk menjalankan script npm secara paralel atau sekuensial.          | [npmjs.com/npm-run-all2](https://www.npmjs.com/package/npm-run-all2)           |
| `@tsconfig/node24`         | `^24.0.4`  | Konfigurasi TS base untuk environment Node.js 24.                              | [github.com/tsconfig/bases](https://github.com/tsconfig/bases)                 |
| `@types/node`              | `^24.13.3` | Definisi tipe TypeScript untuk Node.js.                                        | [npmjs.com/@types/node](https://www.npmjs.com/package/@types/node)             |
| `@vue/tsconfig`            | `^0.9.1`   | Konfigurasi TypeScript dasar yang direkomendasikan untuk project Vue.          | [github.com/vuejs/tsconfig](https://github.com/vuejs/tsconfig)                 |

---

## 📋 Prasyarat

Pastikan environment kamu sudah memenuhi syarat berikut:

- **Node.js:** Versi `^22.18.0` atau `>=24.12.0` (Sesuai konfigurasi `engines`).
- **Package Manager:** [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), atau [yarn](https://yarnpkg.com/).

---

## 🚀 Instalasi & Setup

1. **Clone repository ini**
   ```bash
   git clone https://github.com/dianadi021/frontend-vuejs
   cd vue-base-template
   ```
