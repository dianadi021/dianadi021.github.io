<script setup lang="ts">
import { cn } from '~/utils/cn'

const isButtonDanger = ref(false)
const mergedClasses = computed(() => {
  return cn(
    'px-4 py-2 rounded-lg font-medium transition text-white',
    isButtonDanger.value ? 'bg-danger hover:bg-danger-600' : 'bg-primary hover:bg-primary-600'
  )
})
</script>

<template>
  <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm">
          <Icon name="heroicons:paint-brush-20-solid" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-lg font-bold">1. Tailwind CSS & Format Warna Bootstrap</h2>
          <p class="text-xs text-slate-500">Palet warna terintegrasi di tailwind.config.ts</p>
        </div>
      </div>
      <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
        Tailwind + Bootstrap Palette
      </span>
    </div>

    <!-- Color Chips Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
      <div class="p-3 rounded-xl bg-primary text-white text-center shadow-xs">
        <span class="block text-xs font-bold">primary</span>
        <span class="block text-[10px] opacity-80 font-mono">#0d6efd</span>
      </div>
      <div class="p-3 rounded-xl bg-secondary-white text-secondary-black border border-slate-200 dark:border-slate-700 text-center shadow-xs">
        <span class="block text-xs font-bold">sec-white</span>
        <span class="block text-[10px] text-slate-500 font-mono">#f8f9fa</span>
      </div>
      <div class="p-3 rounded-xl bg-secondary-black text-secondary-white text-center shadow-xs">
        <span class="block text-xs font-bold">sec-black</span>
        <span class="block text-[10px] opacity-80 font-mono">#212529</span>
      </div>
      <div class="p-3 rounded-xl bg-secondary text-white text-center shadow-xs">
        <span class="block text-xs font-bold">secondary</span>
        <span class="block text-[10px] opacity-80 font-mono">#6c757d</span>
      </div>
      <div class="p-3 rounded-xl bg-warning text-slate-900 text-center shadow-xs">
        <span class="block text-xs font-bold">warning</span>
        <span class="block text-[10px] text-slate-800 font-mono">#ffc107</span>
      </div>
      <div class="p-3 rounded-xl bg-danger text-white text-center shadow-xs">
        <span class="block text-xs font-bold">danger</span>
        <span class="block text-[10px] opacity-80 font-mono">#dc3545</span>
      </div>
      <div class="p-3 rounded-xl bg-info text-slate-900 text-center shadow-xs">
        <span class="block text-xs font-bold">info</span>
        <span class="block text-[10px] text-slate-800 font-mono">#0dcaf0</span>
      </div>
      <div class="p-3 rounded-xl bg-success text-white text-center shadow-xs">
        <span class="block text-xs font-bold">success</span>
        <span class="block text-[10px] opacity-80 font-mono">#198754</span>
      </div>
    </div>

    <!-- Helper cn() Showcase -->
    <div class="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div>
        <span class="font-semibold text-slate-700 dark:text-slate-300">Helper cn() (clsx + tailwind-merge):</span>
        <p class="text-slate-500">Menggabungkan class dinamis tanpa konflik CSS.</p>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          :class="mergedClasses"
          @click="isButtonDanger = !isButtonDanger"
        >
          Klik untuk Toggle Variant ({{ isButtonDanger ? 'Danger' : 'Primary' }})
        </button>
      </div>
    </div>
  </section>
</template>
