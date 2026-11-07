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
        confirmButtonColor: '#1C3026',
        background: '#FAF7F2',
        color: '#1C3026'
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
      <div class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-serif font-semibold bg-[#E8D5CE]/40 text-[#1C3026] border border-[#C5A880]/30 shadow-xs">
        <span>🎁</span>
        <span>Amplop Digital & Tanda Kasih</span>
      </div>
      <h2 class="text-3xl font-serif font-bold text-[#1C3026]">
        Kado & Doa Restu
      </h2>
      <p class="text-xs sm:text-sm text-[#1C3026]/75 font-serif max-w-md mx-auto">
        Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital:
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="acc in props.accounts"
        :key="acc.accountNumber"
        class="p-6 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#E6DAC3] shadow-md shadow-[#C5A880]/10 text-center space-y-4 hover:border-[#D4AF37]/60 transition"
      >
        <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1C3026] to-[#2d4a3c] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xs text-xl">
          💳
        </div>
        <div>
          <span class="text-xs font-serif font-bold uppercase tracking-widest text-[#C5A880] block">
            {{ acc.bankName }}
          </span>
          <span class="text-xl font-mono font-extrabold text-[#1C3026] block tracking-wider pt-1">
            {{ acc.accountNumber }}
          </span>
          <span class="text-xs text-[#1C3026]/70 font-serif block pt-0.5">
            a.n {{ acc.holderName }}
          </span>
        </div>

        <button
          type="button"
          class="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1C3026] to-[#2d4a3c] hover:opacity-95 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-serif font-bold transition shadow-xs"
          @click="copyAccount(acc.accountNumber, acc.bankName)"
        >
          <Icon name="heroicons:clipboard-document-check-20-solid" class="w-4 h-4" />
          <span>Salin Nomor Rekening</span>
        </button>
      </div>
    </div>
  </section>
</template>
