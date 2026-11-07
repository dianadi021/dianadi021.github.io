---
name: test-client-io
description: Activate this skill when writing, executing, or auditing client/frontend Input/Output (I/O) tests, UI/UX layout & semantic structure compliance, input regex/sanitization, and generating testability refactor reports across Web (Vue/React), Android (Kotlin/Compose), and Desktop (Tauri/Electron/Native).
---

# 🧪 Skill: Client I/O Testing, UI/UX Verification & Refactor Analysis

Panduan operasional lintas-platform (Web, Android, Desktop) untuk menguji kontrak Input/Output (I/O) secara dinamis, memverifikasi kepatuhan struktur semantik UI/UX, serta menghasilkan analisis dan rekomendasi refactor berbasis bukti pengujian.

---

## 0. Protokol Eksekusi (Wajib)
1. **Identifikasi Stack & Runner:** Baca `CONTEXT.md` atau `package.json` / `build.gradle.kts` / `Cargo.toml` untuk menentukan test runner:
   - **Web / Desktop Hybrid (Vue 3, React, Inertia, Electron, Tauri UI):** `vitest run` (+ `@vue/test-utils` atau `@testing-library/react` & `@testing-library/user-event`).
   - **Android Native (Kotlin / Jetpack Compose):** `./gradlew testDebugUnitTest` (`runTest`, `Turbine`, Compose Test Rule via Robolectric).
   - **Desktop Core / Installer (Tauri Rust / Electron Main / Native):** `cargo test` / IPC mock test + *headless binary smoke launch* (aplikasi berjalan & keluar dengan `exit code 0`).
2. **Zero Console/Runtime Error:** Setiap test wajib gagal jika memicu `console.error`, unhandled promise rejection, Vue/React warning, atau uncaught exception.
3. **No Real Network / OS Side-Effects:** Seluruh panggilan HTTP, database lokal, atau IPC bridge wajib di-mock (`vi.mock`, `MSW`, `FakeRepository`, `mockIPC`).

---

## 1. Matriks Vektor Uji Input/Output (Wajib Diuji)

Setiap komponen form, halaman, atau view model wajib diuji terhadap **5 Kontrak I/O** berikut:

| # | Dimensi Uji | Input yang Disuntikkan (Test Vector) | Output yang Wajib Terbukti (Assertion) |
| :--- | :--- | :--- | :--- |
| **1** | **Input Sanitization & Numeric Regex** | Suntikkan string ilegal ke field angka/uang/telepon/OTP/pengukuran: `"1e5"`, `"+-10"`, `"abc"`, `"10..50"`, `"   "`, `"-99"`, serta digit non-ASCII `"١٢٣"`. | Field tidak memakai `<input type="number">` polos. Untuk integer/moneter: hanya digit ASCII `/^\d+$/` (setelah unmask separator ribuan) yang diterima & output moneter bertipe integer/`bigint`/`Long` (bebas `float`). Untuk pengukuran desimal non-moneter: hanya pola `/^\d+([.,]\d{1,4})?$/` yang lolos. |
| **2** | **Semantic Layout & Bottom Action** | Render Form, Modal, atau layar transaksi. | Tombol Primary Action terbukti berada di dalam landmark bawah (`<footer>` / slot `#footer` di Web; `testTag("BottomActionBar")` pada `Scaffold.bottomBar` di Compose) dengan urutan `[Cancel (Kiri)] → [Submit (Kanan)]`. |
| **3** | **4-State View & Text Overflow** | Suntikkan 4 kondisi state (`Loading`, `Empty []`, `Error`, `Success`) + teks ekstrem (200 karakter tanpa spasi & nominal `999999999999`). | Keempat state me-render elemen semantik yang sesuai (skeleton, empty CTA, tombol retry, data valid) tanpa crash; teks panjang ter-truncate tanpa merusak struktur action bar. |
| **4** | **Idempotency & Anti-Double-Submit** | Simulasikan *rapid double/triple click* pada tombol submit saat proses async berlangsung. | Handler submit/API/IPC hanya terpanggil **tepat 1 kali**; tombol berubah menjadi `disabled` / `aria-busy="true"` selama loading. |
| **5** | **Keyboard, Focus & Dirty Guard** | Ubah isi field (`isDirty = true`), lalu tekan `Esc` / klik tombol *Cancel/Back*; uji tekan `Enter` saat submit dan validasi gagal. | Saat `isDirty`, aksi keluar dicegat oleh konfirmasi; saat validasi gagal, pesan error memiliki role semantik (`role="alert"` / `aria-invalid="true"` / `SemanticsProperties.Error`) dan submit diblokir. |

