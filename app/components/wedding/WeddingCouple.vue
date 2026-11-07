<script setup lang="ts">
import type { CoupleProfile } from '~/types/wedding'

const props = defineProps<{
  couple: CoupleProfile
}>()
</script>

<template>
  <section class="max-w-4xl mx-auto space-y-10 text-center">
    <div class="space-y-3">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-serif font-semibold bg-[#D4AF37]/15 text-[#8C6415] border border-[#D4AF37]/30">
        <span>🕊️</span>
        <span class="tracking-widest uppercase">Pasangan Mempelai</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-serif font-bold text-[#1C3026] tracking-tight">
        Maha Suci Allah yang Menciptakan Berpasang-pasangan
      </h2>
      <p class="text-xs sm:text-sm text-[#1C3026]/75 max-w-xl mx-auto leading-relaxed font-serif italic">
        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
        <span class="block text-[11px] not-italic font-sans text-[#8C6415] font-semibold pt-1">
          (QS. Ar-Rum: 21)
        </span>
      </p>
    </div>

    <!-- Couple Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <!-- Groom Card -->
      <div class="p-8 sm:p-10 rounded-3xl bg-white border border-[#E6DAC3] shadow-lg shadow-[#1C3026]/5 space-y-5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none" />
        <div class="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#F3E5AB] to-[#C5A880] p-1 shadow-md">
          <div class="w-full h-full rounded-full bg-[#FAF7F2] flex items-center justify-center text-4xl">
            🤵🏻‍♂️
          </div>
        </div>
        <div class="space-y-2">
          <h3 class="text-2xl font-serif font-bold text-[#1C3026]">
            {{ props.couple.groomFullName }}
          </h3>
          <p class="text-xs text-[#8C6415] font-semibold tracking-wider uppercase font-serif">
            {{ props.couple.groomBio }}
          </p>
          <div class="pt-3 border-t border-[#E6DAC3]/60 text-xs text-[#1C3026]/70 leading-relaxed font-serif">
            <span class="text-[11px] text-[#8C6415] uppercase tracking-wider block">Putra Tercinta Dari:</span>
            <strong class="text-sm text-[#1C3026]">{{ props.couple.groomParents }}</strong>
          </div>
        </div>
      </div>

      <!-- Bride Card -->
      <div class="p-8 sm:p-10 rounded-3xl bg-white border border-[#E6DAC3] shadow-lg shadow-[#1C3026]/5 space-y-5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#DDA192]/15 to-transparent rounded-bl-full pointer-events-none" />
        <div class="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-[#DDA192] via-[#F3E5AB] to-[#D4AF37] p-1 shadow-md">
          <div class="w-full h-full rounded-full bg-[#FAF7F2] flex items-center justify-center text-4xl">
            👰🏻‍♀️
          </div>
        </div>
        <div class="space-y-2">
          <h3 class="text-2xl font-serif font-bold text-[#1C3026]">
            {{ props.couple.brideFullName }}
          </h3>
          <p class="text-xs text-[#8C6415] font-semibold tracking-wider uppercase font-serif">
            {{ props.couple.brideBio }}
          </p>
          <div class="pt-3 border-t border-[#E6DAC3]/60 text-xs text-[#1C3026]/70 leading-relaxed font-serif">
            <span class="text-[11px] text-[#8C6415] uppercase tracking-wider block">Putri Tercinta Dari:</span>
            <strong class="text-sm text-[#1C3026]">{{ props.couple.brideParents }}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
