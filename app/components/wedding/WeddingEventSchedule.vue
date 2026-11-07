<script setup lang="ts">
import type { WeddingEventSchedule } from '~/types/wedding'

const props = defineProps<{
  events: WeddingEventSchedule[]
}>()
</script>

<template>
  <section class="max-w-4xl mx-auto space-y-8 text-center">
    <div class="space-y-2">
      <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-serif font-semibold bg-[#E8D5CE]/40 text-[#1C3026] border border-[#C5A880]/30 shadow-xs">
        <span>📅</span>
        <span>Rangkaian Acara</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-serif font-bold text-[#1C3026]">
        Waktu & Lokasi Penyelenggaraan
      </h2>
      <p class="text-xs sm:text-sm text-[#1C3026]/75 font-serif max-w-lg mx-auto">
        Dengan memohon rahmat dan ridho Allah SWT, kami mengundang kehadiran Bapak/Ibu pada agenda berikut:
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="event in props.events"
        :key="event.id"
        class="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E6DAC3] shadow-md shadow-[#C5A880]/10 text-left flex flex-col justify-between space-y-5 hover:border-[#D4AF37]/60 transition"
      >
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-serif font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#1C3026] border border-[#D4AF37]/30">
              {{ event.title }}
            </span>
            <Icon name="heroicons:calendar-days-20-solid" class="w-5 h-5 text-[#D4AF37]" />
          </div>

          <div class="space-y-1">
            <h3 class="text-xl font-serif font-bold text-[#1C3026]">
              {{ event.date }}
            </h3>
            <p class="text-sm font-semibold text-[#C5A880] font-serif">
              {{ event.time }}
            </p>
          </div>

          <div class="space-y-1 text-xs text-[#1C3026]/80 pt-2 border-t border-[#E6DAC3]/60">
            <p class="font-bold text-[#1C3026] flex items-center gap-1.5">
              <Icon name="heroicons:building-office-2-20-solid" class="w-4 h-4 text-[#D4AF37]" />
              {{ event.venue }}
            </p>
            <p class="leading-relaxed pl-5 text-[#1C3026]/70 font-serif">
              {{ event.address }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap gap-2.5 pt-2">
          <a
            :href="event.mapUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A880] hover:from-[#c29e2e] hover:to-[#b3956d] text-white text-xs font-serif font-bold transition shadow-xs"
          >
            <Icon name="heroicons:map-pin-20-solid" class="w-4 h-4" />
            <span>Petunjuk Arah (Maps)</span>
          </a>
          <a
            :href="event.calendarUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#C5A880]/50 text-[#1C3026] hover:bg-[#E8D5CE]/30 text-xs font-serif font-bold transition shadow-2xs"
          >
            <Icon name="heroicons:bell-alert-20-solid" class="w-4 h-4 text-[#D4AF37]" />
            <span>Simpan</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
