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
  <div class="rounded-3xl bg-white border border-[#E6DAC3] p-6 sm:p-10 shadow-lg shadow-[#1C3026]/5 text-center space-y-5">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-serif font-semibold bg-[#D4AF37]/15 text-[#8C6415] border border-[#D4AF37]/30">
      <Icon name="heroicons:clock-20-solid" class="w-4 h-4 text-[#AA7A1E]" />
      <span class="tracking-widest uppercase">Menghitung Hari Bahagia</span>
    </div>

    <!-- ClientOnly to Prevent SSR/SSG Hydration Mismatch -->
    <ClientOnly>
      <div v-if="!remaining.isPassed" class="grid grid-cols-4 gap-2.5 sm:gap-5 max-w-lg mx-auto">
        <div class="p-4 sm:p-5 rounded-2xl bg-[#1C3026] text-white shadow-md border border-[#D4AF37]/20">
          <span class="block text-2xl sm:text-4xl font-serif font-bold text-[#D4AF37]">{{ remaining.days }}</span>
          <span class="block text-[10px] sm:text-xs text-[#FAF7F2]/75 uppercase tracking-widest font-serif mt-1">Hari</span>
        </div>
        <div class="p-4 sm:p-5 rounded-2xl bg-[#1C3026] text-white shadow-md border border-[#D4AF37]/20">
          <span class="block text-2xl sm:text-4xl font-serif font-bold text-[#D4AF37]">{{ remaining.hours }}</span>
          <span class="block text-[10px] sm:text-xs text-[#FAF7F2]/75 uppercase tracking-widest font-serif mt-1">Jam</span>
        </div>
        <div class="p-4 sm:p-5 rounded-2xl bg-[#1C3026] text-white shadow-md border border-[#D4AF37]/20">
          <span class="block text-2xl sm:text-4xl font-serif font-bold text-[#D4AF37]">{{ remaining.minutes }}</span>
          <span class="block text-[10px] sm:text-xs text-[#FAF7F2]/75 uppercase tracking-widest font-serif mt-1">Menit</span>
        </div>
        <div class="p-4 sm:p-5 rounded-2xl bg-[#1C3026] text-white shadow-md border border-[#D4AF37]/20">
          <span class="block text-2xl sm:text-4xl font-serif font-bold text-[#D4AF37]">{{ remaining.seconds }}</span>
          <span class="block text-[10px] sm:text-xs text-[#FAF7F2]/75 uppercase tracking-widest font-serif mt-1">Detik</span>
        </div>
      </div>
      <div v-else class="text-base font-serif font-bold text-[#1C3026]">
        Alhamdulillah, Acara Telah Selesai Dilaksanakan! ⚜️
      </div>

      <template #fallback>
        <div class="grid grid-cols-4 gap-2.5 sm:gap-5 max-w-lg mx-auto opacity-50">
          <div v-for="placeholder in ['Hari', 'Jam', 'Menit', 'Detik']" :key="placeholder" class="p-4 sm:p-5 rounded-2xl bg-slate-100 animate-pulse border border-[#E6DAC3]">
            <span class="block text-2xl font-serif text-[#1C3026]">--</span>
            <span class="block text-xs uppercase font-serif">{{ placeholder }}</span>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
