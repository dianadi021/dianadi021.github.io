# Graph Report - dianadi021.github.io  (2026-11-07)

## Corpus Check
- 30 files · ~198,510 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 4, .css 3, .example 1)

## Summary
- 274 nodes · 376 edges · 23 communities (14 shown, 9 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 19 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30ec27f9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Minified Icon Library Bundle
- Plugins and App Store
- About Page Demo Logic
- Runtime Dependencies
- Dev Dependencies and Tooling
- Default Layout Theme Toggle
- NPM Scripts
- TypeScript Config
- Ringkasan Review, Refactor & Setup Template Nuxt.js
- topsis.vue
- CommandPalette.vue
- HomeTerminal.vue
- .prettierrc.json
- HomeSkills.vue
- 🚀 AGENTS.md - Standar Profesional Rekayasa Perangkat Lunak
- HomeHero.vue
- HomeExperience.vue

## God Nodes (most connected - your core abstractions)
1. `q2()` - 12 edges
2. `a()` - 11 edges
3. `r2()` - 11 edges
4. `d()` - 10 edges
5. `y2()` - 10 edges
6. `X2()` - 10 edges
7. `p2()` - 8 edges
8. `W2()` - 8 edges
9. `🚀 AGENTS.md - Standar Profesional Rekayasa Perangkat Lunak` - 8 edges
10. `Ringkasan Review, Refactor & Setup Template Nuxt.js` - 8 edges

## Surprising Connections (you probably didn't know these)
- `7. Rute Showcase `/about` & Layout Aktif` --references--> `cn()`  [INFERRED]
  SETUP_SUMMARY.md → app/utils/cn.ts
- `B. Package Tambahan yang Diinstal (Additive)` --references--> `cn()`  [INFERRED]
  SETUP_SUMMARY.md → app/utils/cn.ts

## Import Cycles
- None detected.

## Communities (23 total, 9 thin omitted)

### Community 0 - "Minified Icon Library Bundle"
Cohesion: 0.08
Nodes (54): _2(), a(), C(), c2(), c(), c4(), d(), d2() (+46 more)

### Community 1 - "Plugins and App Store"
Cohesion: 0.06
Nodes (32): useAppStore, allowScripts, esbuild@0.28.2, name, private, type, clsx, dayjs (+24 more)

### Community 2 - "About Page Demo Logic"
Cohesion: 0.06
Nodes (24): appStore, axiosLoading, axiosResponse, colorMode, { $dayjs, $swal, $api }, formData, formErrors, formSuccess (+16 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.12
Nodes (17): dependencies, axios, clsx, dayjs, @headlessui/vue, nuxt, @nuxt/icon, @nuxtjs/color-mode (+9 more)

### Community 5 - "Dev Dependencies and Tooling"
Cohesion: 0.15
Nodes (13): devDependencies, @iconify-json/carbon, @iconify-json/heroicons, @iconify-json/lucide, @iconify-json/ph, @nuxtjs/tailwindcss, @pinia/nuxt, @tailwindcss/aspect-ratio (+5 more)

### Community 6 - "Default Layout Theme Toggle"
Cohesion: 0.20
Nodes (6): activeHash, appStore, colorMode, commandPaletteRef, isHydrated, route

### Community 7 - "NPM Scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, generate, postinstall, preview, typecheck

### Community 12 - "Ringkasan Review, Refactor & Setup Template Nuxt.js"
Cohesion: 0.18
Nodes (11): cn(), 1. Masalah Awal yang Ditemukan & Diperbaiki, 2. Status Package & Library, 3. Palet Warna Format Bootstrap pada Tailwind CSS, 4. Struktur File Setup Baru & Yang Disesuaikan, 5. Dukungan Mode Rendering (SSR & CSR), 6. Hasil Verifikasi & Pengujian, 7. Rute Showcase `/about` & Layout Aktif (+3 more)

### Community 13 - "topsis.vue"
Cohesion: 0.08
Nodes (24): addAlternative(), addCriterion(), alternatives, best, { calculate }, calculation, criteria, downloadCsv() (+16 more)

### Community 15 - "CommandPalette.vue"
Cohesion: 0.18
Nodes (9): colorMode, CommandItem, commands, filteredCommands, isOpen, query, router, { $swal } (+1 more)

### Community 17 - "HomeTerminal.vue"
Cohesion: 0.40
Nodes (3): currentTime, { $dayjs, $swal }, now

### Community 18 - ".prettierrc.json"
Cohesion: 0.40
Nodes (4): printWidth, $schema, semi, singleQuote

### Community 19 - "HomeSkills.vue"
Cohesion: 0.50
Nodes (3): activeTab, filteredSkills, skills

### Community 20 - "🚀 AGENTS.md - Standar Profesional Rekayasa Perangkat Lunak"
Cohesion: 0.22
Nodes (8): 1. Core Operating Principles, 2. Separation of Concerns Architecture, 3. Context & Exploration Protocol, 4. Standar Eksekusi Teknis (Technical Guardrails), 5. Conflict Decision Gate & Git Workflow, 6. Reflexion & Limitations (Wajib di Setiap Solusi), 7. Standard Output Format, 🚀 AGENTS.md - Standar Profesional Rekayasa Perangkat Lunak

## Knowledge Gaps
- **16 isolated node(s):** `@nuxt/icon`, `@nuxtjs/color-mode`, `@vueuse/core`, `@vueuse/nuxt`, `nuxt` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 171 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Dependencies` to `Plugins and App Store`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `q2()` (e.g. with `C()` and `E1()`) actually correct?**
  _`q2()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@nuxt/icon`, `@nuxtjs/color-mode`, `@vueuse/core` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Minified Icon Library Bundle` be split into smaller, more focused modules?**
  _Cohesion score 0.08243727598566308 - nodes in this community are weakly interconnected._
- **Why does `@headlessui/vue` connect `CommandPalette.vue` to `Plugins and App Store`, `About Page Demo Logic`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `a()` (e.g. with `C()` and `f2()`) actually correct?**
  _`a()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `Plugins and App Store` be split into smaller, more focused modules?**
  _Cohesion score 0.0553306342780027 - nodes in this community are weakly interconnected._