<script setup lang="ts">
useSeoMeta({
  title: 'Dian Adi Nugroho | Web & Backend Craftsman',
  description: 'Portofolio personal dan galeri rekayasa Dian Adi Nugroho. Merajut sistem backend tangguh, REST API terproteksi, optimasi multi-database, dan aplikasi web modern dengan dedikasi.',
  ogTitle: 'Dian Adi Nugroho | Web & Backend Craftsman',
  ogDescription: 'Portofolio personal dan galeri rekayasa Dian Adi Nugroho. Merajut sistem backend tangguh, REST API terproteksi, optimasi multi-database, dan aplikasi web modern dengan dedikasi.',
  ogType: 'website'
})

const { $dayjs, $swal } = useNuxtApp()

// Real-time formatted date using dayjs locale
const currentTime = computed(() => {
  return $dayjs().format('dddd, DD MMMM YYYY · HH:mm:ss')
})

// Skill category tabs
const activeTab = ref<'all' | 'backend' | 'database' | 'devops' | 'frontend'>('all')

const skills = [
  { name: 'Laravel', category: 'backend', role: 'Full-featured Backend Framework', icon: 'logos:laravel', note: 'Arsitektur MVC & Keandalan Layanan' },
  { name: 'PHP', category: 'backend', role: 'Bahasa Inti Server-Side', icon: 'logos:php', note: 'OOP, Composer, Standar PSR' },
  { name: 'Express.js', category: 'backend', role: 'Minimalist Node.js Framework', icon: 'logos:express', note: 'RESTful API & Middleware Fleksibel' },
  { name: 'CodeIgniter', category: 'backend', role: 'Lightweight PHP Framework', icon: 'logos:codeigniter-icon', note: 'Performa Cepat & Praktis' },
  { name: 'Node.js', category: 'backend', role: 'JavaScript Runtime', icon: 'logos:nodejs-icon', note: 'Event-driven Asynchronous' },
  { name: 'Lua', category: 'backend', role: 'Bahasa Skrip Ringan', icon: 'logos:lua', note: 'Otomasi & Logika Tertanam' },

  { name: 'PostgreSQL', category: 'database', role: 'Relational Database Terpercaya', icon: 'logos:postgresql', note: 'Integritas Relasi & Skema Kompleks' },
  { name: 'Oracle Database', category: 'database', role: 'Enterprise Database System', icon: 'logos:oracle', note: 'Manajemen Data Rumah Sakit Kritis' },
  { name: 'MySQL', category: 'database', role: 'Basis Data Populer & Andal', icon: 'logos:mysql-icon', note: 'Optimasi Kueri & Transaksi' },
  { name: 'MongoDB', category: 'database', role: 'Document-oriented NoSQL', icon: 'logos:mongodb-icon', note: 'Agregasi Fleksibel & Dinamis' },

  { name: 'Docker', category: 'devops', role: 'Kontainerisasi Mandiri', icon: 'logos:docker-icon', note: 'Isolasi Lingkungan Bersih' },
  { name: 'Ubuntu Linux', category: 'devops', role: 'Sistem Operasi Produksi', icon: 'logos:ubuntu', note: 'Server Monitoring & Daemon Systemd' },
  { name: 'Git & GitHub', category: 'devops', role: 'Kendali Versi & Kolaborasi', icon: 'logos:git-icon', note: 'Alur Kerja Branching & CI/CD' },
  { name: 'Postman', category: 'devops', role: 'Eksplorasi & Pengujian API', icon: 'logos:postman-icon', note: 'Koleksi Uji Terotomasi' },

  { name: 'Vue.js 3', category: 'frontend', role: 'Progressive Web Framework', icon: 'logos:vue', note: 'Composition API Reaktif' },
  { name: 'Nuxt 4', category: 'frontend', role: 'Framework Full-Stack Hibrida', icon: 'logos:nuxt-icon', note: 'SSR, SSG & Kecepatan Alami' },
  { name: 'TypeScript', category: 'frontend', role: 'JavaScript Bertipe Statis', icon: 'logos:typescript-icon', note: 'Keamanan Tipe End-to-End' },
  { name: 'Tailwind CSS', category: 'frontend', role: 'Sistem Gaya Berbasis Utilitas', icon: 'logos:tailwindcss-icon', note: 'Harmoni Warna & Responsif' }
]

