<script setup lang="ts">
import type { GuestContext, CoupleProfile, WeddingEventSchedule, DigitalGiftAccount } from '~/types/wedding'

useSeoMeta({
  title: 'The Wedding Celebration of Romeo & Juliet | Undangan Pernikahan Digital',
  description: 'Undangan pernikahan digital resmi Romeo & Juliet. Minggu, 20 Desember 2026 di Sleman, D.I. Yogyakarta.',
  ogTitle: 'The Wedding of Romeo & Juliet',
  ogDescription: 'Kami mengundang Anda untuk merayakan momen bahagia pernikahan kami.',
  ogType: 'website'
})

const route = useRoute()

// Sanitasi dan parsing parameter URL (?to=Nama+Tamu) - Wedding Invariant 3
const rawGuestParam = route.query.to
const parsedGuestName = computed(() => {
  if (typeof rawGuestParam === 'string' && rawGuestParam.trim() !== '') {
    // Sanitasi sederhana mencegah injeksi karakter HTML
    return rawGuestParam.trim().replace(/[<>"/\\&]/g, '')
  }
  return 'Tamu Undangan'
})

const isVipGuest = computed(() => {
  return route.query.vip === 'true' || route.query.vip === '1'
})

const guestContext = computed<GuestContext>(() => ({
  guestName: parsedGuestName.value,
  isVip: isVipGuest.value,
  invitationCode: typeof route.query.code === 'string' ? route.query.code : undefined
}))

const isOpened = ref(false)
const audioTrigger = ref(false)

const handleOpenInvitation = () => {
  isOpened.value = true
  audioTrigger.value = true
}

// Data Dummy Realistis Pasangan & Acara
const coupleData: CoupleProfile = {
  groomName: 'Romeo',
  groomFullName: 'Romeo Montague, S.Kom.',
  groomBio: 'Software Engineer & Tech Enthusiast',
  groomParents: 'Bpk. Lord Montague & Ibu Lady Montague',
  brideName: 'Juliet',
  brideFullName: 'Juliet Capulet, S.Ds.',
  brideBio: 'UI/UX Designer & Botanical Illustrator',
  brideParents: 'Bpk. Lord Capulet & Ibu Lady Capulet'
}

const eventSchedule: WeddingEventSchedule[] = [
  {
    id: 'ev-akad',
    title: 'Akad Nikah',
    date: 'Minggu, 20 Desember 2026',
    time: 'Pukul 08.00 - 10.00 WIB',
    venue: 'Masjid Agung Sleman',
    address: 'Jl. Parasamya, Beran Lor, Tridadi, Kec. Sleman, Kabupaten Sleman, D.I. Yogyakarta 55511',
    mapUrl: 'https://maps.google.com/?q=Masjid+Agung+Sleman',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Akad+Nikah+Romeo+%26+Juliet&dates=20261220T010000Z/20261220T030000Z'
  },
  {
    id: 'ev-resepsi',
    title: 'Resepsi Pernikahan',
    date: 'Minggu, 20 Desember 2026',
    time: 'Pukul 11.00 - 14.00 WIB',
    venue: 'Grand Pacific Hall Yogyakarta',
    address: 'Jl. Magelang KM. 4.5, Kutu Dukuh, Sinduadi, Kec. Mlati, Kabupaten Sleman, D.I. Yogyakarta 55284',
    mapUrl: 'https://maps.google.com/?q=Grand+Pacific+Hall+Yogyakarta',
    calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pernikahan+Romeo+%26+Juliet&dates=20261220T040000Z/20261220T070000Z'
  }
]

const giftAccounts: DigitalGiftAccount[] = [
  {
    bankName: 'Bank Central Asia (BCA)',
    accountNumber: '8910-2345-67',
    holderName: 'Romeo Montague'
  },
  {
    bankName: 'Bank Mandiri',
    accountNumber: '137-00-1928374-1',
    holderName: 'Juliet Capulet'
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#faf8f5] dark:bg-[#023047] text-[#023047] dark:text-[#f8f9fa] selection:bg-[#FFB703]/30 selection:text-[#023047]">
    <!-- 1. Cover Gate Amplop (Modal Layar Penuh) -->
    <WeddingCoverGate
      :guest="guestContext"
      :is-opened="isOpened"
      @open="handleOpenInvitation"
    />

    <!-- 2. Floating Audio Player (Autoplay Compliance) -->
    <WeddingAudioPlayer
      :auto-play-trigger="audioTrigger"
    />

    <!-- 3. Konten Utama Undangan (Vertical Scrollytelling) -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 sm:space-y-24">
      <!-- Back to Portfolio Floating Bar -->
      <div class="flex items-center justify-between text-xs text-slate-500 border-b border-[#8ECAE6]/40 dark:border-[#219EBC]/30 pb-4">
        <NuxtLink to="/" class="inline-flex items-center gap-1.5 font-bold hover:text-[#219EBC] transition">
          <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4" />
          <span>Kembali ke Portofolio Dian Adi</span>
        </NuxtLink>
        <span class="inline-flex items-center gap-1 text-[#FB8500] font-semibold">
          <Icon name="heroicons:sparkles-20-solid" class="w-4 h-4" />
          Template Undangan Pernikahan Nuxt 4
        </span>
      </div>

      <!-- Hero Header Section -->
      <header class="text-center space-y-4 pt-4">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#8ECAE6]/20 text-[#023047] dark:text-[#8ECAE6]">
          <span>🕊️</span>
          <span>Walimatul 'Ursy</span>
        </div>
        <h1 class="text-4xl sm:text-6xl font-serif font-black tracking-tight text-[#023047] dark:text-white">
          Romeo <span class="text-[#FFB703]">&</span> Juliet
        </h1>
        <p class="text-sm sm:text-base font-medium text-slate-600 dark:text-slate-300">
          Minggu, 20 Desember 2026 · Sleman, D.I. Yogyakarta
        </p>
      </header>

      <!-- Section Mempelai -->
      <WeddingCouple :couple="coupleData" />

      <!-- Section Hitung Mundur -->
      <WeddingCountdown target-date="2026-12-20T08:00:00+07:00" />

      <!-- Section Rangkaian Acara & Lokasi -->
      <WeddingEventSchedule :events="eventSchedule" />

      <!-- Section RSVP & Buku Tamu -->
      <WeddingRsvp :initial-guest-name="parsedGuestName" />

      <!-- Section Amplop Digital -->
      <WeddingGift :accounts="giftAccounts" />

      <!-- Footer Ucapan Penutup -->
      <footer class="text-center space-y-3 pt-12 border-t border-[#8ECAE6]/40 dark:border-[#219EBC]/20">
        <p class="text-sm font-serif italic text-slate-600 dark:text-slate-300">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <p class="text-xs font-bold text-[#023047] dark:text-[#8ECAE6] uppercase tracking-widest pt-2">
          KAMI YANG BERBAHAGIA, KELUARGA BESAR MONTAGUE & CAPULET
        </p>
      </footer>
    </main>
  </div>
</template>
