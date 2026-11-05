<template>
  <section id="portofolio" class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 text-left">
    <div class="mb-6">
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-[#219EBC]">Proyek Pilihan</p>
      <h2 class="mt-2 text-2xl font-extrabold text-[#023047] dark:text-white sm:text-3xl">Portofolio</h2>
      <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
        Eksplorasi proyek dan alat bantu rekayasa keputusan yang saya rancang.
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- TOPSIS Calculator Card -->
      <NuxtLink
        to="/portofolio/topsis"
        class="group block overflow-hidden rounded-3xl border-2 border-[#8ECAE6]/50 bg-white p-7 shadow-xs transition hover:-translate-y-1 hover:border-[#219EBC] hover:shadow-lg dark:border-[#219EBC]/30 dark:bg-[#034363]"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <span
              class="inline-flex rounded-full bg-[#8ECAE6]/25 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#023047] dark:text-[#8ECAE6]"
            >
              Decision Support System
            </span>
            <h3 class="mt-4 text-xl font-bold text-[#023047] group-hover:text-[#219EBC] dark:text-white">
              Kalkulator TOPSIS
            </h3>
          </div>
          <span
            aria-hidden="true"
            class="text-2xl text-[#FB8500] transition-transform group-hover:translate-x-1"
          >
            ↗
          </span>
        </div>
        <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Aplikasi pengambilan keputusan multikriteria berbasis aljabar linier. Membandingkan
          alternatif dengan normalisasi vektor, bobot, solusi ideal, dan jarak Euclidean.
        </p>
        <div class="mt-5 flex flex-wrap gap-2">
          <span
            class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-[#023047] dark:text-slate-300"
          >
            TOPSIS
          </span>
          <span
            class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-[#023047] dark:text-slate-300"
          >
            Aljabar Linier
          </span>
          <span
            class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-[#023047] dark:text-slate-300"
          >
            TypeScript Strict
          </span>
        </div>
        <span class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#219EBC]">
          Buka kalkulator <span aria-hidden="true">→</span>
        </span>
      </NuxtLink>

      <!-- ATS CV Card -->
      <NuxtLink
        to="/mycv"
        class="group block overflow-hidden rounded-3xl border-2 border-[#8ECAE6]/50 bg-white p-7 shadow-xs transition hover:-translate-y-1 hover:border-[#FB8500] hover:shadow-lg dark:border-[#219EBC]/30 dark:bg-[#034363]"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <span
              class="inline-flex rounded-full bg-[#FB8500]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#FB8500]"
            >
              Curriculum Vitae
            </span>
            <h3 class="mt-4 text-xl font-bold text-[#023047] group-hover:text-[#FB8500] dark:text-white">
              Resume Standar ATS
            </h3>
          </div>
          <span
            aria-hidden="true"
            class="text-2xl text-[#219EBC] transition-transform group-hover:translate-x-1"
          >
            ↗
          </span>
        </div>
        <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Format resume ramah mesin parser pelamar kerja (Applicant Tracking System). Siap cetak langsung
          atau unduh format PDF bersih monokrom.
        </p>
        <div class="mt-5 flex flex-wrap gap-2">
          <span
            class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-[#023047] dark:text-slate-300"
          >
            ATS-Friendly
          </span>
          <span
            class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-[#023047] dark:text-slate-300"
          >
            Printable CSS
          </span>
          <span
            class="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-[#023047] dark:text-slate-300"
          >
            PDF Export
          </span>
        </div>
        <span class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#FB8500]">
          Lihat resume <span aria-hidden="true">→</span>
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
