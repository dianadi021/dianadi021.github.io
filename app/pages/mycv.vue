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

    <!-- CV Header Placeholder -->
    <div class="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-6">
        <div>
          <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#219EBC]/10 text-[#219EBC] dark:text-[#8ECAE6] mb-2">
            Route Khusus Biodata & Riwayat
          </span>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">
            Curriculum Vitae
          </h1>
          <p class="text-slate-600 dark:text-slate-300 mt-1">
            Dian Adi Nugroho · Web Developer / Backend Developer
          </p>
        </div>
        <div class="flex items-center gap-3">
          <a
            href="mailto:contactmedianadi021@gmail.com"
            class="px-4 py-2 rounded-xl text-sm font-semibold bg-[#FB8500] hover:bg-[#FB8500]/90 text-white transition flex items-center gap-2 shadow-sm"
          >
            <Icon name="heroicons:envelope-20-solid" class="w-4 h-4" />
            Hubungi Saya
          </a>
        </div>
      </div>

      <!-- Notice card -->
      <div class="p-4 rounded-xl bg-[#8ECAE6]/10 border border-[#219EBC]/30 text-sm text-slate-700 dark:text-slate-300 space-y-2">
        <div class="flex items-center gap-2 font-semibold text-[#023047] dark:text-[#8ECAE6]">
          <Icon name="heroicons:information-circle-20-solid" class="w-5 h-5 text-[#219EBC]" />
          <span>Halaman Detail Biodata (/mycv)</span>
        </div>
        <p>
          Halaman ini disiapkan khusus untuk memuat rincian biodata lengkap, latar belakang akademis, timeline pengalaman karir, dan arsip sertifikasi.
        </p>
      </div>

      <!-- Quick Summary -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800/60 space-y-2">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Informasi Pribadi</h3>
          <ul class="text-sm space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Nama:</strong> Dian Adi Nugroho</li>
            <li><strong>Domisili:</strong> Kab. Sleman, D.I. Yogyakarta</li>
            <li><strong>Email:</strong> contactmedianadi021@gmail.com</li>
            <li><strong>Telepon/WhatsApp:</strong> +62851-7999-7321</li>
            <li><strong>Domain:</strong> dianadi021.github.io</li>
          </ul>
        </div>
        <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800/60 space-y-2">
          <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Spesialisasi & Fokus</h3>
          <ul class="text-sm space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Backend:</strong> Laravel, PHP, CodeIgniter, Express.js</li>
            <li><strong>Database:</strong> PostgreSQL, MySQL, MongoDB, Oracle</li>
            <li><strong>DevOps & Tools:</strong> Docker, Ubuntu Linux, Git, Postman</li>
            <li><strong>Frontend:</strong> Vue.js, TypeScript, Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
