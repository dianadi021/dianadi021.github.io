<script setup lang="ts">
import type { Criterion, Alternative } from '~/types/topsis'

useSeoMeta({
  title: 'Kalkulator TOPSIS | Dian Adi Nugroho',
  description: 'Kalkulator pengambilan keputusan multikriteria menggunakan metode TOPSIS.',
})

const { calculate } = useTopsis()

let nextId = 1
const generateId = (prefix: string) => `${prefix}-${nextId++}`

const criteria = ref<Criterion[]>([
  { id: generateId('crit'), name: 'Korelasi', weight: 0.25, impact: 'benefit' },
  { id: generateId('crit'), name: 'R-Squared', weight: 0.25, impact: 'benefit' },
  { id: generateId('crit'), name: 'RMSE', weight: 0.25, impact: 'cost' },
  { id: generateId('crit'), name: 'Akurasi (%)', weight: 0.25, impact: 'benefit' },
])
const alternatives = ref<Alternative[]>([
  { id: generateId('alt'), name: 'Model A', values: [0.79, 0.62, 1.25, 60.89] },
  { id: generateId('alt'), name: 'Model B', values: [0.66, 0.44, 2.89, 63.07] },
  { id: generateId('alt'), name: 'Model C', values: [0.56, 0.31, 1.57, 62.87] },
  { id: generateId('alt'), name: 'Model D', values: [0.82, 0.67, 2.68, 70.19] },
  { id: generateId('alt'), name: 'Model E', values: [0.75, 0.56, 1.30, 80.39] },
])
const notice = ref('')

const calculation = computed(() => calculate(criteria.value, alternatives.value))
const totalWeight = computed(() => calculation.value.totalWeight)
const results = computed(() => calculation.value.rankedAlternatives)
const best = computed(() => calculation.value.bestAlternative)
const summary = computed(() => calculation.value.summary)

const updateValue = (alternativeIndex: number, criterionIndex: number, value: string | number) => {
  const targetAlternative = alternatives.value[alternativeIndex]
  if (targetAlternative) {
    targetAlternative.values[criterionIndex] = value === '' ? Number.NaN : Number(value)
  }
}
const addCriterion = () => {
  criteria.value.push({ id: generateId('crit'), name: `Kriteria ${criteria.value.length + 1}`, weight: 1, impact: 'benefit' })
  alternatives.value.forEach((alternative) => alternative.values.push(0))
}
const removeCriterion = (index: number) => {
  if (criteria.value.length <= 1) return
  criteria.value.splice(index, 1)
  alternatives.value.forEach((alternative) => alternative.values.splice(index, 1))
}
const addAlternative = () => alternatives.value.push({ id: generateId('alt'), name: `Alternatif ${alternatives.value.length + 1}`, values: criteria.value.map(() => 0) })
const removeAlternative = (index: number) => {
  if (alternatives.value.length <= 2) return
  alternatives.value.splice(index, 1)
}

const { start: resetNoticeTimeout } = useTimeoutFn(() => {
  notice.value = ''
}, 2500, { immediate: false })

