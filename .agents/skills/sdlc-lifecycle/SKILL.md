---
name: sdlc-lifecycle
description: Activate this skill when the user wants end-to-end guidance to develop a feature from 0 to production (covering all 10 SDLC stages from Discovery to Release and Maintenance).
---

# 🔄 Skill: End-to-End Feature Lifecycle (0 Sampai Rilis)

Runbook terpadu 10 fase berurutan dari ide mentah hingga operasional pasca-rilis.

---

## Peta Alur 10 Fase

```
[Discovery & Brainstorming]
  ├── 1. Discovery (Identifikasi Masalah Riil)
  ├── 2. Brainstorming (Eksplorasi Sudut Pandang Solusi)
  └── 3. Needs Analysis (Penyaringan Kebutuhan & Anti-Scope)
        │
        ▼
[Planning & Architecture]
  ├── 4. Research (Audit Codebase & Dependensi)
  ├── 5. Analysis & Spec (Pemodelan FSM & Edge Cases)
  └── 6. Architecture & Setup (Kontrak Tipe & Skema Migrasi)
        │
        ▼
[Delivery & Release]
  ├── 7. Pure Development (Implementasi Modular & Transaksional)
  ├── 8. Testing & Verification (Automated Test & Audit 5 Celah Universal)
  ├── 9. Release & Finishing (Selective Staging & Conventional Commit sesuai Prompt)
  └── 10. Observability & Maintenance (Telemetry & Backward-Compatibility)
```

---

## Panduan Eksekusi Lintas Fase

1. **Fase 1-3 (Discovery & Brainstorming):** Jika membutuhkan sinyal pasar/kompetitor eksternal, jalankan [`trend-research`](../trend-research/SKILL.md) terlebih dahulu. Buka dan ikuti panduan detail di [`sdlc-brainstorming`](../sdlc-brainstorming/SKILL.md) (5W+1H, eksplorasi alternatif, deteksi ambiguitas, dan anti-scope). Dilarang menyentuh file kode pada fase ini.
2. **Fase 4-6 (Planning):** Buka dan ikuti panduan detail di [`sdlc-planning`](../sdlc-planning/SKILL.md). Buat kontrak tipe, path komponen dasar UI, dan skema database sebelum menulis isi logika.
3. **Fase 7-10 (Delivery):** Ikuti [`sdlc-delivery`](../sdlc-delivery/SKILL.md). Jalankan verifikasi kontrak I/O dinamis via [`test-backend-io`](../test-backend-io/SKILL.md) dan/atau [`test-client-io`](../test-client-io/SKILL.md), lanjutkan self-review statis memakai skill `review-*` sesuai stack, lalu terapkan gerbang keputusan *Stop & Alert* vs *Prompt-Driven Commit*.

---

## Definisi Selesai (Definition of Done)
Sebuah siklus fitur dinyatakan selesai secara sempurna jika:
- [ ] Kebutuhan fungsional dan *edge cases* tervalidasi.
- [ ] File `CONTEXT.md` tersinkronisasi dengan invarian bisnis, path komponen UI dasar (jika ada UI), dan perintah verifikasi baru.
- [ ] Kontrak tipe dan skema database tersinkronisasi.
- [ ] 100% test lulus (termasuk matriks I/O `test-backend-io` / `test-client-io`) dan 0 static analysis / linter error.
- [ ] Seluruh celah universal terverifikasi aman (self-review `review-*` tanpa BLOCKER/MAJOR).
- [ ] Perubahan di-commit secara selektif dengan format *Conventional Commits* (hanya jika diminta oleh pengguna).
