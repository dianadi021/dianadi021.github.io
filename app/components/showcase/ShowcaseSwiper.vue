<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { A11y, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const swiperModules = [A11y, Navigation, Pagination]
const swiperSlides = [
  { title: 'SSR siap pakai', description: 'Render HTML di server untuk konten awal yang cepat dan mudah diindeks.', icon: 'heroicons:server-20-solid' },
  { title: 'CSR fleksibel', description: 'Gunakan interaksi sisi client saat halaman atau komponennya membutuhkannya.', icon: 'heroicons:computer-desktop-20-solid' },
  { title: 'Swiper responsif', description: 'Atur jumlah slide per tampilan dan navigasi yang nyaman untuk layar kecil.', icon: 'heroicons:device-phone-mobile-20-solid' },
  { title: 'TypeScript', description: 'Integrasikan komponen carousel dengan aplikasi Nuxt berbasis TypeScript.', icon: 'heroicons:code-bracket-20-solid' }
]
</script>

<template>
  <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div>
        <h2 class="text-lg font-bold">Swiper Carousel</h2>
        <p class="text-xs text-slate-500">Carousel responsif dengan navigasi, pagination, dan aksesibilitas.</p>
      </div>
      <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">swiper/vue</span>
    </div>

    <Swiper
      :modules="swiperModules"
      :slides-per-view="1"
      :space-between="16"
      :navigation="true"
      :pagination="{ clickable: true }"
      :breakpoints="{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }"
      :a11y="{ enabled: true }"
      class="showcase-swiper"
    >
      <SwiperSlide v-for="slide in swiperSlides" :key="slide.title">
        <article class="h-full min-h-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-5 flex flex-col gap-3">
          <Icon :name="slide.icon" class="w-7 h-7 text-primary" />
          <h3 class="font-semibold">{{ slide.title }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ slide.description }}</p>
        </article>
      </SwiperSlide>
    </Swiper>
  </section>
</template>
