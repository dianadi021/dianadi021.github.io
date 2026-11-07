# 📌 CONTEXT.md — Domain State & Verification Contract

> **Aturan Mutlak:** Dokumen ini adalah *Single Source of Truth* spesifik proyek. Disusun/diperbarui pada fase Planning (`sdlc-planning`) dan menjadi referensi *immutable* selama fase Delivery (`sdlc-delivery`).

---

## 1. Stack & Verification Commands
Perintah otomatis yang wajib dijalankan oleh agen sebelum menyatakan pekerjaan selesai atau saat melakukan audit:

- **Stack Utama:** `<mis. Laravel 11 (PHP 8.2+) / AdonisJS v6 (TypeScript) / Vue 3 / Android Kotlin / Tauri Desktop>`
- **Typecheck / Static Analysis:** `<mis. vendor/bin/phpstan analyse | npm run typecheck | ./gradlew detekt>`
- **Linter / Formatter Check:** `<mis. vendor/bin/pint --test | npm run lint | ./gradlew ktlintCheck>`
- **Backend Automated Test:** `<mis. php artisan test | node ace test | npm run test:api>`
- **Client / UI Automated Test:** `<mis. npx vitest run | ./gradlew testDebugUnitTest | cargo test>`
- **UI Design System / Base Components Path (Jika ada UI):** `<mis. src/components/base/ | ui/components/ (BaseButton, BaseNumericInput, BaseModal, BaseScaffold)>`

---

## 2. Isolasi Data & Otorisasi (Multi-Tenancy / Ownership)
- **Kunci Isolasi Utama:** `<mis. tenant_id / company_id / user_id dari konteks sesi auth>`
- **Aturan Anti-IDOR:** Setiap query baca/tulis pada entitas bisnis wajib memfilter berdasarkan kunci isolasi dari sesi autentikasi aktif, dilarang mengambil dari input body/query mentah.

---

## 3. Domain Entities & Boundaries
| Entitas / Tabel | Kolom Kunci & Presisi | Strategi Konkurensi / Lock | Keterangan |
|---|---|---|---|
| `<nama_entitas>` | `<id, tenant_id, amount (decimal/bigint)>` | `<ORDER BY id ASC FOR UPDATE / Atomic Update / CHECK constraint>` | `<deskripsi batas domain>` |

---

## 4. Critical Business Invariants
Daftar aturan bisnis mutlak yang tidak boleh dilanggar dalam kondisi apa pun (termasuk request paralel):
1. `<Invarian 1 — mis. Saldo/stok tidak boleh bernilai negatif (CHECK >= 0)>`
2. `<Invarian 2 — mis. Dokumen berstatus FINALIZED bersifat immutable>`
3. `<Invarian 3 — mis. Kalkulasi uang wajib integer sen / decimal dengan aturan pembulatan eksplisit>`

---

## 5. State Machine Transitions (FSM)
### Entitas: `<Nama Entitas>`
- **Status Valid:** `DRAFT` · `SUBMITTED` · `APPROVED` · `REJECTED`
- **Transisi Diizinkan:**
  - `DRAFT` → `SUBMITTED` (Aktor: `<Role>`, Syarat: `<Guard Condition>`)
  - `SUBMITTED` → `APPROVED` (Aktor: `<Role>`, Syarat: `<Guard Condition>`)
  - `SUBMITTED` → `REJECTED` (Aktor: `<Role>`, Syarat: `<Guard Condition>`)
- **Transisi Terlarang:** Semua transisi di luar daftar di atas wajib ditolak secara eksplisit dengan error domain.
