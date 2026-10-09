<script setup lang="ts">
useSeoMeta({
  title: 'Dian Adi Nugroho | Web & Backend Developer Yogyakarta',
  description: 'Portofolio profesional Dian Adi Nugroho - Web & Backend Developer dari Yogyakarta. Spesialisasi arsitektur REST API terproteksi, Laravel, Express.js, PostgreSQL, Oracle, Docker, dan ekosistem web modern.',
  ogTitle: 'Dian Adi Nugroho | Web & Backend Developer Yogyakarta',
  ogDescription: 'Portofolio profesional Dian Adi Nugroho - Web & Backend Developer dari Yogyakarta. Spesialisasi arsitektur REST API terproteksi, Laravel, Express.js, PostgreSQL, Oracle, Docker, dan ekosistem web modern.',
  ogType: 'website',
  ogUrl: 'https://dianadi021.github.io',
  ogLocale: 'id_ID',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Dian Adi Nugroho | Web & Backend Developer',
  twitterDescription: 'Portofolio profesional dan rekayasa sistem Dian Adi Nugroho. Spesialisasi backend, database enterprise, dan web modern.',
  author: 'Dian Adi Nugroho',
  robots: 'index, follow'
})

const { $dayjs, $swal } = useNuxtApp()

// Real-time formatted date using dayjs locale
const currentTime = computed(() => {
  return $dayjs().format('dddd, DD MMMM YYYY · HH:mm:ss')
})

// Skill category tabs
const activeTab = ref<'all' | 'backend' | 'database' | 'devops' | 'frontend'>('all')

const skills = [
  // Mesin Backend & Skrip (Termasuk TypeScript dan JavaScript)
  { name: 'Laravel', category: 'backend', role: 'Full-featured Backend Framework', icon: 'logos:laravel', note: 'Arsitektur MVC & Keandalan Layanan' },
  { name: 'PHP', category: 'backend', role: 'Bahasa Inti Server-Side', icon: 'logos:php', note: 'OOP, Composer, Standar PSR' },
  { name: 'Express.js', category: 'backend', role: 'Minimalist Node.js Framework', icon: 'logos:express', note: 'RESTful API & Middleware Terisolasi' },
  { name: 'Node.js', category: 'backend', role: 'JavaScript Runtime Environment', icon: 'logos:nodejs-icon', note: 'Event-driven Asynchronous IO' },
  { name: 'TypeScript', category: 'backend', role: 'Typed JavaScript Superscript', icon: 'logos:typescript-icon', note: 'Keamanan Tipe Statis & Refactoring Aman' },
  { name: 'JavaScript', category: 'backend', role: 'Bahasa Pemrograman Dinamis', icon: 'logos:javascript', note: 'ES6+, Asynchronous Logic & Event Loop' },
  { name: 'CodeIgniter', category: 'backend', role: 'Lightweight PHP Framework', icon: 'logos:codeigniter-icon', note: 'Pengembangan Cepat & Delivery Praktis' },
  { name: 'Lua', category: 'backend', role: 'Bahasa Skrip Tertanam & Otomasi', icon: 'logos:lua', note: 'Skrip Otomasi Server & Penjadwalan' },

  // Basis Data & Penyimpanan
  { name: 'PostgreSQL', category: 'database', role: 'Relational Database Terpercaya', icon: 'logos:postgresql', note: 'Integritas Relasi ACID & Kueri Lanjut' },
  { name: 'Oracle Database', category: 'database', role: 'Enterprise Database System', icon: 'logos:oracle', note: 'Data Rumah Sakit & Transaksi Kritis' },
  { name: 'MySQL', category: 'database', role: 'Relational Database Populer', icon: 'logos:mysql-icon', note: 'Optimasi Kueri & Relasi Multi-Tabel' },
  { name: 'MongoDB', category: 'database', role: 'Document-oriented NoSQL', icon: 'logos:mongodb-icon', note: 'Skema Fleksibel & Pipeline Agregasi' },

  // Infrastruktur & DevOps (Termasuk GitLab)
  { name: 'Docker', category: 'devops', role: 'Platform Kontainerisasi Mandiri', icon: 'logos:docker-icon', note: 'Isolasi Lingkungan Bersih & Dockerfile' },
  { name: 'Ubuntu Linux', category: 'devops', role: 'Sistem Operasi Server Produksi', icon: 'logos:ubuntu', note: 'Server Monitoring & Systemd Daemons' },
  { name: 'Git & GitHub', category: 'devops', role: 'Kendali Versi & Kolaborasi', icon: 'logos:git-icon', note: 'Branching Strategy & GitHub Actions' },
  { name: 'GitLab', category: 'devops', role: 'DevOps & Repository Platform', icon: 'logos:gitlab', note: 'GitLab CI/CD Pipeline & Code Management' },
  { name: 'Postman', category: 'devops', role: 'API Testing & Documentation Suite', icon: 'logos:postman-icon', note: 'Koleksi Pengujian Endpoint Terotomasi' },

  // Antarmuka Web Modern (Tanpa TypeScript)
  { name: 'Vue.js 3', category: 'frontend', role: 'Progressive Web Framework', icon: 'logos:vue', note: 'Composition API Reaktif & Komponen Modular' },
  { name: 'Nuxt 4', category: 'frontend', role: 'Full-Stack Framework Hibrida', icon: 'logos:nuxt-icon', note: 'SSR, SSG Prerender & Performa Alami' },
  { name: 'Tailwind CSS', category: 'frontend', role: 'Utility-First CSS Framework', icon: 'logos:tailwindcss-icon', note: 'Sistem Desain Responsif & Tema Gelap/Terang' },
  { name: 'HTML5 & CSS3', category: 'frontend', role: 'Fondasi Struktur & Gaya Web', icon: 'logos:html-5', note: 'Semantik Aksesibel & Layout Fleksibel' }
]

