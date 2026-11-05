# Graph Report - dianadi021.github.io  (2026-11-05)

## Corpus Check
- 33 files · ~202,107 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: (none) 4, .css 3, .example 1)

## Summary
- 317 nodes · 430 edges · 26 communities (17 shown, 9 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f7f01864`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Minified Icon Library Bundle
- Plugins and App Store
- About Page Demo Logic
- topsis.ts
- Runtime Dependencies
- Dev Dependencies and Tooling
- Default Layout Theme Toggle
- NPM Scripts
- TypeScript Config
- Nuxt Frontend Starter Template & Portfolio Architecture
- topsis.vue
- 3. Project Tooling & Package Ecosystem (from package.json & Graphify Mapping)
- CommandPalette.vue
- 📋 Engineering TODO & Quality Roadmap
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
7. `Developer Context & Design System` - 10 edges
8. `📋 Engineering TODO & Quality Roadmap` - 9 edges
9. `p2()` - 8 edges
10. `W2()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `✅ Fase 0: Spesifikasi Kontrak & Perencanaan (SELESAI)` --references--> `TopsisCalculatorFn`  [INFERRED]
  TODO.md → app/types/topsis.ts
- `C. UI, Styling & Visual Presentation (Community 0, 3, 5)` --references--> `cn()`  [INFERRED]
  CONTEXT.md → app/utils/cn.ts
- `1. Runtime Dependencies` --references--> `cn()`  [INFERRED]
  README.md → app/utils/cn.ts
- `Ringkasan Hubungan Komunitas (Community Hubs)` --references--> `cn()`  [INFERRED]
  README.md → app/utils/cn.ts
- `7. Rute Showcase `/about` & Layout Aktif` --references--> `cn()`  [INFERRED]
  SETUP_SUMMARY.md → app/utils/cn.ts

## Import Cycles
- None detected.

## Communities (26 total, 9 thin omitted)

### Community 0 - "Minified Icon Library Bundle"
Cohesion: 0.08
Nodes (54): _2(), a(), C(), c2(), c(), c4(), d(), d2() (+46 more)

### Community 1 - "Plugins and App Store"
Cohesion: 0.06
Nodes (32): useAppStore, allowScripts, esbuild@0.28.2, name, private, type, clsx, dayjs (+24 more)

### Community 2 - "About Page Demo Logic"
Cohesion: 0.06
Nodes (24): appStore, axiosLoading, axiosResponse, colorMode, { $dayjs, $swal, $api }, formData, formErrors, formSuccess (+16 more)

### Community 3 - "topsis.ts"
Cohesion: 0.30
Nodes (11): Alternative, Criterion, CriterionImpact, RankedAlternative, TopsisCalculationResult, TopsisCalculatorFn, TopsisState, 8. Domain Entities & TOPSIS State Machine (+3 more)

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

### Community 12 - "Nuxt Frontend Starter Template & Portfolio Architecture"
Cohesion: 0.08
Nodes (25): cn(), C. UI, Styling & Visual Presentation (Community 0, 3, 5), 1. Deploy ke GitHub Pages (SSG - dianadi021.github.io), 1. Runtime Dependencies, 2. Deploy ke Vercel / Node Server (SSR), 2. Developer Tooling & Plugins, 🚀 Fitur & Package yang Terintegrasi (`package.json`), 🧩 Injeksi Plugin & Context Usage (+17 more)

### Community 13 - "topsis.vue"
Cohesion: 0.11
Nodes (17): addAlternative(), addCriterion(), alternatives, best, { calculate }, calculation, criteria, downloadCsv() (+9 more)

### Community 14 - "3. Project Tooling & Package Ecosystem (from package.json & Graphify Mapping)"
Cohesion: 0.13
Nodes (14): 1. Profile Overview, 2. Core Technical Stack, 3. Project Tooling & Package Ecosystem (from package.json & Graphify Mapping), 4. Experience Highlights, 5. Design System & Theme, 6. Agent Rules for Code & Content Generation, 7. Stack Verification Commands (Quality Gate), 9. Critical Technical & Domain Invariants (+6 more)

### Community 15 - "CommandPalette.vue"
Cohesion: 0.18
Nodes (9): colorMode, CommandItem, commands, filteredCommands, isOpen, query, router, { $swal } (+1 more)

### Community 16 - "📋 Engineering TODO & Quality Roadmap"
Cohesion: 0.22
Nodes (8): 📋 Engineering TODO & Quality Roadmap, ✅ Fase 1: P1 Blocker — Type Safety & Build Integrity (`topsis.vue`) (SELESAI), ✅ Fase 2: P2 Quality Gate CI/CD & Automasi (SELESAI), ✅ Fase 3: P3 Stabilitas Lifecycle, Memory Leak & Reaktivitas (SELESAI), ✅ Fase 4: P4 Dekomposisi Layout & Rekayasa Komponen Modular (SELESAI), ✅ Fase 5: P5 Keamanan Frontend & Strict Typing Guard (SELESAI), ✅ Fase 6: P6 Pembersihan Artefak Zombie & Codebase Hygiene (SELESAI), 🎯 Status Progres Keseluruhan

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
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 198 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Nuxt Frontend Starter Template & Portfolio Architecture` to `Plugins and App Store`?**
  _High betweenness centrality (0.241) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `q2()` (e.g. with `C()` and `E1()`) actually correct?**
  _`q2()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `@nuxt/icon`, `@nuxtjs/color-mode`, `@vueuse/core` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Minified Icon Library Bundle` be split into smaller, more focused modules?**
  _Cohesion score 0.08243727598566308 - nodes in this community are weakly interconnected._
- **Why does `3. Project Tooling & Package Ecosystem (from package.json & Graphify Mapping)` connect `3. Project Tooling & Package Ecosystem (from package.json & Graphify Mapping)` to `Nuxt Frontend Starter Template & Portfolio Architecture`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `a()` (e.g. with `C()` and `f2()`) actually correct?**
  _`a()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `Plugins and App Store` be split into smaller, more focused modules?**
  _Cohesion score 0.0553306342780027 - nodes in this community are weakly interconnected._