const filteredSkills = computed(() => {
  if (activeTab.value === 'all') return skills
  return skills.filter(item => item.category === activeTab.value)
})

// Featured Projects Showcase ala Ghibli Postcards
const projects = [
  {
    title: 'Hospital & Healthcare Core Management System',
    stamp: 'Kesehatan & Rumah Sakit',
    stampNumber: 'EXP-01',
    description: 'Sistem informasi manajemen kesehatan yang melayani aliran pasien, catatan medis, dan pelaporan terpadu dengan basis data Oracle berkeandalan tinggi.',
    notes: [
      'Pemantauan server harian tanpa henti & penanganan kendala cepat di bawah jadwal shifting padat',
      'Integrasi multi-tabel kompleks pada sistem database Oracle enterprise',
      'Lingkungan kerja terisolasi dan mudah direplikasi dengan kontainer Docker',
      'Penyediaan layanan RESTful API aman bagi integrasi aplikasi pendukung'
    ],
    tech: ['Laravel', 'PHP', 'Oracle DB', 'Docker', 'Ubuntu Linux'],
    place: 'PT Medika Digital Nusantara',
    stampColor: '#219EBC'
  },
  {
    title: 'Secure Multi-Tenant REST API Platform',
    stamp: 'Keamanan API & Data',
    stampNumber: 'EXP-02',
    description: 'Pondasi API berlapis keamanan dengan arsitektur skema ganda (MongoDB & PostgreSQL), dilengkapi otorisasi peran pengguna dan proteksi token JWT.',
    notes: [
      'Perancangan skema relasional terstruktur (PostgreSQL) dan dokumen fleksibel (MongoDB)',
      'Otentikasi aman dengan protokol JSON Web Token (JWT) dan token penyegar',
      'Penyaringan ketat untuk menjamin keamanan setiap permintaan dari anomali payload',
      'Uji coba menyeluruh terstruktur menggunakan koleksi pengujian Postman'
    ],
    tech: ['Express.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'JWT', 'Postman'],
    place: 'Zettabyte Pte Ltd',
    stampColor: '#FFB703'
  },
  {
    title: 'Modern Fullstack SSR & Jamstack Living Ecosystem',
    stamp: 'Arsitektur Web Modern',
    stampNumber: 'EXP-03',
    description: 'Ruang pamer karya personal berbasis Nuxt 4 dan Vue 3 yang mengutamakan kehangatan estetika, performa tinggi, dan alur integrasi nir-siklus.',
    notes: [
      'Arsitektur bersih diverifikasi oleh Graphify mapping tanpa adanya siklus ketergantungan impor',
      'Peralihan tema siang dan malam berbintang tanpa kedipan hidrasi pada sisi server',
      'Validasi formulir terstruktur dengan Zod dan interceptor Axios terpusat',
      'Penerbitan otomatis halaman statis ke GitHub Pages melalui GitHub Actions'
    ],
    tech: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'Pinia', 'GitHub Pages'],
    place: 'dianadi021.github.io',
    stampColor: '#FB8500'
  },
  {
    title: 'Automated Server Monitoring & Gentle Scripting',
    stamp: 'Otomasi & Penjagaan',
    stampNumber: 'EXP-04',
    description: 'Serangkaian skrip otomasi menggunakan Lua dan Bash Shell untuk mendampingi server Ubuntu bekerja secara konsisten tanpa rasa cemas.',
    notes: [
      'Pemantauan berkala kesehatan layanan latar belakang dan pembersihan berkas log',
      'Pemberitahuan dini saat kapasitas memori atau komputasi mendekati ambang batas',
      'Penjadwalan otomatis berulang memanfaatkan cron dan unit layanan systemd',
      'Ketenangan operasional tanpa perlu pemantauan manual yang melelahkan'
    ],
    tech: ['Lua', 'Bash Shell', 'Ubuntu Linux', 'Cron/Systemd', 'Docker'],
    place: 'Sleman Lab & Server Ops',
    stampColor: '#023047'
  }
]

