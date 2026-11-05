<script setup lang="ts">
const { $swal } = useNuxtApp()

const copyEmail = async () => {
  const email = 'contactmedianadi021@gmail.com'
  try {
    await navigator.clipboard.writeText(email)
    if ($swal) {
      $swal.fire({
        title: 'Alamat Surat Tersalin ✉️',
        text: `${email} telah tersimpan di clipboard Anda. Siap untuk kolaborasi!`,
        icon: 'success',
        confirmButtonColor: '#219EBC',
        background: '#faf8f5',
        color: '#023047',
        timer: 3500,
        timerProgressBar: true,
      })
    }
  } catch {
    if ($swal) {
      $swal.fire({
        title: 'Alamat Email',
        text: email,
        icon: 'info',
        confirmButtonColor: '#219EBC',
      })
    }
  }
}
</script>

<template>
  <div class="lg:col-span-7 space-y-6 text-left">
    <!-- Availability Badge -->
    <div
      class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#8ECAE6]/25 dark:bg-[#034363] text-[#023047] dark:text-[#8ECAE6] border border-[#219EBC]/40 shadow-xs"
    >
      <span class="text-sm">🍃</span>
      <span>Tersedia untuk Peran Rekayasa Backend & Web Development</span>
    </div>

    <!-- Hero Headline -->
    <div class="space-y-3">
      <h1
        class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#023047] dark:text-white leading-[1.18]"
      >
        Merajut Sistem <br />
        <span
          class="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#219EBC] via-[#023047] to-[#FB8500] dark:from-[#8ECAE6] dark:via-[#219EBC] dark:to-[#FFB703]"
        >
          Backend yang Tenang
          <svg
            class="absolute -bottom-2 left-0 w-full h-3 text-[#FFB703] opacity-80"
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
          >
            <path
              d="M0,7 Q25,12 50,7 T100,7"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </span>
        <br />
        namun Kokoh & Skalabel.
      </h1>
      <p
        class="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed pt-1"
      >
        Saya
        <strong class="text-[#023047] dark:text-[#8ECAE6] font-bold">Dian Adi Nugroho</strong>
        — Web & Backend Developer dari Yogyakarta. Berpengalaman merajut keandalan sistem
        backend berbasis Laravel, Express.js, basis data enterprise (Oracle, PostgreSQL,
        MongoDB), dan otomasi kontainer Docker.
      </p>
    </div>

    <!-- Signature Highlights (Parchment Tags) -->
    <div class="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium">
      <span
        class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs"
      >
        🌾 Laravel & PHP
      </span>
      <span
        class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs"
      >
        🌊 PostgreSQL & Oracle DB
      </span>
      <span
        class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs"
      >
        ⚓ Docker & Ubuntu Linux
      </span>
      <span
        class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs"
      >
        ✨ Express.js & TypeScript
      </span>
    </div>

    <!-- Call to Action Buttons -->
    <div class="flex flex-wrap items-center gap-3.5 pt-3">
      <a
        href="#experience"
        class="px-6 py-3.5 rounded-2xl font-bold text-white bg-[#FB8500] hover:bg-[#FB8500]/90 transition shadow-md shadow-[#FB8500]/25 flex items-center gap-2 text-sm hover:-translate-y-0.5"
      >
        <Icon name="heroicons:briefcase-20-solid" class="w-4 h-4 text-[#FFB703]" />
        <span>Lihat Riwayat Industri</span>
      </a>

      <NuxtLink
        to="/mycv"
        class="px-5 py-3.5 rounded-2xl font-bold text-[#023047] dark:text-[#8ECAE6] bg-white/90 dark:bg-[#034363] hover:bg-[#8ECAE6]/20 border border-[#219EBC]/40 transition flex items-center gap-2 text-sm shadow-xs hover:-translate-y-0.5"
      >
        <Icon name="heroicons:document-text-20-solid" class="w-4 h-4 text-[#219EBC]" />
        <span>Curriculum Vitae ATS (/mycv)</span>
      </NuxtLink>

      <button
        type="button"
        @click="copyEmail"
        class="px-4 py-3.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#219EBC] dark:hover:text-[#8ECAE6] hover:bg-[#8ECAE6]/15 transition flex items-center gap-1.5"
        title="Salin alamat email"
      >
        <Icon name="heroicons:envelope-20-solid" class="w-4 h-4 text-[#FB8500]" />
        <span>Salin Email</span>
      </button>
    </div>

    <!-- Contact Coordinates -->
    <div
      class="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 dark:text-slate-400"
    >
      <span class="flex items-center gap-1.5">
        <Icon name="heroicons:map-pin-20-solid" class="w-4 h-4 text-[#FB8500]" />
        <span>Kab. Sleman, D.I. Yogyakarta</span>
      </span>
      <span>•</span>
      <a
        href="https://github.com/dianadi021"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:text-[#219EBC] flex items-center gap-1 transition"
      >
        <Icon name="simple-icons:github" class="w-3.5 h-3.5" />
        <span>dianadi021</span>
      </a>
      <span>•</span>
      <a
        href="#experience"
        class="text-[#219EBC] hover:underline font-semibold flex items-center gap-1"
      >
        <span>Lihat Portofolio</span>
        <span>↓</span>
      </a>
    </div>
  </div>
</template>