const filteredSkills = computed(() => {
  if (activeTab.value === 'all') return skills
  return skills.filter(item => item.category === activeTab.value)
})

// Detailed Work Experience & Key Jobdesk Implementations
const experiences = [
  {
    company: 'PT Medika Digital Nusantara',
    role: 'Web Developer',
    type: 'Full-time · Shifting Schedules',
    period: 'Pengalaman Produksi',
    location: 'Sleman, D.I. Yogyakarta',
    tag: 'Healthcare Technology',
    badgeColor: '#023047',
    summary: 'Bertanggung jawab atas pemeliharaan dan pengembangan sistem informasi manajemen rumah sakit serta infrastruktur backend berbasis Laravel, PHP, dan basis data Oracle skala enterprise.',
    deliverables: [
      'Memantau server harian (server monitoring 24/7) secara konsisten dan responsif terhadap kendala kritis di bawah jadwal kerja shifting.',
      'Melakukan penanganan dan perbaikan bug (rapid bug fixing) dengan analisis akar masalah secara cermat pada modul-modul operasional medis.',
      'Mengembangkan fitur-fitur baru menggunakan Laravel & PHP yang terhubung langsung dengan enterprise database Oracle.',
      'Mengelola kontainerisasi lingkungan kerja menggunakan Docker pada server Ubuntu Linux guna menjamin konsistensi saat rilis.',
      'Merancang arsitektur kueri efisien untuk mencegah kemacetan saat lonjakan data antrian pasien dan rekam medis.'
    ],
    tech: ['Laravel', 'PHP', 'Oracle Database', 'Docker', 'Ubuntu Linux', 'Server Monitoring', 'Bug Fixing']
  },
  {
    company: 'Zettabyte Pte Ltd',
    role: 'Backend Developer (Trainee)',
    type: 'Internship / Trainee Program',
    period: 'Pengalaman Rekayasa API',
    location: 'Yogyakarta',
    tag: 'Software Engineering',
    badgeColor: '#219EBC',
    summary: 'Fokus pada rekayasa backend, perancangan skema basis data ganda (relasional & non-relasional), serta implementasi arsitektur keamanan REST API berstandar industri.',
    deliverables: [
      'Merancang skema basis data relasional (PostgreSQL) dan skema dokumen (MongoDB) yang teroptimasi untuk kebutuhan data multi-tenant.',
      'Mengimplementasikan lapisan keamanan RESTful API menggunakan otentikasi JSON Web Token (JWT) lengkap dengan validasi request ketat.',
      'Mengembangkan endpoint API modular dengan Express.js / Node.js yang mudah dipelihara dan tahan terhadap anomali payload.',
      'Menyusun skenario pengujian komprehensif menggunakan Postman collection untuk menjamin stabilitas setiap rute API.'
    ],
    tech: ['Express.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'JWT Auth', 'REST API Security', 'Postman']
  },
  {
    company: 'Proyek Rekayasa Mandiri & Open Source',
    role: 'Lead Architect & Maintainer',
    type: 'Portfolio & System Automation',
    period: '2026 - Berjalan',
    location: 'dianadi021.github.io',
    tag: 'Modern Web & Automation',
    badgeColor: '#FB8500',
    summary: 'Pengembangan platform portofolio modern dengan rendering hibrida (SSR & SSG) serta skrip otomasi sistem server Ubuntu.',
    deliverables: [
      'Membangun arsitektur frontend dengan Nuxt 4, Vue 3, Pinia, dan Tailwind CSS tanpa adanya siklus impor (zero import cycle terverifikasi Graphify).',
      'Mengonfigurasi pipeline GitHub Actions untuk otomatisasi prerender dan deployment statis ke domain dianadi021.github.io.',
      'Menulis skrip otomasi berbasis Lua dan Bash Shell untuk pemantauan ambang batas memori/CPU server, log rotation, dan penjadwalan backup.'
    ],
    tech: ['Nuxt 4', 'Vue.js 3', 'TypeScript', 'Tailwind CSS', 'Lua', 'Bash Shell', 'Docker', 'GitLab / GitHub Actions']
  }
]

// Interactive Actions
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
        timerProgressBar: true
      })
    }
  } catch {
    if ($swal) {
      $swal.fire({
        title: 'Alamat Email',
        text: email,
        icon: 'info',
        confirmButtonColor: '#219EBC'
      })
    }
  }
}

