<script setup lang="ts">
import type { WeddingEventSchedule } from '~/types/wedding'

const props = defineProps<{
  events: WeddingEventSchedule[]
}>()
</script>

<template>
  <section class="max-w-4xl mx-auto space-y-8 text-center">
    <div class="space-y-2">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8ECAE6]/20 text-[#023047] dark:text-[#8ECAE6]">
        <span>📅</span>
        <span>Rangkaian Acara</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-serif font-bold text-[#023047] dark:text-white">
        Waktu & Lokasi Penyelenggaraan
      </h2>
      <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
        Dengan memohon rahmat dan ridho Allah SWT, kami mengundang kehadiran Bapak/Ibu pada agenda berikut:
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="event in props.events"
        :key="event.id"
        class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/40 dark:border-[#219EBC]/30 shadow-sm text-left flex flex-col justify-between space-y-5"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FB8500]/15 text-[#FB8500]">
              {{ event.title }}
            </span>
            <Icon name="heroicons:calendar-days-20-solid" class="w-5 h-5 text-[#219EBC]" />
          </div>

          <div class="space-y-1">
            <h3 class="text-xl font-serif font-bold text-[#023047] dark:text-white">
              {{ event.date }}
            </h3>
            <p class="text-sm font-semibold text-[#219EBC] dark:text-[#8ECAE6]">
              {{ event.time }}
            </p>
          </div>

          <div class="space-y-1 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700/60">
            <p class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Icon name="heroicons:building-office-2-20-solid" class="w-4 h-4 text-[#FB8500]" />
              {{ event.venue }}
            </p>
            <p class="leading-relaxed pl-5 text-slate-500 dark:text-slate-400">
              {{ event.address }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2.5 pt-2">
          <a
            :href="event.mapUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#219EBC] hover:bg-[#219EBC]/90 text-white text-xs font-bold transition shadow-xs"
          >
            <Icon name="heroicons:map-pin-20-solid" class="w-4 h-4" />
            <span>Petunjuk Arah (Maps)</span>
          </a>
          <a
            :href="event.calendarUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#023047] border border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] hover:bg-[#8ECAE6]/20 text-xs font-bold transition shadow-2xs"
          >
            <Icon name="heroicons:bell-alert-20-solid" class="w-4 h-4 text-[#FB8500]" />
            <span>Simpan</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
