<script setup lang="ts">
import type { CountdownTimeRemaining } from '~/types/wedding'

const props = defineProps<{
  targetDate: string
}>()

const remaining = ref<CountdownTimeRemaining>({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isPassed: false
})

const calculateTime = () => {
  const diff = new Date(props.targetDate).getTime() - Date.now()
  if (diff <= 0) {
    remaining.value = { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true }
    return
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  remaining.value = {
    days,
    hours,
    minutes,
    seconds,
    isPassed: false
  }
}

let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  calculateTime()
  intervalId = setInterval(calculateTime, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="rounded-3xl bg-white dark:bg-[#034363] border border-[#8ECAE6]/40 dark:border-[#219EBC]/30 p-6 sm:p-8 shadow-sm text-center space-y-4">
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8ECAE6]/20 text-[#023047] dark:text-[#8ECAE6]">
      <Icon name="heroicons:clock-20-solid" class="w-4 h-4 text-[#FB8500]" />
      <span>Hitung Mundur Waktu Menuju Hari Bahagia</span>
    </div>

    <!-- ClientOnly to Prevent SSR/SSG Hydration Mismatch -->
    <ClientOnly>
      <div v-if="!remaining.isPassed" class="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
        <div class="p-3 sm:p-4 rounded-2xl bg-[#023047] text-white shadow-xs">
          <span class="block text-2xl sm:text-4xl font-extrabold font-mono text-[#FFB703]">{{ remaining.days }}</span>
          <span class="block text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider mt-1">Hari</span>
        </div>
        <div class="p-3 sm:p-4 rounded-2xl bg-[#023047] text-white shadow-xs">
          <span class="block text-2xl sm:text-4xl font-extrabold font-mono text-[#FFB703]">{{ remaining.hours }}</span>
          <span class="block text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider mt-1">Jam</span>
        </div>
        <div class="p-3 sm:p-4 rounded-2xl bg-[#023047] text-white shadow-xs">
          <span class="block text-2xl sm:text-4xl font-extrabold font-mono text-[#FFB703]">{{ remaining.minutes }}</span>
          <span class="block text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider mt-1">Menit</span>
        </div>
        <div class="p-3 sm:p-4 rounded-2xl bg-[#023047] text-white shadow-xs">
          <span class="block text-2xl sm:text-4xl font-extrabold font-mono text-[#FFB703]">{{ remaining.seconds }}</span>
          <span class="block text-[10px] sm:text-xs text-slate-300 uppercase tracking-wider mt-1">Detik</span>
        </div>
      </div>
      <div v-else class="text-base font-bold text-success">
        Alhamdulillah, Acara Telah Selesai Dilaksanakan! 🎉
      </div>

      <template #fallback>
        <div class="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto opacity-50">
          <div v-for="placeholder in ['Hari', 'Jam', 'Menit', 'Detik']" :key="placeholder" class="p-3 sm:p-4 rounded-2xl bg-slate-200 dark:bg-slate-700 animate-pulse">
            <span class="block text-2xl font-mono">--</span>
            <span class="block text-xs uppercase">{{ placeholder }}</span>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