const showHeartwarmStatus = () => {
  if ($swal) {
    $swal.fire({
      title: 'Studio Catatan Sistem 🌿',
      html: `
        <div class="text-left text-xs sm:text-sm space-y-2.5 p-1 text-[#023047]">
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#198754]"></span>
            <span><strong>Kondisi Mesin:</strong> Berjalan stabil & siap melayani.</span>
          </p>
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#219EBC]"></span>
            <span><strong>Basis Data:</strong> Oracle, PostgreSQL, MongoDB, MySQL terkonfigurasi.</span>
          </p>
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FFB703]"></span>
            <span><strong>Harmoni Arsitektur:</strong> 0 Siklus Impor (Terverifikasi Graphify).</span>
          </p>
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FB8500]"></span>
            <span><strong>Basis Operasional:</strong> Sleman, D.I. Yogyakarta, Indonesia.</span>
          </p>
        </div>
      `,
      confirmButtonText: 'Tutup Catatan',
      confirmButtonColor: '#023047',
      background: '#faf8f5'
    })
  }
}
</script>

<template>
  <div class="space-y-24 py-8 sm:py-14 relative overflow-hidden">
    <!-- Atmospheric Clouds (Ghibli Sky Feel) -->
    <div class="absolute top-12 left-1/10 w-72 h-36 bg-[#8ECAE6]/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
    <div class="absolute top-1/2 left-1/3 w-80 h-40 bg-[#219EBC]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

    <!-- 1. HERO SECTION -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Storytelling & Branding Column -->
        <div class="lg:col-span-7 space-y-6 text-left">
          <!-- Availability Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#8ECAE6]/25 dark:bg-[#034363] text-[#023047] dark:text-[#8ECAE6] border border-[#219EBC]/40 shadow-xs">
            <span class="text-sm">🍃</span>
            <span>Tersedia untuk Peran Rekayasa Backend & Web Development</span>
          </div>

          <!-- Hero Headline -->
          <div class="space-y-3">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#023047] dark:text-white leading-[1.18]">
              Merajut Sistem <br />
              <span class="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#219EBC] via-[#023047] to-[#FB8500] dark:from-[#8ECAE6] dark:via-[#219EBC] dark:to-[#FFB703]">
                Backend yang Tenang
                <svg class="absolute -bottom-2 left-0 w-full h-3 text-[#FFB703] opacity-80" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,7 Q25,12 50,7 T100,7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
                </svg>
              </span> <br />
              namun Kokoh & Skalabel.
            </h1>
            <p class="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl leading-relaxed pt-1">
              Saya <strong class="text-[#023047] dark:text-[#8ECAE6] font-bold">Dian Adi Nugroho</strong> — Web & Backend Developer dari Yogyakarta. Berpengalaman merajut keandalan sistem backend berbasis Laravel, Express.js, basis data enterprise (Oracle, PostgreSQL, MongoDB), dan otomasi kontainer Docker.
            </p>
          </div>

          <!-- Signature Highlights (Parchment Tags) -->
          <div class="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium">
            <span class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs">
              🌾 Laravel & PHP
            </span>
            <span class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs">
              🌊 PostgreSQL & Oracle DB
            </span>
            <span class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs">
              ⚓ Docker & Ubuntu Linux
            </span>
            <span class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs">
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
          <div class="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 dark:text-slate-400">
            <span class="flex items-center gap-1.5">
              <Icon name="heroicons:map-pin-20-solid" class="w-4 h-4 text-[#FB8500]" />
              <span>Kab. Sleman, D.I. Yogyakarta</span>
            </span>
            <span>•</span>
            <a href="https://github.com/dianadi021" target="_blank" rel="noopener noreferrer" class="hover:text-[#219EBC] flex items-center gap-1 transition">
              <Icon name="simple-icons:github" class="w-3.5 h-3.5" />
              <span>dianadi021</span>
            </a>
            <span>•</span>
            <button type="button" @click="showHeartwarmStatus" class="text-[#219EBC] hover:underline font-semibold flex items-center gap-1">
              <span>Status Sistem</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        <!-- Visual Column: Field Notebook Postcard -->
        <div class="lg:col-span-5">
          <div class="relative group">
            <div class="rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/50 dark:border-[#219EBC]/40 p-6 sm:p-7 shadow-xl space-y-5 text-left">
              <!-- Postcard Header with Postage Stamp -->
              <div class="flex items-start justify-between border-b border-[#8ECAE6]/30 dark:border-[#219EBC]/30 pb-4">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xl">📫</span>
                    <span class="text-xs font-bold uppercase tracking-wider text-[#219EBC] dark:text-[#8ECAE6]">
                      Catatan Rekayasa Digital
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Portfolio & Profil Profesional
                  </p>
                </div>

                <div class="w-14 h-16 rounded-md border-2 border-dashed border-[#FB8500] bg-[#FFB703]/10 p-1 flex flex-col items-center justify-between text-center rotate-3 shadow-xs">
                  <span class="text-[9px] font-bold text-[#FB8500] uppercase tracking-tighter">POS YOGYA</span>
                  <span class="text-sm">🏮</span>
                  <span class="text-[8px] font-mono text-[#023047] dark:text-slate-200">#021</span>
                </div>
              </div>

              <!-- Postcard Note Body -->
              <div class="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                <p class="italic text-slate-600 dark:text-slate-300">
                  "Menghidupkan sistem backend seperti menjaga kestabilan aliran air. Setiap query, rute, dan daemon bekerja tepat waktu tanpa kebisingan di permukaan."
                </p>

                <!-- Status Notebook Lines -->
                <div class="p-3.5 rounded-2xl bg-[#faf8f5] dark:bg-[#023047]/60 border border-[#8ECAE6]/40 dark:border-[#219EBC]/30 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]">Nama:</span>
                    <span class="font-bold">Dian Adi Nugroho</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]">Peran:</span>
                    <span>Web & Backend Developer</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]">Spesialisasi:</span>
                    <span>Laravel, Oracle, PostgreSQL, Docker</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]">Waktu Sistem:</span>
                    <span class="text-[11px] text-[#FB8500] font-medium">{{ currentTime }}</span>
                  </div>
                </div>
              </div>

              <div class="pt-2 flex items-center justify-between">
                <div class="flex items-center gap-1.5 text-[11px] text-[#198754] font-medium">
                  <span class="w-2 h-2 rounded-full bg-[#198754]"></span>
                  <span>Siap Menjalankan Layanan</span>
                </div>
                <button
                  type="button"
                  @click="showHeartwarmStatus"
                  class="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#219EBC]/15 text-[#023047] dark:text-[#8ECAE6] hover:bg-[#219EBC]/30 transition"
                >
                  Detail Status ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. FOUR PILLARS OF CRAFTSMANSHIP -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-6 rounded-3xl bg-white dark:bg-[#034363]/80 border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 shadow-xs hover:border-[#219EBC] transition space-y-2 text-left">
          <div class="w-10 h-10 rounded-2xl bg-[#8ECAE6]/25 flex items-center justify-center text-xl">
            🏛️
          </div>
          <div class="text-2xl font-black text-[#023047] dark:text-white">4+ Basis Data</div>
          <div class="text-xs font-bold uppercase tracking-wider text-[#219EBC]">Penyimpanan Memori</div>
          <p class="text-xs text-slate-600 dark:text-slate-300">
            Keahlian mengelola Oracle, PostgreSQL, MongoDB, dan MySQL dengan skema relasional maupun dokumen.
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-white dark:bg-[#034363]/80 border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 shadow-xs hover:border-[#219EBC] transition space-y-2 text-left">
          <div class="w-10 h-10 rounded-2xl bg-[#FFB703]/25 flex items-center justify-center text-xl">
            🛡️
          </div>
          <div class="text-2xl font-black text-[#023047] dark:text-white">REST & JWT</div>
          <div class="text-xs font-bold uppercase tracking-wider text-[#FFB703]">Gerbang Terlindungi</div>
          <p class="text-xs text-slate-600 dark:text-slate-300">
            Protokol autentikasi berlapis peran, enkripsi payload, dan sanitasi permintaan yang teruji.
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-white dark:bg-[#034363]/80 border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 shadow-xs hover:border-[#219EBC] transition space-y-2 text-left">
          <div class="w-10 h-10 rounded-2xl bg-[#FB8500]/25 flex items-center justify-center text-xl">
            🌿
          </div>
          <div class="text-2xl font-black text-[#023047] dark:text-white">24/7 Monitoring</div>
          <div class="text-xs font-bold uppercase tracking-wider text-[#FB8500]">Penjagaan Setia</div>
          <p class="text-xs text-slate-600 dark:text-slate-300">
            Pengalaman nyata menjaga keandalan server kesehatan kritis di bawah jadwal kerja shifting.
          </p>
        </div>

        <div class="p-6 rounded-3xl bg-white dark:bg-[#034363]/80 border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 shadow-xs hover:border-[#219EBC] transition space-y-2 text-left">
          <div class="w-10 h-10 rounded-2xl bg-[#219EBC]/25 flex items-center justify-center text-xl">
            ⛵
          </div>
          <div class="text-2xl font-black text-[#023047] dark:text-white">Docker & Linux</div>
          <div class="text-xs font-bold uppercase tracking-wider text-[#219EBC]">Infrastruktur Mandiri</div>
          <p class="text-xs text-slate-600 dark:text-slate-300">
            Isolasi kontainer bersih dan manajemen server Ubuntu produksi untuk lingkungan bebas bentrok.
          </p>
        </div>
      </div>
    </section>

    <!-- 3. RIWAYAT INDUSTRI & IMPLEMENTASI PROYEK NYATA (DETAILED JOBDESK) -->
    <section id="experience" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24 text-left">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-dashed border-[#8ECAE6]/40 dark:border-[#219EBC]/30 pb-6">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xl">🗺️</span>
            <span class="text-xs font-bold uppercase tracking-wider text-[#219EBC]">Rekam Jejak & Karya Nyata</span>
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
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#8ECAE6]/30 dark:border-[#219EBC]/30 pb-5">
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
            <div class="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-right space-y-1">
              <div>{{ exp.location }}</div>
              <div class="text-[#FB8500] font-semibold">{{ exp.period }}</div>
            </div>
          </div>

          <!-- Summary Paragraph -->
          <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {{ exp.summary }}
          </p>

          <!-- Detailed Jobdesk & Deliverables List -->
          <div class="space-y-2 pt-1">
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#023047] dark:text-[#8ECAE6]">
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

    <!-- 4. PERALATAN SANG PENGRAJIN (#skills) -->
    <section id="skills" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24 text-left">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FB8500]">
          <span>🧰</span>
          <span>Perlengkapan & Piranti Rekayasa</span>
        </div>
        <h2 class="text-3xl font-extrabold text-[#023047] dark:text-white">
          Koleksi Perkakas Sang Pengrajin
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Bahasa, kerangka kerja, basis data, dan sarana infrastruktur yang digunakan dalam merancang sistem.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          @click="activeTab = 'all'"
          class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
          :class="activeTab === 'all' ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]' : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'"
        >
          Semua Perkakas ({{ skills.length }})
        </button>
        <button
          type="button"
          @click="activeTab = 'backend'"
          class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
          :class="activeTab === 'backend' ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]' : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'"
        >
          Mesin Backend & Skrip
        </button>
        <button
          type="button"
          @click="activeTab = 'database'"
          class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
          :class="activeTab === 'database' ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]' : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'"
        >
          Basis Data & Penyimpanan
        </button>
        <button
          type="button"
          @click="activeTab = 'devops'"
          class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
          :class="activeTab === 'devops' ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]' : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'"
        >
          Infrastruktur & DevOps
        </button>
        <button
          type="button"
          @click="activeTab = 'frontend'"
          class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
          :class="activeTab === 'frontend' ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]' : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'"
        >
          Antarmuka Web Modern
        </button>
      </div>

      <!-- Skills Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        <div
          v-for="skill in filteredSkills"
          :key="skill.name"
          class="p-5 rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 shadow-xs hover:border-[#219EBC] hover:-translate-y-1 transition-all duration-200 space-y-2.5"
        >
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-base text-[#023047] dark:text-white">{{ skill.name }}</span>
            <Icon :name="skill.icon" class="w-6 h-6" />
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400">
            {{ skill.role }}
          </div>
          <div class="text-[11px] font-semibold text-[#023047] dark:text-[#8ECAE6] bg-[#8ECAE6]/20 dark:bg-[#023047] px-3 py-1 rounded-full inline-block">
            🌱 {{ skill.note }}
          </div>
        </div>
      </div>
    </section>

    <!-- 5. CONTACT & COLLABORATION INVITATION (CLEAN & ELEGANT) -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div class="rounded-3xl bg-[#023047] text-white p-8 sm:p-12 shadow-xl border-2 border-[#219EBC]/40">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8ECAE6]/20 text-[#8ECAE6] border border-[#8ECAE6]/30">
              <span>🏮</span>
              <span>Lentera Sambung Rasa & Kolaborasi</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Mari Berbincang & Membangun Sistem yang Kokoh.
            </h2>
            <p class="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Apakah tim Anda membutuhkan pengembang backend untuk merancang REST API terproteksi, mengoptimasi skema basis data, atau membangun aplikasi web modern? Pintu diskusi selalu terbuka untuk kolaborasi profesional.
            </p>
            <div class="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:envelope-20-solid" class="w-4 h-4 text-[#8ECAE6]" />
                <span>contactmedianadi021@gmail.com</span>
              </span>
              <span>•</span>
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:phone-20-solid" class="w-4 h-4 text-[#8ECAE6]" />
                <span>+62851-7999-7321</span>
              </span>
              <span>•</span>
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:map-pin-20-solid" class="w-4 h-4 text-[#8ECAE6]" />
                <span>Sleman, Yogyakarta</span>
              </span>
            </div>
          </div>

          <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <a
              href="mailto:contactmedianadi021@gmail.com"
              class="w-full text-center px-6 py-3.5 rounded-2xl font-bold text-white bg-[#FB8500] hover:bg-[#FB8500]/90 transition shadow-md shadow-[#FB8500]/30 text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Icon name="heroicons:paper-airplane-20-solid" class="w-4 h-4 text-[#FFB703]" />
              <span>Kirimkan Surel Langsung</span>
            </a>
            <NuxtLink
              to="/mycv"
              class="w-full text-center px-6 py-3.5 rounded-2xl font-bold text-[#8ECAE6] bg-white/10 hover:bg-white/20 border border-white/25 transition text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Icon name="heroicons:document-text-20-solid" class="w-4 h-4 text-[#8ECAE6]" />
              <span>Buka Format CV ATS (/mycv)</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
