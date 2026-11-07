---
name: review-android-kotlin
description: Activate this skill when reviewing, auditing, or inspecting Android Native (Kotlin) codebase, Jetpack Compose, Coroutines/Flow, ViewModel, Room, or Architecture Components.
---

# 📱 Skill: Code Review Android Native & Kotlin

## 0. Protokol Review (Wajib)
1. **Scope:** Review hanya diff (`git diff <base>...HEAD`) atau file yang disebut user. Jika tidak jelas, tanyakan.
2. **Tooling dulu:** Jalankan perintah di `CONTEXT.md` (default: `./gradlew detekt ktlintCheck lint testDebugUnitTest`). LLM fokus pada arsitektur, konkurensi, lifecycle, dan logika bisnis.
3. **Bukti:** Setiap temuan wajib `file:line`.

---

## 1. Rubrik Pemeriksaan

### A. UI, Struktur Semantik & Komponen Reusable (Compose)
- [ ] **Design System & Strict Reusable:** UI wajib memakai komponen atomik & token terpusat (`BaseButton`, `BaseTextField`, `BaseNumericTextField`, `BaseDialog`, Typography, 4dp/8dp Spacing Grid). Dilarang duplikasi widget ad-hoc.
- [ ] **Stateless Composable:** State di-hoist ke pemanggil/ViewModel; composable reusable menerima `state` + lambda event, dan parameter `modifier: Modifier = Modifier`.
- [ ] **Semantic Layout & Bottom Action Placement:**
  - Layar form/detail memakai `Scaffold(topBar = ..., bottomBar = ...)` dengan `navigationBarsPadding()` / `imePadding()`.
  - **Bottom Action Rule:** Primary action pada Form, BottomSheet, dan layar transaksi wajib ditempatkan di slot `bottomBar` (memiliki `Modifier.testTag("BottomActionBar")` pada komponen pusat). Dialog memakai urutan tombol `[Dismiss/Cancel (Kiri)]` → `[Confirm/Primary (Kanan)]`.
  - **4-State & Overflow Resilience:** `UiState` wajib mencakup `Loading`, `Empty`, `Error` (dengan aksi retry), dan `Success`. Teks dinamis memakai `maxLines` + `TextOverflow.Ellipsis` agar tidak mendorong tombol keluar layar.
- [ ] **Standar Input Angka & Moneter:** Input bulat/uang/OTP wajib memakai `KeyboardOptions(keyboardType = KeyboardType.Number, imeAction = ImeAction.Done/Next)` dengan filter digit ASCII ketat (`it.all { c -> c in '0'..'9' }` + `VisualTransformation` ribuan) dan disimpan sebagai `Long` (satuan sen) atau `BigDecimal` (hindari `Char::isDigit` karena meloloskan digit Unicode non-ASCII). Untuk pengukuran desimal non-moneter (dosis/suhu/berat), gunakan `KeyboardType.Decimal` + regex `/^\d+([.,]\d{1,4})?$/`. Dilarang memakai `Float`/`Double` untuk uang.
- [ ] **Touch Target, Dirty Guard & Anti-Double-Tap:** Target klik minimal `48.dp`, tombol submit terkunci (`enabled = !state.isSubmitting`) saat proses berjalan, dan form yang sudah diubah (`isDirty`) mencegat `BackHandler` dengan dialog konfirmasi.
- [ ] **Recomposition & Stabilitas:** Objek mahal dibungkus `remember`; state turunan memakai `derivedStateOf`; Lazy list memakai `key = { it.id }`. Gunakan `kotlinx.collections.immutable` untuk list di UI state.
- [ ] **Context Leak:** Dilarang menyimpan `Activity`/`Context`/`View` di ViewModel, singleton, atau static.

### B. Coroutines & Flow
- [ ] Dilarang `GlobalScope`; gunakan `viewModelScope`/`lifecycleScope`/scope yang di-inject.
- [ ] **Dispatcher:** Inject `CoroutineDispatcher` (testable). Fungsi `suspend` Room/Retrofit sudah main-safe → `withContext(IO)` redundan. Alihkan ke `IO` hanya untuk API blocking non-suspend; CPU berat ke `Default`.
- [ ] **Cancellation:** `catch (e: Exception)` / `runCatching` wajib me-rethrow `CancellationException`.
- [ ] **Collection UI:** `collectAsStateWithLifecycle()` (Compose) / `repeatOnLifecycle(STARTED)` (Views).
- [ ] **State vs Event:** UI state via `StateFlow` (`stateIn(..., WhileSubscribed(5_000), ...)`); one-shot event dimodelkan di state atau `Channel`, bukan `SharedFlow` tanpa replay yang bisa hilang.

### C. Kotlin Idioms & Type Safety
- [ ] Dilarang `!!`. Gunakan `?.`, `?:`, smart cast, atau `requireNotNull(x) { "alasan" }` / `checkNotNull` untuk invarian.
- [ ] Backing property: `private val _state = MutableStateFlow(...)`; `val state: StateFlow<T> = _state.asStateFlow()`.
- [ ] Public API mengekspos `List`, bukan `MutableList`; `data class` dengan `val`.
- [ ] State UI terbatas dimodelkan dengan `sealed interface`, `when` exhaustive.

### D. Data Layer (Room/Network) & DI
- [ ] DAO berupa `suspend` atau `Flow`. Mutasi multi-tabel ditandai `@Transaction`.
- [ ] **Anti-N+1:** Dilarang query DAO di dalam loop; gunakan `@Relation`, JOIN, atau `WHERE id IN (:ids)`. Utamakan `@Insert`/`@Upsert` dengan `List<T>`.
- [ ] Migrasi Room eksplisit (bukan `fallbackToDestructiveMigration` di produksi).
- [ ] Repository sebagai single source of truth; mapping DTO ↔ domain ↔ UI model terpisah.
- [ ] DI via Hilt/Koin constructor injection; tidak ada service locator di Composable.

### E. Keamanan (OWASP MASVS)
- [ ] Komponen `exported` hanya bila perlu dan dilindungi permission.
- [ ] `usesCleartextTraffic=false`; network security config untuk domain produksi.
- [ ] Token/secret di DataStore terenkripsi / Android Keystore, bukan SharedPreferences polos atau hardcode di kode/`BuildConfig`.
- [ ] Tidak ada log PII/token di build release; R8/minify aktif.
- [ ] WebView: JavaScript & `addJavascriptInterface` hanya untuk konten tepercaya.

### F. Testing
- [ ] ViewModel/UseCase dites dengan `runTest` + `StandardTestDispatcher`; Flow dites dengan Turbine; UI & kontrak I/O kritis dites sesuai standar [`test-client-io`](../test-client-io/SKILL.md).

---

## 2. Format Laporan
```
Status: APPROVED | REQUEST CHANGES | BLOCKED
Tooling: <hasil detekt / lint / test>
Ringkasan: BLOCKER x · MAJOR x · MINOR x · NIT x

[SEVERITY] path/File.kt:LINE — Masalah
  Alasan: dampak (leak, crash, jank, keamanan)
  Perbaikan: potongan kode Kotlin
```
Severity: **BLOCKER** (crash, leak, keamanan, data loss) · **MAJOR** (recomposition berat, cancellation tertelan, N+1) · **MINOR** · **NIT**.
