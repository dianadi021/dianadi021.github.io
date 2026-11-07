<script setup lang="ts">
const { $dayjs, $swal } = useNuxtApp()
const now = useNow()

const currentTime = computed(() => {
  return $dayjs(now.value).format('dddd, DD MMMM YYYY · HH:mm:ss')
})

const showHeartwarmStatus = () => {
  if ($swal) {
    $swal.fire({
      title: 'Studio Catatan Sistem 🌿',
      html: `
        <div class="text-left text-xs sm:text-sm space-y-2.5 p-1 text-[#023047]">
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#198754]"></span>
            <span><strong>Kondisi Mesin:</strong> Berjalan stabil & siap melayani.</span>
          </p>
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#219EBC]"></span>
            <span><strong>Basis Data:</strong> Oracle, PostgreSQL, MongoDB, MySQL terkonfigurasi.</span>
          </p>
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FFB703]"></span>
            <span><strong>Harmoni Arsitektur:</strong> 0 Siklus Impor (Terverifikasi Graphify).</span>
          </p>
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FB8500]"></span>
            <span><strong>Basis Operasional:</strong> Sleman, D.I. Yogyakarta, Indonesia.</span>
          </p>
        </div>
      `,
      confirmButtonText: 'Tutup Catatan',
      confirmButtonColor: '#023047',
      background: '#faf8f5',
    })
  }
}
</script>

<template>
  <div class="lg:col-span-5">
    <div class="relative group">
      <div
        class="rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/50 dark:border-[#219EBC]/40 p-6 sm:p-7 shadow-xl space-y-5 text-left"
      >
        <!-- Postcard Header with Postage Stamp -->
        <div
          class="flex items-start justify-between border-b border-[#8ECAE6]/30 dark:border-[#219EBC]/30 pb-4"
        >
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl">📫</span>
              <span
                class="text-xs font-bold uppercase tracking-wider text-[#219EBC] dark:text-[#8ECAE6]"
              >
                Catatan Rekayasa Digital
              </span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Portfolio & Profil Profesional
            </p>
          </div>

          <div
            class="w-14 h-16 rounded-md border-2 border-dashed border-[#FB8500] bg-[#FFB703]/10 p-1 flex flex-col items-center justify-between text-center rotate-3 shadow-xs"
          >
            <span class="text-[9px] font-bold text-[#FB8500] uppercase tracking-tighter"
              >POS YOGYA</span
            >
            <span class="text-sm">🏮</span>
            <span class="text-[8px] font-mono text-[#023047] dark:text-slate-200">#021</span>
          </div>
        </div>

        <!-- Postcard Note Body -->
        <div class="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-200">
          <p class="italic text-slate-600 dark:text-slate-300">
            "Menghidupkan sistem backend seperti menjaga kestabilan aliran air. Setiap query,
            rute, dan daemon bekerja tepat waktu tanpa kebisingan di permukaan."
          </p>

          <!-- Status Notebook Lines -->
          <div
            class="p-3.5 rounded-2xl bg-[#faf8f5] dark:bg-[#023047]/60 border border-[#8ECAE6]/40 dark:border-[#219EBC]/30 space-y-2"
          >
            <div class="flex items-center justify-between">
              <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]">Nama:</span>
              <span class="font-bold">Dian Adi Nugroho</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]">Peran:</span>
              <span>Web & Backend Developer</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]"
                >Spesialisasi:</span
              >
              <span>Laravel, Oracle, PostgreSQL, Docker</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]"
                >Waktu Sistem:</span
              >
              <ClientOnly>
                <span class="text-[11px] text-[#FB8500] font-medium">{{ currentTime }}</span>
                <template #fallback>
                  <span class="text-[11px] text-[#FB8500] font-medium">Memuat waktu...</span>
                </template>
              </ClientOnly>
            </div>
          </div>
        </div>

        <div class="pt-2 flex items-center justify-between">
          <div class="flex items-center gap-1.5 text-[11px] text-[#198754] font-medium">
            <span class="w-2 h-2 rounded-full bg-[#198754]"></span>
            <span>Siap Menjalankan Layanan</span>
          </div>
          <button
            type="button"
            @click="showHeartwarmStatus"
            class="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#219EBC]/15 text-[#023047] dark:text-[#8ECAE6] hover:bg-[#219EBC]/30 transition"
          >
            Detail Status ↗
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
