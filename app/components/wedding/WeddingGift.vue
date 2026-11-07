<script setup lang="ts">
import type { DigitalGiftAccount } from '~/types/wedding'

const props = defineProps<{
  accounts: DigitalGiftAccount[]
}>()

const { $swal } = useNuxtApp()
const { copy } = useClipboard()

const copyAccount = async (accountNumber: string, bankName: string) => {
  try {
    await copy(accountNumber)
    if ($swal) {
      $swal.fire({
        icon: 'success',
        title: 'Nomor Rekening Tersalin! 💳',
        text: `${bankName}: ${accountNumber} berhasil disalin ke clipboard.`,
        timer: 2000,
        showConfirmButton: false,
        confirmButtonColor: '#219EBC'
      })
    }
  } catch {
    // Fallback
  }
}
</script>

<template>
  <section class="max-w-3xl mx-auto space-y-6 text-center">
    <div class="space-y-2">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8ECAE6]/20 text-[#023047] dark:text-[#8ECAE6]">
        <span>🎁</span>
        <span>Amplop Digital & Tanda Kasih</span>
      </div>
      <h2 class="text-3xl font-serif font-bold text-[#023047] dark:text-white">
        Kado & Doa Restu
      </h2>
      <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
        Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital:
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="acc in props.accounts"
        :key="acc.accountNumber"
        class="p-6 rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/40 dark:border-[#219EBC]/30 shadow-sm text-center space-y-3"
      >
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#023047] text-[#FFB703] font-bold text-lg shadow-xs">
          💳
        </div>
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-[#219EBC] dark:text-[#8ECAE6] block">
            {{ acc.bankName }}
          </span>
          <span class="text-lg font-mono font-extrabold text-[#023047] dark:text-white block tracking-wider pt-1">
            {{ acc.accountNumber }}
          </span>
          <span class="text-xs text-slate-500 dark:text-slate-400 block">
            a.n {{ acc.holderName }}
          </span>
        </div>

        <button
          type="button"
          class="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FB8500] hover:bg-[#FB8500]/90 text-white text-xs font-bold transition shadow-xs"
          @click="copyAccount(acc.accountNumber, acc.bankName)"
        >
          <Icon name="heroicons:clipboard-document-check-20-solid" class="w-4 h-4" />
          <span>Salin Nomor Rekening</span>
        </button>
      </div>
    </div>
  </section>
</template>
