<script setup lang="ts">
useSeoMeta({
  title: 'Dian Adi Nugroho | Web & Backend Developer Yogyakarta',
  description:
    'Portofolio profesional Dian Adi Nugroho - Web & Backend Developer dari Yogyakarta. Spesialisasi arsitektur REST API terproteksi, Laravel, Express.js, PostgreSQL, Oracle, Docker, dan ekosistem web modern.',
  ogTitle: 'Dian Adi Nugroho | Web & Backend Developer Yogyakarta',
  ogDescription:
    'Portofolio profesional Dian Adi Nugroho - Web & Backend Developer dari Yogyakarta. Spesialisasi arsitektur REST API terproteksi, Laravel, Express.js, PostgreSQL, Oracle, Docker, dan ekosistem web modern.',
  ogType: 'website',
  ogUrl: 'https://dianadi021.github.io',
  ogLocale: 'id_ID',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Dian Adi Nugroho | Web & Backend Developer',
  twitterDescription:
    'Portofolio profesional dan rekayasa sistem Dian Adi Nugroho. Spesialisasi backend, database enterprise, dan web modern.',
  author: 'Dian Adi Nugroho',
  robots: 'index, follow',
})
</script>

<template>
  <div class="py-8 sm:py-14 relative overflow-hidden space-y-16">
    <!-- Atmospheric Clouds (Ghibli Sky Feel) -->
    <div
      class="absolute top-12 left-[10%] w-72 h-36 bg-[#8ECAE6]/15 rounded-full blur-3xl pointer-events-none -z-10"
    ></div>
    <div
      class="absolute top-1/2 left-1/3 w-80 h-40 bg-[#219EBC]/10 rounded-full blur-3xl pointer-events-none -z-10"
    ></div>

    <!-- 1. HERO & FIELD NOTEBOOK SECTION -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <HomeHero />
        <HomeTerminal />
      </div>
    </section>

    <!-- 2. FOUR PILLARS OF CRAFTSMANSHIP -->
    <HomeMetrics />

    <!-- 3. WORK EXPERIENCE & REAL-WORLD DELIVERABLES -->
    <HomeExperience />

    <!-- 4. TECH STACK & TOOLING -->
    <HomeSkills />

    <!-- 5. PORTOFOLIO / PROYEK PILIHAN -->
    <HomeProjects />
  </div>
</template>