const copySummary = async () => {
  try {
    await navigator.clipboard.writeText(summary.value)
    notice.value = 'Ringkasan disalin.'
  } catch {
    notice.value = 'Clipboard tidak tersedia. Pilih teks ringkasan lalu salin secara manual.'
  }
  resetNoticeTimeout()
}
const downloadFile = (content: string, filename: string, type: string) => {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
const downloadSummary = () => downloadFile(summary.value, 'ringkasan-topsis.txt', 'text/plain;charset=utf-8')

const sanitizeCsvCell = (val: unknown): string => {
  const str = String(val ?? '')
  const escaped = str.replaceAll('"', '""')
  // Mitigate CSV Formula Injection (CWE-1236)
  return /^[=+\-@\t\r]/.test(str) ? `"'${escaped}"` : `"${escaped}"`
}

const downloadCsv = () => {
  const header = ['Peringkat', 'Alternatif', ...criteria.value.map((criterion) => criterion.name), 'Skor TOPSIS']
  const rows = results.value.map((result) => [result.rank, result.name, ...result.values, result.score.toFixed(8)])
  const csv = [header, ...rows].map((row) => row.map(sanitizeCsvCell).join(',')).join('\r\n')
  downloadFile(`\uFEFF${csv}`, 'hasil-topsis.csv', 'text/csv;charset=utf-8')
}

const formatScore = (score: number) => score.toFixed(4)
</script>

<template>
  <main class="mx-auto w-full max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
    <header class="relative overflow-hidden rounded-3xl bg-[#023047] px-6 py-8 text-white shadow-xl sm:px-10 sm:py-10">
      <div class="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[36px] border-[#219EBC]/20" />
      <div class="relative max-w-3xl space-y-4">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-[#8ECAE6] hover:text-white">← Kembali ke portofolio</NuxtLink>
        <div class="inline-flex items-center gap-2 rounded-full border border-[#8ECAE6]/30 bg-white/5 px-3 py-1 text-xs font-semibold text-[#8ECAE6]">
          <span class="h-2 w-2 rounded-full bg-[#FFB703]" /> DECISION SUPPORT · MULTI-CRITERIA
        </div>
        <h1 class="text-3xl font-extrabold tracking-tight sm:text-5xl">Kalkulator <span class="text-[#FFB703]">TOPSIS</span></h1>
        <p class="max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">Bandingkan beberapa alternatif berdasarkan kriteria berbobot. Atur data, pilih kriteria benefit atau cost, lalu lihat peringkat yang dihitung langsung di browser.</p>
        <a href="https://github.com/dianadi021/topsis" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-lg bg-[#FB8500] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#e87500]">Lihat proyek sumber <span aria-hidden="true">↗</span></a>
      </div>
    </header>

    <section aria-labelledby="referensi-topsis" class="rounded-2xl border border-[#8ECAE6]/50 bg-white p-5 shadow-sm dark:border-[#219EBC]/30 dark:bg-[#034363] sm:p-6">
      <h2 id="referensi-topsis" class="text-lg font-bold text-[#023047] dark:text-white">Latar belakang dan referensi</h2>
      <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        Tools (Website) ini merupakan suatu final projek yang dibuat untuk melengkapi tugas akhir (skripsi) jurusan S1 - Informatika di
        Universitas AMIKOM Yogyakarta. Tools ini dibuat karena terinspirasi dari website
        <a href="https://decision-radar.com/Topsis.html" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#219EBC] underline decoration-[#219EBC]/40 underline-offset-2 hover:text-[#FB8500]">Decision Radar Ez-TOPSIS</a>.
        Namun semua sistem <i>back-end</i> dari tools ini dikerjakan secara <i>manual</i> hanya dengan menggunakan bahasa
        <i>JavaScript</i> atau tanpa campur tangan <i>framework</i>. <i>Framework</i> yang digunakan hanyalah
        <a href="https://getbootstrap.com/docs/5.1/getting-started/introduction/" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#219EBC] underline decoration-[#219EBC]/40 underline-offset-2 hover:text-[#FB8500]">Bootstrap</a>.
        Untuk rumus perhitungan, mengikuti materi yang tertulis pada artikel
        <a href="https://payahtidur.com/project/topsis" target="_blank" rel="noopener noreferrer" class="font-semibold text-[#219EBC] underline decoration-[#219EBC]/40 underline-offset-2 hover:text-[#FB8500]">Buku Informatika</a>.
      </p>
    </section>

    <section class="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <div class="space-y-6">
        <section class="rounded-2xl border border-[#8ECAE6]/50 bg-white p-5 shadow-sm dark:border-[#219EBC]/30 dark:bg-[#034363] sm:p-6">
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div><h2 class="text-lg font-bold">Kriteria dan bobot</h2><p class="text-sm text-slate-500 dark:text-slate-300">Bobot boleh memakai skala apa pun; kalkulator menormalkannya.</p></div>
            <button type="button" class="rounded-lg border border-[#219EBC]/40 px-3 py-2 text-sm font-semibold text-[#219EBC] hover:bg-[#8ECAE6]/20" @click="addCriterion">+ Tambah kriteria</button>
          </div>
          <div class="space-y-2">
            <div v-for="(criterion, index) in criteria" :key="criterion.id || index" class="grid grid-cols-[1fr_6rem_7.5rem_2rem] items-center gap-2">
              <input v-model="criterion.name" :aria-label="`Nama kriteria ${index + 1}`" class="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-600 dark:bg-[#023047]" />
              <input v-model.number="criterion.weight" type="number" min="0" step="0.05" :aria-label="`Bobot ${criterion.name}`" class="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm dark:border-slate-600 dark:bg-[#023047]" />
              <select v-model="criterion.impact" :aria-label="`Tipe ${criterion.name}`" class="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm dark:border-slate-600 dark:bg-[#023047]"><option value="benefit">Benefit ↑</option><option value="cost">Cost ↓</option></select>
              <button type="button" :disabled="criteria.length <= 1" class="rounded p-1 text-slate-400 hover:text-red-500 disabled:opacity-30" :aria-label="`Hapus ${criterion.name}`" @click="removeCriterion(index)">×</button>
            </div>
          </div>
          <p class="mt-3 text-xs text-slate-500 dark:text-slate-300">Total bobot saat ini: <strong>{{ totalWeight.toFixed(2) }}</strong></p>
        </section>

        <section class="rounded-2xl border border-[#8ECAE6]/50 bg-white p-5 shadow-sm dark:border-[#219EBC]/30 dark:bg-[#034363] sm:p-6">
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div><h2 class="text-lg font-bold">Matriks keputusan</h2><p class="text-sm text-slate-500 dark:text-slate-300">Masukkan nama alternatif dan nilai numerik setiap kriteria.</p></div>
            <button type="button" class="rounded-lg border border-[#219EBC]/40 px-3 py-2 text-sm font-semibold text-[#219EBC] hover:bg-[#8ECAE6]/20" @click="addAlternative">+ Tambah alternatif</button>
          </div>
          <div class="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-600">
            <table class="w-full min-w-max text-left text-sm">
              <thead class="bg-[#023047] text-xs uppercase tracking-wide text-white"><tr><th class="px-3 py-3">Alternatif</th><th v-for="criterion in criteria" :key="criterion.id" class="px-3 py-3">{{ criterion.name }}</th><th class="px-2 py-3"><span class="sr-only">Aksi</span></th></tr></thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-600">
                <tr v-for="(alternative, rowIndex) in alternatives" :key="alternative.id || rowIndex">
                  <td class="p-2"><input v-model="alternative.name" :aria-label="`Nama alternatif ${rowIndex + 1}`" class="w-36 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2 dark:border-slate-600 dark:bg-[#023047]" /></td>
                  <td v-for="(criterion, columnIndex) in criteria" :key="criterion.id" class="p-2"><input :value="alternative.values[columnIndex]" type="number" step="any" :aria-label="`${alternative.name}, ${criterion.name}`" class="w-28 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2 dark:border-slate-600 dark:bg-[#023047]" @input="updateValue(rowIndex, columnIndex, ($event.target as HTMLInputElement).value)" /></td>
                  <td class="p-2"><button type="button" :disabled="alternatives.length <= 2" class="rounded px-2 py-1 text-slate-400 hover:text-red-500 disabled:opacity-30" :aria-label="`Hapus ${alternative.name}`" @click="removeAlternative(rowIndex)">×</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="mt-3 text-xs text-slate-500 dark:text-slate-300">Contoh awal berisi penilaian model. Ganti dengan data keputusanmu sendiri.</p>
        </section>
      </div>

      <aside class="space-y-6">
        <section class="rounded-2xl border border-[#219EBC]/30 bg-gradient-to-br from-[#023047] to-[#034363] p-6 text-white shadow-sm">
          <div class="flex items-center gap-2 text-sm font-semibold text-[#8ECAE6]"><span class="text-[#FFB703]">✦</span> REKOMENDASI TERBAIK</div>
          <template v-if="best"><p class="mt-5 text-3xl font-extrabold">{{ best.name }}</p><p class="mt-1 text-sm text-slate-300">Skor preferensi TOPSIS</p><p class="mt-4 text-5xl font-black text-[#FFB703]">{{ formatScore(best.score) }}</p></template>
          <p v-else class="mt-5 text-sm text-slate-300">Periksa nilai matriks dan total bobot untuk menampilkan hasil.</p>
          <div class="mt-6 border-t border-white/10 pt-4 text-xs leading-5 text-slate-300">Skor mendekati 1 menunjukkan alternatif lebih dekat ke solusi ideal positif.</div>
        </section>

        <section class="rounded-2xl border border-[#8ECAE6]/50 bg-white p-5 shadow-sm dark:border-[#219EBC]/30 dark:bg-[#034363]">
          <div class="mb-4 flex items-center justify-between"><div><h2 class="font-bold">Peringkat alternatif</h2><p class="text-xs text-slate-500 dark:text-slate-300">Diurutkan dari skor tertinggi</p></div><button type="button" class="text-xs font-semibold text-[#219EBC] hover:underline" @click="downloadCsv">Unduh CSV</button></div>
          <ol v-if="results.length" class="space-y-3"><li v-for="item in results" :key="item.name" class="flex items-center gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold" :class="item.rank === 1 ? 'bg-[#FFB703] text-[#023047]' : 'bg-[#8ECAE6]/30 text-[#023047] dark:text-white'">{{ item.rank }}</span><span class="min-w-0 flex-1 truncate text-sm font-semibold">{{ item.name }}</span><span class="font-mono text-sm tabular-nums">{{ formatScore(item.score) }}</span></li></ol>
          <p v-else class="text-sm text-amber-700 dark:text-amber-300">Pastikan nilai berupa angka, tiap kolom memiliki nilai bukan nol, dan total bobot lebih dari nol.</p>
        </section>
      </aside>
    </section>

    <section class="overflow-hidden rounded-2xl border border-slate-300 bg-[#f4f1e8] shadow-md dark:border-slate-600">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 bg-[#e9e5d9] px-5 py-3 dark:border-slate-600 dark:bg-[#023047]">
        <div class="flex items-center gap-2"><span class="text-lg">📝</span><div><h2 class="text-sm font-bold">Notepad · Ringkasan hasil</h2><p class="text-xs text-slate-500 dark:text-slate-300">Ringkasan otomatis mengikuti hasil perhitungan.</p></div></div>
        <div class="flex gap-2"><button type="button" class="rounded-lg border border-slate-400/60 px-3 py-2 text-xs font-semibold hover:bg-white/60 dark:hover:bg-white/10" @click="copySummary">Salin teks</button><button type="button" class="rounded-lg bg-[#FB8500] px-3 py-2 text-xs font-bold text-white hover:bg-[#e87500]" @click="downloadSummary">Simpan .txt</button></div>
      </div>
      <textarea :value="summary" readonly aria-label="Ringkasan hasil TOPSIS" class="min-h-64 w-full resize-y bg-[#fffdf6] p-5 font-mono text-sm leading-6 text-[#263238] outline-none dark:bg-[#01283c] dark:text-slate-100" />
      <p v-if="notice" role="status" class="border-t border-slate-300 px-5 py-2 text-xs text-emerald-700 dark:border-slate-600 dark:text-emerald-300">{{ notice }}</p>
    </section>

    <section class="grid gap-4 sm:grid-cols-3">
      <article v-for="(step, index) in ['Normalisasi vektor setiap kolom kriteria', 'Kalikan nilai normalisasi dengan bobot kriteria', 'Ukur jarak ke solusi ideal positif dan negatif']" :key="step" class="rounded-xl border border-[#8ECAE6]/50 bg-white p-4 dark:border-[#219EBC]/30 dark:bg-[#034363]"><span class="text-xs font-bold text-[#FB8500]">LANGKAH 0{{ index + 1 }}</span><p class="mt-2 text-sm font-medium">{{ step }}</p></article>
    </section>
  </main>
</template>
