<script setup lang="ts">
useSeoMeta({
  title: 'Showcase Library | Nuxt Frontend Template',
  description: 'Showcase package dan fitur pada template Nuxt 4: Tailwind CSS, Pinia, VueUse, dan lainnya.',
  ogTitle: 'Showcase Library | Nuxt Frontend Template',
  ogDescription: 'Jelajahi package dan fitur yang terintegrasi pada template Nuxt 4.',
  ogType: 'website',
  twitterCard: 'summary'
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
    <!-- Header Showcase -->
    <header class="text-center space-y-3">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
        <Icon name="heroicons:sparkles-20-solid" class="w-4 h-4 text-warning" />
        Halaman Rute /about
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
        Showcase Seluruh Library & Package
      </h1>
      <p class="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400">
        Semua fitur di bawah ini dijalankan langsung oleh library package yang telah terpasang di template Nuxt ini.
      </p>
    </header>

    <!-- 1. Swiper Carousel Showcase -->
    <ShowcaseSwiper />

    <!-- 2. Tailwind CSS & Format Warna Bootstrap -->
    <ShowcaseTailwindColors />

    <!-- 3. Headless UI Components -->
    <ShowcaseHeadlessUi />

    <!-- 4. VueUse Utilities & Nuxt Icon -->
    <ShowcaseVueUse />

    <!-- 5. Pinia State Management -->
    <ShowcasePinia />

    <!-- 6. SweetAlert2 & Day.js Utilities -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ShowcaseSweetAlert />
      <ShowcaseDayjs />
    </section>

    <!-- 7. Zod Form Validation -->
    <ShowcaseZodForm />

    <!-- 8. Axios HTTP Client & Internal Nitro Route -->
    <ShowcaseAxios />
  </div>
</template>
