<script setup lang="ts">
import type { GuestContext } from '~/types/wedding'

const props = defineProps<{
  guest: GuestContext
  isOpened: boolean
}>()

const emit = defineEmits<{
  (e: 'open'): void
}>()

const onOpenClick = () => {
  emit('open')
}
</script>

<template>
  <section
    class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#023047] via-[#034363] to-[#023047] text-white p-4 transition-all duration-1000 overflow-hidden"
    :class="props.isOpened ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100 translate-y-0'"
  >
    <!-- Background Botanical Floral Rings -->
    <div class="absolute -top-24 -left-24 w-80 h-80 rounded-full border-[30px] border-[#8ECAE6]/10 blur-xs pointer-events-none" />
    <div class="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border-[30px] border-[#FB8500]/10 blur-xs pointer-events-none" />

    <div class="relative w-full max-w-md mx-auto text-center space-y-6 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
      <!-- Seal Badge -->
      <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#219EBC] to-[#FFB703] p-0.5 shadow-lg flex items-center justify-center animate-bounce">
        <div class="w-full h-full bg-[#023047] rounded-full flex items-center justify-center text-2xl">
          💌
        </div>
      </div>

      <div class="space-y-2">
        <p class="text-xs uppercase tracking-widest font-semibold text-[#8ECAE6]">
          The Wedding Celebration of
        </p>
        <h1 class="text-3xl sm:text-4xl font-serif font-extrabold text-[#FFB703] tracking-wide">
          Romeo & Juliet
        </h1>
        <p class="text-xs text-slate-300">
          Minggu, 20 Desember 2026
        </p>
      </div>

      <!-- Guest Card -->
      <div class="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1.5">
        <span class="text-[11px] text-slate-300 block uppercase tracking-wider">
          Kepada Yth. Bapak/Ibu/Saudara/i:
        </span>
        <h2 class="text-lg font-bold text-white tracking-tight">
          {{ props.guest.guestName }}
        </h2>
        <span
          v-if="props.guest.isVip"
          class="inline-block text-[10px] px-2 py-0.5 rounded-full bg-[#FB8500] text-white font-bold uppercase tracking-wider"
        >
          VIP Guest
        </span>
        <p class="text-[11px] text-slate-300 italic pt-1">
          *Mohon maaf bila ada kesalahan penulisan nama/gelar
        </p>
      </div>

      <!-- Open Button -->
      <div>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FB8500] to-[#FFB703] text-[#023047] font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          @click="onOpenClick"
        >
          <Icon name="heroicons:envelope-open-20-solid" class="w-5 h-5" />
          <span>Buka Undangan</span>
        </button>
      </div>
    </div>
  </section>
</template>