---

## 2. Rubrik Analisis Testability & Trigger Refactor

Jika saat penulisan atau eksekusi test ditemukan kondisi di bawah ini, agen **wajib** mengeluarkan rekomendasi refactor pada laporan:

1. **Tight Coupling (Sulit Di-mock):** Komponen UI memanggil `axios`/`fetch`/IPC/DAO langsung di dalam template atau handler tombol → **Refactor:** Ekstrak ke Composable / Custom Hook / ViewModel; ubah komponen menjadi *stateless presentational* (input via `props`/`state`, output via `emits`/lambda).
2. **Ad-hoc Input / Button (Tidak Standar):** Menggunakan `<input>` atau `<button>` mentah di halaman fitur alih-alih komponen atomik (`<BaseNumericInput>`, `<BaseButton>`) → **Refactor:** Ganti dengan reusable component terpusat agar aturan regex, loading lock, dan styling konsisten.
3. **Non-Semantic Structure:** Tombol form diletakkan di dalam `<div>` sembarangan tanpa landmark `<footer>` / `bottomBar` atau tanpa label aksesibilitas → **Refactor:** Pindahkan ke slot footer semantik pada layout wrapper (`<BaseModal>`, `<BaseFormLayout>`, `<BaseScaffold>`).
4. **Implicit Float Arithmetic:** Perhitungan diskon, pajak, atau subtotal di frontend memakai operasi desimal JS/Float biasa → **Refactor:** Konversi ke integer sen / `bigint` / `BigDecimal`.

---

## 3. Format Laporan Standar (I/O Verification & Refactor Report)

Gunakan format ini di dalam bagian **2. Kode / Eksekusi** untuk melaporkan hasil pengujian sekaligus menjadi referensi refactor bagi pengguna:

```markdown
Status I/O: PASS | FAIL | NEEDS REFACTOR
Stack & Runner: <Web-Vitest | Android-JUnit/Compose | Desktop-IPC> (<X> passed, <Y> failed)
Skor Testability: HIGH (Modular) | MEDIUM | LOW (Coupled / Butuh Refactor)

### 1. Matriks Verifikasi I/O & UI/UX
- [PASS/FAIL] 1. Input Regex & Presisi Moneter: <bukti input "1e5" / "abc" ditolak & bebas float>
- [PASS/FAIL] 2. Struktur Semantik & Bottom Action: <bukti tombol berada di footer/bottomBar>
- [PASS/FAIL] 3. 4-State View & Overflow Resilience: <bukti Loading, Empty, Error, Success & truncate>
- [PASS/FAIL] 4. Idempotency (Anti-Double-Submit): <bukti klik ganda hanya memicu 1x output>
- [PASS/FAIL] 5. Keyboard, A11y & Dirty Form Guard: <bukti role semantik & proteksi unsaved changes>

### 2. Analisis & Rekomendasi Refactor
[PRIORITY: HIGH | MEDIUM | LOW] path/to/File.ext:LINE — <Judul Masalah>
  Gejala I/O: <mengapa test gagal atau sulit diuji>
  Akar Masalah: <pelanggaran standar input / layout / coupling>
  Rekomendasi Refactor:
  ```<lang>
  // Potongan kode perbaikan yang direkomendasikan
  ```
```