// Interactive Action with SweetAlert2
const copyEmail = async () => {
  const email = 'contactmedianadi021@gmail.com'
  try {
    await navigator.clipboard.writeText(email)
    if ($swal) {
      $swal.fire({
        title: 'Alamat Surat Tersalin ✉️',
        text: `${email} telah tersimpan di papan klip Anda. Mari bercerita dan membangun sesuatu yang bermakna!`,
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
        title: 'Alamat Surel',
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
            <span><strong>Kondisi Mesin:</strong> Berjalan tenang dan teratur.</span>
          </p>
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#219EBC]"></span>
            <span><strong>Basis Data:</strong> Oracle, PostgreSQL, MongoDB, MySQL siap digunakan.</span>
          </p>
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FFB703]"></span>
            <span><strong>Harmoni Arsitektur:</strong> 0 Siklus Impor (Terverifikasi Graphify).</span>
          </p>
          <p class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FB8500]"></span>
            <span><strong>Lab Rumah:</strong> Sleman, D.I. Yogyakarta, Indonesia.</span>
          </p>
        </div>
      `,
      confirmButtonText: 'Terima Kasih',
      confirmButtonColor: '#023047',
      background: '#faf8f5'
    })
  }
}
</script>

<template>
  <div class="space-y-24 py-8 sm:py-14 relative overflow-hidden">
    <!-- Atmospheric Decorative Floating Clouds (Ghibli Sky Feel) -->
    <div class="absolute top-12 left-1/10 w-72 h-36 bg-[#8ECAE6]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"></div>
    <div class="absolute top-36 right-1/12 w-96 h-48 bg-[#FFB703]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
    <div class="absolute top-1/2 left-1/3 w-80 h-40 bg-[#219EBC]/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

    <!-- 1. HERO SECTION: THE CRAFTSMAN'S WORKSHOP -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <!-- Storytelling & Branding Column -->
        <div class="lg:col-span-7 space-y-6 text-left">
          <!-- Nature & Availability Badge -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#8ECAE6]/25 dark:bg-[#034363] text-[#023047] dark:text-[#8ECAE6] border border-[#219EBC]/40 shadow-xs">
            <span class="text-sm">🍃</span>
            <span>Terbuka untuk Peran Rekayasa Backend & Kolaborasi Penuh</span>
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
              Saya <strong class="text-[#023047] dark:text-[#8ECAE6] font-bold">Dian Adi Nugroho</strong> — pengrajin web & rekayasa backend dari Yogyakarta. Menenun logika data yang stabil, REST API terproteksi, dan infrastruktur kontainer teratur di balik layar agar pengguna merasakan pengalaman yang damai.
            </p>
          </div>

          <!-- Signature Highlights (Parchment Tags) -->
          <div class="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium">
            <span class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs">
              🌾 Laravel & PHP
            </span>
            <span class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs">
              🌊 PostgreSQL & Oracle
            </span>
            <span class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs">
              ⚓ Docker & Linux
            </span>
            <span class="px-3 py-1 rounded-full bg-white/80 dark:bg-[#034363]/80 border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] shadow-xs">
              ✨ Vue 3 & Nuxt 4
            </span>
          </div>

          <!-- Call to Action Buttons -->
          <div class="flex flex-wrap items-center gap-3.5 pt-3">
            <a
              href="#projects"
              class="px-6 py-3.5 rounded-2xl font-bold text-white bg-[#FB8500] hover:bg-[#FB8500]/90 transition shadow-md shadow-[#FB8500]/25 flex items-center gap-2 text-sm hover:-translate-y-0.5"
            >
              <Icon name="heroicons:map-20-solid" class="w-4 h-4 text-[#FFB703]" />
              <span>Jelajahi Lembar Karya</span>
            </a>

            <NuxtLink
              to="/mycv"
              class="px-5 py-3.5 rounded-2xl font-bold text-[#023047] dark:text-[#8ECAE6] bg-white/90 dark:bg-[#034363] hover:bg-[#8ECAE6]/20 border border-[#219EBC]/40 transition flex items-center gap-2 text-sm shadow-xs hover:-translate-y-0.5"
            >
              <Icon name="heroicons:book-open-20-solid" class="w-4 h-4 text-[#219EBC]" />
              <span>Buku Riwayat & CV (/mycv)</span>
            </NuxtLink>

            <button
              type="button"
              @click="copyEmail"
              class="px-4 py-3.5 rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#219EBC] dark:hover:text-[#8ECAE6] hover:bg-[#8ECAE6]/15 transition flex items-center gap-1.5"
              title="Salin alamat surel"
            >
              <Icon name="heroicons:paper-airplane-20-solid" class="w-4 h-4 text-[#FB8500]" />
              <span>Kirim Surel</span>
            </button>
          </div>

          <!-- Warm Personal Notes -->
          <div class="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-600 dark:text-slate-400">
            <span class="flex items-center gap-1.5">
              <Icon name="heroicons:map-pin-20-solid" class="w-4 h-4 text-[#FB8500]" />
              <span>Sleman, D.I. Yogyakarta</span>
            </span>
            <span>•</span>
            <a href="https://github.com/dianadi021" target="_blank" rel="noopener noreferrer" class="hover:text-[#219EBC] flex items-center gap-1 transition">
              <Icon name="simple-icons:github" class="w-3.5 h-3.5" />
              <span>github.com/dianadi021</span>
            </a>
            <span>•</span>
            <button type="button" @click="showHeartwarmStatus" class="text-[#219EBC] hover:underline font-semibold flex items-center gap-1">
              <span>Status Studio</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        <!-- Visual Column: The Ghibli Postcard & Field Notebook -->
        <div class="lg:col-span-5">
          <div class="relative group">
            <!-- Decorative Wooden/Stamp Border Aura -->
            <div class="absolute -inset-2 bg-gradient-to-r from-[#219EBC]/20 via-[#FFB703]/20 to-[#FB8500]/20 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>

            <!-- Field Postcard Card -->
            <div class="relative rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/50 dark:border-[#219EBC]/40 p-6 sm:p-7 shadow-xl space-y-5 text-left">
              <!-- Postcard Header with Postage Stamp -->
              <div class="flex items-start justify-between border-b border-[#8ECAE6]/30 dark:border-[#219EBC]/30 pb-4">
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xl">📫</span>
                    <span class="text-xs font-bold uppercase tracking-wider text-[#219EBC] dark:text-[#8ECAE6]">
                      Catatan Pengrajin Digital
                    </span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    No. Arsip: YK-2026 / dianadi021.github.io
                  </p>
                </div>

                <!-- Vintage Postage Stamp -->
                <div class="w-14 h-16 rounded-md border-2 border-dashed border-[#FB8500] bg-[#FFB703]/10 p-1 flex flex-col items-center justify-between text-center rotate-3 shadow-xs">
                  <span class="text-[9px] font-bold text-[#FB8500] uppercase tracking-tighter">POS YOGYA</span>
                  <span class="text-sm">🏮</span>
                  <span class="text-[8px] font-mono text-[#023047] dark:text-slate-200">#021</span>
                </div>
              </div>

              <!-- Postcard Note Body -->
              <div class="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                <p class="italic text-slate-600 dark:text-slate-300">
                  "Menghidupkan baris kode bagaikan merawat taman bunga di tepi bukit. Setiap tabel, rute, dan kontainer harus saling berpadu harmonis tanpa kebisingan yang mengganggu."
                </p>

                <!-- Status Notebook Lines -->
                <div class="p-3.5 rounded-2xl bg-[#faf8f5] dark:bg-[#023047]/60 border border-[#8ECAE6]/40 dark:border-[#219EBC]/30 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]">Pengrajin:</span>
                    <span class="font-bold">Dian Adi Nugroho</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]">Spesialisasi:</span>
                    <span>Backend Architect & Web Systems</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]">Infrastruktur:</span>
                    <span>Laravel, Oracle, PostgreSQL, Docker</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-[#023047] dark:text-[#8ECAE6]">Waktu Studio:</span>
                    <span class="text-[11px] text-[#FB8500] font-medium">{{ currentTime }}</span>
                  </div>
                </div>
              </div>

              <!-- Interactive Stamp Button -->
              <div class="pt-2 flex items-center justify-between">
                <div class="flex items-center gap-1.5 text-[11px] text-[#198754] font-medium">
                  <span class="w-2 h-2 rounded-full bg-[#198754]"></span>
                  <span>Sistem Siap Berlayar</span>
                </div>
                <button
                  type="button"
                  @click="showHeartwarmStatus"
                  class="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#219EBC]/15 text-[#023047] dark:text-[#8ECAE6] hover:bg-[#219EBC]/30 transition"
                >
                  Buka Buku Catatan ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. FOUR PILLARS OF CRAFTSMANSHIP (SHOW OFF METRICS & VALUES) -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Pillar 1 -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#034363]/80 border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 shadow-xs hover:border-[#219EBC] transition space-y-2 text-left">
          <div class="w-10 h-10 rounded-2xl bg-[#8ECAE6]/25 flex items-center justify-center text-xl">
            🏛️
          </div>
          <div class="text-2xl font-black text-[#023047] dark:text-white">4+ Basis Data</div>
          <div class="text-xs font-bold uppercase tracking-wider text-[#219EBC]">Penyimpanan Memori</div>
          <p class="text-xs text-slate-600 dark:text-slate-300">
            Keahlian mengelola Oracle, PostgreSQL, MongoDB, dan MySQL dengan skema yang teruji.
          </p>
        </div>

        <!-- Pillar 2 -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#034363]/80 border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 shadow-xs hover:border-[#219EBC] transition space-y-2 text-left">
          <div class="w-10 h-10 rounded-2xl bg-[#FFB703]/25 flex items-center justify-center text-xl">
            🛡️
          </div>
          <div class="text-2xl font-black text-[#023047] dark:text-white">REST & JWT</div>
          <div class="text-xs font-bold uppercase tracking-wider text-[#FFB703]">Gerbang Terlindungi</div>
          <p class="text-xs text-slate-600 dark:text-slate-300">
            Protokol autentikasi berlapis peran, enkripsi payload, dan sanitasi permintaan ketat.
          </p>
        </div>

        <!-- Pillar 3 -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#034363]/80 border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 shadow-xs hover:border-[#219EBC] transition space-y-2 text-left">
          <div class="w-10 h-10 rounded-2xl bg-[#FB8500]/25 flex items-center justify-center text-xl">
            🌿
          </div>
          <div class="text-2xl font-black text-[#023047] dark:text-white">24/7 Monitoring</div>
          <div class="text-xs font-bold uppercase tracking-wider text-[#FB8500]">Penjagaan Setia</div>
          <p class="text-xs text-slate-600 dark:text-slate-300">
            Pengalaman nyata menjaga detak server kesehatan pada PT Medika Digital Nusantara.
          </p>
        </div>

        <!-- Pillar 4 -->
        <div class="p-6 rounded-3xl bg-white dark:bg-[#034363]/80 border-2 border-[#8ECAE6]/30 dark:border-[#219EBC]/30 shadow-xs hover:border-[#219EBC] transition space-y-2 text-left">
          <div class="w-10 h-10 rounded-2xl bg-[#219EBC]/25 flex items-center justify-center text-xl">
            ⛵
          </div>
          <div class="text-2xl font-black text-[#023047] dark:text-white">Docker & Linux</div>
          <div class="text-xs font-bold uppercase tracking-wider text-[#219EBC]">Pelayaran Mandiri</div>
          <p class="text-xs text-slate-600 dark:text-slate-300">
            Isolasi kontainer bersih dan manajemen server Ubuntu mandiri tanpa ketergantungan rapuh.
          </p>
        </div>
      </div>
    </section>

    <!-- 3. FEATURED PROJECTS: POSTCARDS FROM THE JOURNEY -->
    <section id="projects" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-dashed border-[#8ECAE6]/40 dark:border-[#219EBC]/30 pb-6 text-left">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xl">📜</span>
            <span class="text-xs font-bold uppercase tracking-wider text-[#219EBC] dark:text-[#8ECAE6]">
              Ekspedisi & Rekayasa
            </span>
          </div>
          <h2 class="text-3xl font-extrabold text-[#023047] dark:text-white mt-1">
            Karya Pilihan & Cerita Sistem
          </h2>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400 max-w-md">
          Dokumentasi jejak nyata membangun solusi andal untuk skala fasilitas kesehatan, platform multi-tenant, dan arsitektur web modern.
        </p>
      </div>

      <!-- Postcards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div
          v-for="(project, idx) in projects"
          :key="idx"
          class="rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/40 dark:border-[#219EBC]/30 p-7 shadow-sm hover:shadow-xl hover:border-[#219EBC] transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group"
        >
          <!-- Corner Wax Stamp Accent -->
          <div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#8ECAE6]/20 to-transparent pointer-events-none rounded-bl-full"></div>

          <div class="space-y-4">
            <!-- Stamp Top Bar -->
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold px-3 py-1 rounded-full bg-[#8ECAE6]/25 dark:bg-[#023047] text-[#023047] dark:text-[#8ECAE6] border border-[#219EBC]/30">
                {{ project.stamp }}
              </span>
              <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#023047] text-slate-500 dark:text-slate-400">
                {{ project.stampNumber }} · {{ project.place }}
              </span>
            </div>

            <!-- Title & Narrative -->
            <div class="space-y-2">
              <h3 class="text-xl font-extrabold text-[#023047] dark:text-white group-hover:text-[#219EBC] transition">
                {{ project.title }}
              </h3>
              <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <!-- Handcrafted Note Points -->
            <div class="space-y-2 pt-2 border-t border-[#8ECAE6]/30 dark:border-[#219EBC]/30">
              <div
                v-for="(n, nIdx) in project.notes"
                :key="nIdx"
                class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
              >
                <span class="text-[#219EBC] dark:text-[#8ECAE6] text-sm shrink-0">🍃</span>
                <span>{{ n }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom Technology Ribbon -->
          <div class="pt-4 border-t border-[#8ECAE6]/30 dark:border-[#219EBC]/30">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="t in project.tech"
                :key="t"
                class="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#faf8f5] dark:bg-[#023047] text-[#023047] dark:text-slate-200 border border-[#8ECAE6]/30"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. THE ARTISAN'S TOOLKIT (#skills) -->
    <section id="skills" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <div class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FB8500]">
          <span>🧰</span>
          <span>Perlengkapan & Piranti</span>
        </div>
        <h2 class="text-3xl font-extrabold text-[#023047] dark:text-white">
          Koleksi Perkakas Sang Pengrajin
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Bahasa, kerangka kerja, basis data, dan sarana komputasi yang diasah dengan cermat untuk menghidupkan arsitektur aplikasi.
        </p>
      </div>

      <!-- Filter Tabs ala Ghibli Wooden Slats -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          @click="activeTab = 'all'"
          class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
          :class="activeTab === 'all' ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]' : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'"
        >
          Semua Perkakas (16)
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

    <!-- 5. CAREER TIMELINE HIGHLIGHTS & CV INVITATION -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-left">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-dashed border-[#8ECAE6]/40 dark:border-[#219EBC]/30 pb-6">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xl">🗺️</span>
            <span class="text-xs font-bold uppercase tracking-wider text-[#219EBC]">Jejak Langkah</span>
          </div>
          <h2 class="text-3xl font-extrabold text-[#023047] dark:text-white mt-1">
            Riwayat Singkat di Industri
          </h2>
        </div>
        <NuxtLink
          to="/mycv"
          class="text-xs font-bold text-[#FB8500] hover:underline flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Buka CV Lengkap & Pendidikan (/mycv)</span>
          <Icon name="heroicons:arrow-right-20-solid" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="space-y-6">
        <!-- Experience 1 -->
        <div class="p-7 rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/40 dark:border-[#219EBC]/30 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div class="space-y-3 max-w-3xl">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-[#023047] text-[#8ECAE6]">
                Teknologi Medis
              </span>
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">PT Medika Digital Nusantara</span>
            </div>
            <h3 class="text-xl font-bold text-[#023047] dark:text-white">
              Web Developer
            </h3>
            <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Bertanggung jawab memelihara kesehatan server operasional, menangani anomali secara tanggap di bawah jadwal kerja shifting, mengembangkan fitur layanan berbasis Laravel & PHP, serta merawat integritas basis data Oracle skala enterprise dalam kontainer Docker.
            </p>
            <div class="flex flex-wrap gap-2 pt-1 text-xs">
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#023047] text-slate-700 dark:text-slate-300">Laravel / PHP</span>
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#023047] text-slate-700 dark:text-slate-300">Oracle Database</span>
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#023047] text-slate-700 dark:text-slate-300">Docker</span>
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#023047] text-slate-700 dark:text-slate-300">Server Monitoring</span>
            </div>
          </div>
          <div class="text-xs font-bold text-slate-400 shrink-0">
            Sleman, D.I. Yogyakarta
          </div>
        </div>

        <!-- Experience 2 -->
        <div class="p-7 rounded-3xl bg-white dark:bg-[#034363] border-2 border-[#8ECAE6]/40 dark:border-[#219EBC]/30 shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div class="space-y-3 max-w-3xl">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold bg-[#219EBC]/20 text-[#219EBC] dark:text-[#8ECAE6]">
                Rekayasa Perangkat Lunak
              </span>
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Zettabyte Pte Ltd</span>
            </div>
            <h3 class="text-xl font-bold text-[#023047] dark:text-white">
              Backend Developer (Trainee)
            </h3>
            <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Mempelajari dan menerapkan rancangan skema basis data relasional (PostgreSQL) serta dokumen (MongoDB), mengimplementasikan lapisan keamanan API berbasis JSON Web Token (JWT), dan menyusun koleksi uji endpoint yang aman.
            </p>
            <div class="flex flex-wrap gap-2 pt-1 text-xs">
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#023047] text-slate-700 dark:text-slate-300">PostgreSQL</span>
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#023047] text-slate-700 dark:text-slate-300">MongoDB</span>
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#023047] text-slate-700 dark:text-slate-300">Keamanan REST API</span>
              <span class="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-[#023047] text-slate-700 dark:text-slate-300">JWT Auth</span>
            </div>
          </div>
          <div class="text-xs font-bold text-slate-400 shrink-0">
            Yogyakarta
          </div>
        </div>
      </div>
    </section>

    <!-- 6. CONTACT & TWILIGHT LANTERN (WARM GHIBLI INVITATION) -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div class="rounded-3xl bg-gradient-to-br from-[#023047] via-[#034363] to-[#011a27] text-white p-8 sm:p-12 shadow-xl relative overflow-hidden border border-[#219EBC]/30">
        <!-- Warm Lantern Firefly Glow -->
        <div class="absolute -right-10 -top-10 w-60 h-60 rounded-full bg-[#FFB703]/25 blur-3xl pointer-events-none"></div>
        <div class="absolute -left-10 -bottom-10 w-60 h-60 rounded-full bg-[#FB8500]/25 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-8 space-y-4">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#8ECAE6]/20 text-[#8ECAE6] border border-[#8ECAE6]/30">
              <span>🏮</span>
              <span>Lentera Sambung Rasa</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Mari Berbincang & Membangun Sesuatu yang Berkesan.
            </h2>
            <p class="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Apakah Anda membutuhkan rekan pengembang untuk merajut arsitektur backend yang tangguh, merawat basis data, atau membangun antarmuka web modern? Pintu studio selalu terbuka untuk kolaborasi yang hangat.
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
            </div>
          </div>

          <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <a
              href="mailto:contactmedianadi021@gmail.com"
              class="w-full text-center px-6 py-3.5 rounded-2xl font-bold text-white bg-[#FB8500] hover:bg-[#FB8500]/90 transition shadow-md shadow-[#FB8500]/30 text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Icon name="heroicons:paper-airplane-20-solid" class="w-4 h-4 text-[#FFB703]" />
              <span>Kirimkan Surat Digital</span>
            </a>
            <NuxtLink
              to="/mycv"
              class="w-full text-center px-6 py-3.5 rounded-2xl font-bold text-[#8ECAE6] bg-white/10 hover:bg-white/20 border border-white/25 transition text-sm flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <Icon name="heroicons:document-text-20-solid" class="w-4 h-4 text-[#8ECAE6]" />
              <span>Buka CV & Biodata (/mycv)</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
