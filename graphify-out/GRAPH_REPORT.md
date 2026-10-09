# Graph Report - dianadi021.github.io  (2026-10-09)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 180 nodes · 278 edges · 12 communities (9 shown, 3 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.85)
- Token cost: 19,926 input · 162 output

## Graph Freshness
- Built from commit: `397ca849`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Minified Icon Library Bundle
- Plugins and App Store
- About Page Demo Logic
- Minified Vendor Script Internals
- Runtime Dependencies
- Dev Dependencies and Tooling
- Default Layout Theme Toggle
- NPM Scripts
- Home Page Features
- TypeScript Config

## God Nodes (most connected - your core abstractions)
1. `q2()` - 12 edges
2. `r2()` - 11 edges
3. `a()` - 11 edges
4. `d()` - 10 edges
5. `y2()` - 10 edges
6. `X2()` - 10 edges
7. `p2()` - 8 edges
8. `W2()` - 8 edges
9. `c()` - 7 edges
10. `g2()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `f2()` --indirect_call--> `a()`  [INFERRED]
  public/assets/scripts/vendor/font-awesome/@7.3.1/all.min.js → public/assets/scripts/vendor/font-awesome/@7.3.1/all.min.js  _Bridges community 0 → community 3_

## Import Cycles
- None detected.

## Communities (12 total, 3 thin omitted)

### Community 0 - "Minified Icon Library Bundle"
Cohesion: 0.09
Nodes (36): _2(), c2(), c(), d(), d2(), E1(), e2(), F() (+28 more)

### Community 1 - "Plugins and App Store"
Cohesion: 0.06
Nodes (28): useAppStore, name, private, type, axios, clsx, dayjs, @headlessui/vue (+20 more)

### Community 2 - "About Page Demo Logic"
Cohesion: 0.07
Nodes (23): appStore, axiosLoading, axiosResponse, colorMode, { $dayjs, $swal, $api }, formData, formErrors, formSuccess (+15 more)

### Community 3 - "Minified Vendor Script Internals"
Cohesion: 0.20
Nodes (18): a(), C(), c4(), I2(), k(), N(), N2(), p2() (+10 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.12
Nodes (17): dependencies, axios, clsx, dayjs, @headlessui/vue, nuxt, @nuxt/icon, @nuxtjs/color-mode (+9 more)

### Community 5 - "Dev Dependencies and Tooling"
Cohesion: 0.22
Nodes (9): devDependencies, @nuxtjs/tailwindcss, @pinia/nuxt, @tailwindcss/aspect-ratio, @tailwindcss/forms, @tailwindcss/typography, @types/node, typescript (+1 more)

### Community 6 - "Default Layout Theme Toggle"
Cohesion: 0.29
Nodes (5): appStore, colorMode, { $dayjs }, isHydrated, route

### Community 7 - "NPM Scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, generate, postinstall, preview, typecheck

### Community 8 - "Home Page Features"
Cohesion: 0.33
Nodes (4): appStore, currentDate, { $dayjs, $swal }, features

## Knowledge Gaps
- **12 isolated node(s):** `nuxt`, `@nuxt/icon`, `@nuxtjs/color-mode`, `@nuxtjs/tailwindcss`, `@pinia/nuxt` (+7 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 102 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Dependencies` to `Plugins and App Store`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `q2()` (e.g. with `C()` and `E1()`) actually correct?**
  _`q2()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `nuxt`, `@nuxt/icon`, `@nuxtjs/color-mode` to the rest of the system?**
  _12 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Minified Icon Library Bundle` be split into smaller, more focused modules?**
  _Cohesion score 0.09494949494949495 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `Dev Dependencies and Tooling` to `Plugins and App Store`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `a()` (e.g. with `C()` and `f2()`) actually correct?**
  _`a()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Should `Plugins and App Store` be split into smaller, more focused modules?**
  _Cohesion score 0.05855855855855856 - nodes in this community are weakly interconnected._