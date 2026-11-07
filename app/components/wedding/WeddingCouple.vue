<script setup lang="ts">
import type { CoupleProfile } from '~/types/wedding'

const props = defineProps<{
  couple: CoupleProfile
}>()
</script>

<template>
  <section class="max-w-4xl mx-auto space-y-8 text-center">
    <div class="space-y-2">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8ECAE6]/20 text-[#023047] dark:text-[#8ECAE6]">
        <span>🌿</span>
        <span>Pasangan Mempelai</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-serif font-bold text-[#023047] dark:text-white">
        Maha Suci Allah yang Menciptakan Berpasang-pasangan
      </h2>
      <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya." (QS. Ar-Rum: 21)
      </p>
    </div>

    <!-- Couple Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <!-- Groom Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/40 dark:border-[#219EBC]/30 shadow-sm space-y-4 hover:-translate-y-1 transition-transform">
        <div class="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-[#219EBC] to-[#FB8500] p-1 shadow-md">
          <div class="w-full h-full rounded-full bg-slate-100 dark:bg-[#023047] flex items-center justify-center text-4xl">
            🤵🏻‍♂️
          </div>
        </div>
        <div class="space-y-1">
          <h3 class="text-2xl font-serif font-extrabold text-[#023047] dark:text-white">
            {{ props.couple.groomFullName }}
          </h3>
          <p class="text-xs text-[#219EBC] dark:text-[#8ECAE6] font-semibold">
            {{ props.couple.groomBio }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 pt-2 leading-relaxed">
            Putra dari: <br>
            <strong class="text-slate-700 dark:text-slate-200">{{ props.couple.groomParents }}</strong>
          </p>
        </div>
      </div>

      <!-- Bride Card -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/40 dark:border-[#219EBC]/30 shadow-sm space-y-4 hover:-translate-y-1 transition-transform">
        <div class="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-[#FFB703] to-[#FB8500] p-1 shadow-md">
          <div class="w-full h-full rounded-full bg-slate-100 dark:bg-[#023047] flex items-center justify-center text-4xl">
            👰🏻‍♀️
          </div>
        </div>
        <div class="space-y-1">
          <h3 class="text-2xl font-serif font-extrabold text-[#023047] dark:text-white">
            {{ props.couple.brideFullName }}
          </h3>
          <p class="text-xs text-[#FB8500] font-semibold">
            {{ props.couple.brideBio }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400 pt-2 leading-relaxed">
            Putri dari: <br>
            <strong class="text-slate-700 dark:text-slate-200">{{ props.couple.brideParents }}</strong>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
