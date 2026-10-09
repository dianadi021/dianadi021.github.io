<script setup lang="ts">
useSeoMeta({
  title: 'Curriculum Vitae | Dian Adi Nugroho',
  description: 'Biodata lengkap, riwayat pendidikan, sertifikasi, dan pengalaman profesional Dian Adi Nugroho.',
  ogTitle: 'Curriculum Vitae | Dian Adi Nugroho',
  ogDescription: 'Biodata lengkap, riwayat pendidikan, sertifikasi, dan pengalaman profesional Dian Adi Nugroho.'
})

const { $dayjs } = useNuxtApp()
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
    <!-- Breadcrumb / Back Link -->
    <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
      <NuxtLink to="/" class="hover:text-[#219EBC] flex items-center gap-1 transition">
        <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4" />
        Kembali ke Beranda
      </NuxtLink>
      <span>/</span>
      <span class="text-slate-800 dark:text-slate-200 font-medium">Curriculum Vitae</span>
    </div>

    <!-- CV Header Card -->
    <div class="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/40 dark:border-[#219EBC]/30 shadow-md space-y-6 text-left">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-dashed border-[#8ECAE6]/30 dark:border-[#219EBC]/30 pb-6">
        <div>
          <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#8ECAE6]/25 dark:bg-[#023047] text-[#023047] dark:text-[#8ECAE6] border border-[#219EBC]/30 mb-2">
            🌱 Lembar Khusus Riwayat Hidup
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-[#023047] dark:text-white">
            Curriculum Vitae
          </h1>
          <p class="text-slate-600 dark:text-slate-300 mt-1">
            Dian Adi Nugroho · Web Developer / Backend Craftsman
          </p>
        </div>
        <div class="flex items-center gap-3">
          <a
            href="mailto:contactmedianadi021@gmail.com"
            class="px-5 py-2.5 rounded-2xl text-sm font-bold bg-[#FB8500] hover:bg-[#FB8500]/90 text-white transition flex items-center gap-2 shadow-sm"
          >
            <Icon name="heroicons:envelope-20-solid" class="w-4 h-4 text-[#FFB703]" />
            <span>Kirim Surat</span>
          </a>
        </div>
      </div>

      <!-- Notice card -->
      <div class="p-4 rounded-2xl bg-[#8ECAE6]/15 dark:bg-[#023047]/60 border border-[#219EBC]/30 text-xs sm:text-sm text-slate-700 dark:text-slate-200 space-y-2">
        <div class="flex items-center gap-2 font-bold text-[#023047] dark:text-[#8ECAE6]">
          <span class="text-base">📜</span>
          <span>Halaman Catatan Biodata Lengkap (/mycv)</span>
        </div>
        <p>
          Halaman ini disiapkan khusus sebagai wadah riwayat hidup mendalam: latar belakang akademis, linimasa karir terperinci, dokumen sertifikasi, dan pencapaian profesional.
        </p>
      </div>

      <!-- Quick Summary -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div class="p-5 rounded-2xl border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 bg-[#faf8f5] dark:bg-[#023047]/40 space-y-2.5">
          <h3 class="text-xs font-bold uppercase tracking-wider text-[#219EBC] dark:text-[#8ECAE6]">Biodata Pengrajin</h3>
          <ul class="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Nama:</strong> Dian Adi Nugroho</li>
            <li><strong>Domisili:</strong> Kab. Sleman, D.I. Yogyakarta</li>
            <li><strong>Email:</strong> contactmedianadi021@gmail.com</li>
            <li><strong>Telepon/WhatsApp:</strong> +62851-7999-7321</li>
            <li><strong>Domain Publik:</strong> dianadi021.github.io</li>
          </ul>
        </div>
        <div class="p-5 rounded-2xl border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 bg-[#faf8f5] dark:bg-[#023047]/40 space-y-2.5">
          <h3 class="text-xs font-bold uppercase tracking-wider text-[#FB8500]">Spesialisasi & Fokus</h3>
          <ul class="text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Backend:</strong> Laravel, PHP, CodeIgniter, Express.js</li>
            <li><strong>Basis Data:</strong> PostgreSQL, Oracle, MongoDB, MySQL</li>
            <li><strong>DevOps & Infra:</strong> Docker, Ubuntu Linux, Git, Postman</li>
            <li><strong>Frontend:</strong> Vue.js 3, Nuxt 4, TypeScript, Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
