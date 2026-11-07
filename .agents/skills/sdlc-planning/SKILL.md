---
name: sdlc-planning
description: Activate this skill when the user needs technical architecture planning, domain modeling, contract and interface design, database schema and migration planning, or environment setup before coding.
---

# 🏗️ Skill: SDLC Planning & Architecture

Panduan operasional untuk merancang spesifikasi teknis, memvalidasi batasan domain, mendefinisikan kontrak interface/tipe, dan menyiapkan skema basis data sebelum implementasi logika bisnis.

---

## 1. Tahap 1: Codebase Reality Check (Research)
- **Tujuan:** Mengetahui pola eksisting di repositori agar solusi konsisten dan tidak merusak arsitektur yang sudah ada.
- **Langkah Kerja:**
  1. Audit controller, service, atau modul serupa di repositori (gunakan *code skeletonizing*).
  2. Periksa dependensi yang sudah terpasang di `package.json`, `composer.json`, atau `requirements.txt`.
  3. Tandai file dan modul kritis yang akan bersinggungan.
- **Guardrail:** Investigasi bersifat *Read-Only*. Dilarang memodifikasi kode.

---

## 2. Tahap 2: Domain Modeling & State Machines (Analysis)
- **Tujuan:** Mengunci alur transisi status dan aturan invarian bisnis.
- **Langkah Kerja:**
  1. Buat diagram transisi status (Finite State Machine):
     - Daftar status valid (misal: `DRAFT`, `SUBMITTED`, `APPROVED`, `REJECTED`).
     - Aksi pemicu transisi (*Event*) dan syarat penjaga (*Guard conditions*).
     - Aturan penolakan eksplisit pada transisi ilegal.
  2. Verifikasi rencana terhadap daftar *Critical Invariants* di `CONTEXT.md`.

---

## 3. Tahap 3: Contract & Type Design (Architecture)
- **Tujuan:** Menetapkan struktur data yang type-safe sebelum menulis tubuh fungsi.
- **Langkah Kerja:**
  1. Buat Data Transfer Object (DTO) dan Interface/Types untuk request, response, dan state domain.
  2. Tulis skeleton signatures (nama method, parameter bertipe ketat, dan return types).
  3. Dilarang mengimplementasikan tubuh fungsi logika bisnis (*zero-logic function bodies*).

---

## 4. Tahap 4: Storage Modeling & Concurrency Blueprint (Setup)
- **Tujuan:** Memastikan persistensi data aman dari korupsi data paralel sebelum coding.
- **Langkah Kerja:**
  1. Rancang file migrasi database:
     - Gunakan tipe data presisi (`decimal`/`bigint` untuk moneter, bukan `float`).
     - Pasang constraints mutlak di level database (`CHECK >= 0`, `UNIQUE`, FK safe cascade).
     - Pasang indeks komposit pada kolom yang sering difilter bersama tenant/user ID.
  2. **Blueprint Mitigasi Konkurensi (Anti-Race Condition):**
     - Jika fitur memutasikan shared counter/stok/saldo, tentukan strategi mitigasi konkret:
       - *Pessimistic Lock:* `ORDER BY id ASC FOR UPDATE` di level transaksi.
       - *Atomic Operation:* `UPDATE ... SET counter = counter - ? WHERE id = ? AND counter >= ?`.
       - *Constraint Guard:* Database-level `CHECK` constraint.
  3. Perbarui konfigurasi variabel lingkungan di `.env.example` jika ada config baru.
  4. Jalankan typecheck/static analysis sesuai `CONTEXT.md` (misal `tsc --noEmit`, `phpstan`, `detekt`) untuk memastikan kontrak tipe baru bebas error.

---

## 5. Tahap 5: Kristalisasi CONTEXT.md (Bridge ke Execution Rules)
- **Tujuan:** Menjadikan hasil Discovery dan Planning sebagai *Single Source of Truth* yang siap dieksekusi secara ketat oleh `AGENTS.md` pada tahap Delivery.
- **Langkah Kerja:**
  1. Jika `CONTEXT.md` belum ada: Buat file baru dengan menyalin struktur dari [`resources/CONTEXT.template.md`](./resources/CONTEXT.template.md).
  2. Jika `CONTEXT.md` sudah ada: Perbarui / append bab fitur baru dengan menyertakan:
     - **Stack Verification Commands & UI Base Path:** String perintah uji aktual (`backend test`, `client test`, `lint`, `typecheck`) serta direktori komponen dasar UI (`BaseButton`, `BaseNumericInput`, `BaseModal`, `BaseScaffold`) jika proyek memiliki antarmuka.
     - **Domain Entities & Boundaries:** Skema data, kolom kunci, dan aturan isolasi tenant.
     - **Critical Invariants:** Aturan mutlak yang tidak boleh dilanggar (misal: "Stok tidak boleh minus", "Addendum finalized bersifat immutable").
     - **State Machine Transitions:** Status valid, transisi yang diizinkan, dan transisi terlarang.
  3. Minta konfirmasi pengguna terhadap isi `CONTEXT.md` sebelum handoff ke tahap Delivery.

---

## 6. Exit Artifact (Keluaran Wajib)
- **`CONTEXT.md` yang tersinkronisasi** (memuat seluruh invarian bisnis dan perintah verifikasi).
- File kontrak antarmuka/tipe data baru (skeleton).
- File skema database / migrasi baru.
- Konfirmasi lolos verifikasi sintaks/tipe data (`tsc --noEmit` / linter).
