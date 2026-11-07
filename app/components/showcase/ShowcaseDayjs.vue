<script setup lang="ts">
const { $dayjs } = useNuxtApp()

const now = computed(() => $dayjs().format('dddd, DD MMMM YYYY - HH:mm:ss'))
const pastTime = computed(() => $dayjs().subtract(4, 'hour').fromNow())
const futureTime = computed(() => $dayjs().add(3, 'day').format('DD/MM/YYYY (dddd)'))
</script>

<template>
  <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-4">
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div class="flex items-center gap-2">
        <Icon name="heroicons:clock-20-solid" class="w-5 h-5 text-primary" />
        <h2 class="text-base font-bold">6. Day.js (dayjs)</h2>
      </div>
      <span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono text-slate-500">Locale Indonesia</span>
    </div>

    <div class="space-y-2 text-xs">
      <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 flex justify-between">
        <span class="text-slate-500">Waktu Sekarang:</span>
        <ClientOnly>
          <span class="font-bold font-mono text-slate-800 dark:text-slate-200">{{ now }}</span>
          <template #fallback>
            <span class="font-mono text-slate-400">Memuat waktu...</span>
          </template>
        </ClientOnly>
      </div>
      <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 flex justify-between">
        <span class="text-slate-500">Relative Time (fromNow):</span>
        <ClientOnly>
          <span class="font-semibold text-primary">{{ pastTime }}</span>
          <template #fallback>
            <span class="text-slate-400">...</span>
          </template>
        </ClientOnly>
      </div>
      <div class="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 flex justify-between">
        <span class="text-slate-500">3 Hari ke Depan:</span>
        <span class="font-semibold text-success">{{ futureTime }}</span>
      </div>
    </div>
  </div>
</template>
