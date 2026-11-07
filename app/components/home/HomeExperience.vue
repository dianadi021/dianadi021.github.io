<script setup lang="ts">
const experiences = [
  {
    company: 'PT Medika Digital Nusantara',
    role: 'Web Developer',
    type: 'Full-time · Shifting Schedules',
    period: 'Pengalaman Produksi',
    location: 'Sleman, D.I. Yogyakarta',
    tag: 'Healthcare Technology',
    badgeColor: '#023047',
    summary:
      'Bertanggung jawab atas pemeliharaan dan pengembangan sistem informasi manajemen rumah sakit serta infrastruktur backend berbasis Laravel, PHP, dan basis data Oracle skala enterprise.',
    deliverables: [
      'Memantau server harian (server monitoring 24/7) secara konsisten dan responsif terhadap kendala kritis di bawah jadwal kerja shifting.',
      'Melakukan penanganan dan perbaikan bug (rapid bug fixing) dengan analisis akar masalah secara cermat pada modul-modul operasional medis.',
      'Mengembangkan fitur-fitur baru menggunakan Laravel & PHP yang terhubung langsung dengan enterprise database Oracle.',
      'Mengelola kontainerisasi lingkungan kerja menggunakan Docker pada server Ubuntu Linux guna menjamin konsistensi saat rilis.',
      'Merancang arsitektur kueri efisien untuk mencegah kemacetan saat lonjakan data antrian pasien dan rekam medis.',
    ],
    tech: [
      'Laravel',
      'PHP',
      'Oracle Database',
      'Docker',
      'Ubuntu Linux',
      'Server Monitoring',
      'Bug Fixing',
    ],
  },
  {
    company: 'Zettabyte Pte Ltd',
    role: 'Backend Developer (Trainee)',
    type: 'Internship / Trainee Program',
    period: 'Pengalaman Rekayasa API',
    location: 'Yogyakarta',
    tag: 'Software Engineering',
    badgeColor: '#219EBC',
    summary:
      'Fokus pada rekayasa backend, perancangan skema basis data ganda (relasional & non-relasional), serta implementasi arsitektur keamanan REST API berstandar industri.',
    deliverables: [
      'Merancang skema basis data relasional (PostgreSQL) dan skema dokumen (MongoDB) yang teroptimasi untuk kebutuhan data multi-tenant.',
      'Mengimplementasikan lapisan keamanan RESTful API menggunakan otentikasi JSON Web Token (JWT) lengkap dengan validasi request ketat.',
      'Mengembangkan endpoint API modular dengan Express.js / Node.js yang mudah dipelihara dan tahan terhadap anomali payload.',
      'Menyusun skenario pengujian komprehensif menggunakan Postman collection untuk menjamin stabilitas setiap rute API.',
    ],
    tech: [
      'Express.js',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'JWT Auth',
      'REST API Security',
      'Postman',
    ],
  },
  {
    company: 'Proyek Rekayasa Mandiri & Open Source',
    role: 'Lead Architect & Maintainer',
    type: 'Portfolio & System Automation',
    period: '2026 - Berjalan',
    location: 'dianadi021.github.io',
    tag: 'Modern Web & Automation',
    badgeColor: '#FB8500',
    summary:
      'Pengembangan platform portofolio modern dengan rendering hibrida (SSR & SSG) serta skrip otomasi sistem server Ubuntu.',
    deliverables: [
      'Membangun arsitektur frontend dengan Nuxt 4, Vue 3, Pinia, dan Tailwind CSS tanpa adanya siklus impor (zero import cycle terverifikasi Graphify).',
      'Mengonfigurasi pipeline GitHub Actions untuk otomatisasi prerender dan deployment statis ke domain dianadi021.github.io.',
      'Menulis skrip otomasi berbasis Lua dan Bash Shell untuk pemantauan ambang batas memori/CPU server, log rotation, dan penjadwalan backup.',
    ],
    tech: [
      'Nuxt 4',
      'Vue.js 3',
      'TypeScript',
      'Tailwind CSS',
      'Lua',
      'Bash Shell',
      'Docker',
      'GitLab / GitHub Actions',
    ],
  },
]
</script>

<template>
  <section
    id="experience"
    class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24 text-left"
  >
    <div
      class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-dashed border-[#8ECAE6]/40 dark:border-[#219EBC]/30 pb-6"
    >
      <div>
        <div class="flex items-center gap-2">
          <span class="text-xl">🗺️</span>
          <span class="text-xs font-bold uppercase tracking-wider text-[#219EBC]"
            >Rekam Jejak & Karya Nyata</span
          >
        </div>
        <h2 class="text-3xl font-extrabold text-[#023047] dark:text-white mt-1">
          Riwayat Industri & Jobdesk Terperinci
        </h2>
      </div>
      <NuxtLink
        to="/mycv"
        class="text-xs font-bold text-[#FB8500] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
      >
        <span>Buka Format ATS CV (/mycv)</span>
        <Icon name="heroicons:arrow-right-20-solid" class="w-4 h-4" />
      </NuxtLink>
    </div>

    <div class="space-y-8">
      <article
        v-for="(exp, idx) in experiences"
        :key="idx"
        class="p-7 sm:p-8 rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/40 dark:border-[#219EBC]/30 shadow-sm hover:shadow-md transition space-y-6"
      >
        <!-- Top Row: Role, Company, Location -->
        <div
          class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#8ECAE6]/30 dark:border-[#219EBC]/30 pb-5"
        >
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-[#023047] text-[#8ECAE6]">
                {{ exp.tag }}
              </span>
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {{ exp.type }}
              </span>
            </div>
            <h3 class="text-2xl font-extrabold text-[#023047] dark:text-white">
              {{ exp.role }}
            </h3>
            <p class="text-sm font-bold text-[#219EBC] dark:text-[#8ECAE6]">
              {{ exp.company }}
            </p>
          </div>
          <div
            class="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-right space-y-1"
          >
            <div>{{ exp.location }}</div>
            <div class="text-[#FB8500] font-semibold">{{ exp.period }}</div>
          </div>
        </div>

        <!-- Summary Paragraph -->
        <p
          class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium"
        >
          {{ exp.summary }}
        </p>

        <!-- Detailed Jobdesk & Deliverables List -->
        <div class="space-y-2 pt-1">
          <h4
            class="text-xs font-bold uppercase tracking-wider text-[#023047] dark:text-[#8ECAE6]"
          >
            Tanggung Jawab & Hasil Rekayasa (Jobdesk & Proyek):
          </h4>
          <ul class="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li
              v-for="(task, tIdx) in exp.deliverables"
              :key="tIdx"
              class="flex items-start gap-2.5"
            >
              <span class="text-[#219EBC] dark:text-[#8ECAE6] text-sm shrink-0">🍃</span>
              <span>{{ task }}</span>
            </li>
          </ul>
        </div>

        <!-- Tech Stack Tags -->
        <div class="pt-4 border-t border-[#8ECAE6]/30 dark:border-[#219EBC]/30">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="t in exp.tech"
              :key="t"
              class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#faf8f5] dark:bg-[#023047] text-[#023047] dark:text-slate-200 border border-[#8ECAE6]/30"
            >
              {{ t }}
            </span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
