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
    class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#14231C] via-[#1C3026] to-[#122019] text-[#FAF7F2] p-4 transition-all duration-1000 overflow-hidden"
    :class="props.isOpened ? 'opacity-0 pointer-events-none -translate-y-full' : 'opacity-100 translate-y-0'"
  >
    <!-- Background Luxury Botanical Foil Rings -->
    <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-[#D4AF37]/20 blur-2xs pointer-events-none" />
    <div class="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border border-[#C5A880]/20 blur-2xs pointer-events-none" />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

    <div class="relative w-full max-w-md mx-auto text-center space-y-7 p-8 sm:p-10 rounded-3xl bg-[#1C3026]/90 backdrop-blur-xl border border-[#D4AF37]/30 shadow-2xl">
      <!-- Gold Wax Seal Icon -->
      <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#F3E5AB] via-[#D4AF37] to-[#AA7A1E] p-0.5 shadow-xl flex items-center justify-center animate-pulse">
        <div class="w-full h-full bg-[#14231C] rounded-full flex items-center justify-center text-2xl text-[#D4AF37]">
          ⚜️
        </div>
      </div>

      <div class="space-y-2">
        <span class="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37] block">
          The Wedding Celebration
        </span>
        <h1 class="text-3xl sm:text-4xl font-serif font-extrabold text-[#FAF7F2] tracking-wider leading-tight">
          Romeo <span class="text-[#D4AF37] font-light">&</span> Juliet
        </h1>
        <p class="text-xs text-[#FAF7F2]/70 tracking-widest font-serif pt-1">
          Minggu, 20 Desember 2026
        </p>
      </div>

      <!-- Golden Guest Card Frame -->
      <div class="p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/30 space-y-2 relative overflow-hidden backdrop-blur-xs">
        <div class="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        <span class="text-[11px] text-[#FAF7F2]/70 block uppercase tracking-widest font-serif">
          Kepada Yth. Bapak/Ibu/Saudara/i:
        </span>
        <h2 class="text-xl font-serif font-bold text-[#FAF7F2] tracking-tight">
          {{ props.guest.guestName }}
        </h2>
        <span
          v-if="props.guest.isVip"
          class="inline-block text-[10px] px-3 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] font-bold uppercase tracking-widest"
        >
          VIP Guest
        </span>
        <p class="text-[10px] text-[#FAF7F2]/60 italic pt-1">
          *Mohon maaf apabila ada kesalahan penulisan nama atau gelar
        </p>
      </div>

      <!-- Luxury Open Invitation Button -->
      <div>
        <button
          type="button"
          class="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A880] text-[#14231C] font-serif font-bold text-xs tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          @click="onOpenClick"
        >
          <Icon name="heroicons:envelope-open-20-solid" class="w-4 h-4 text-[#14231C]" />
          <span>Buka Undangan</span>
        </button>
      </div>
    </div>
  </section>
</template>
