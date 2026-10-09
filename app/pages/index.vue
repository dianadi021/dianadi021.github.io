<script setup lang="ts">
useSeoMeta({
  title: 'Dian Adi Nugroho | Web & Backend Developer',
  description: 'Portofolio profesional dan engineering showcase Dian Adi Nugroho. Spesialisasi arsitektur backend, Laravel, Express.js, PostgreSQL, Oracle, Docker, dan ekosistem web modern.',
  ogTitle: 'Dian Adi Nugroho | Web & Backend Developer',
  ogDescription: 'Portofolio profesional dan engineering showcase Dian Adi Nugroho. Spesialisasi arsitektur backend, Laravel, Express.js, PostgreSQL, Oracle, Docker, dan ekosistem web modern.',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

const { $dayjs, $swal } = useNuxtApp()

// Real-time formatted date using dayjs locale
const currentTime = computed(() => {
  return $dayjs().format('dddd, DD MMMM YYYY · HH:mm:ss')
})

// Skill category tabs
const activeTab = ref<'all' | 'backend' | 'database' | 'devops' | 'frontend'>('all')

const skills = [
  { name: 'Laravel', category: 'backend', role: 'Full-featured Backend Framework', icon: 'logos:laravel', highlight: 'Enterprise MVC & ORM' },
  { name: 'PHP', category: 'backend', role: 'Core Server-Side Language', icon: 'logos:php', highlight: 'OOP, Composer, Standard PSR' },
  { name: 'Express.js', category: 'backend', role: 'Minimalist Node.js Framework', icon: 'logos:express', highlight: 'RESTful API & Middleware' },
  { name: 'CodeIgniter', category: 'backend', role: 'Lightweight PHP Framework', icon: 'logos:codeigniter-icon', highlight: 'Legacy & Fast Delivery' },
  { name: 'Node.js', category: 'backend', role: 'JavaScript Runtime Environment', icon: 'logos:nodejs-icon', highlight: 'Asynchronous Event-driven' },
  { name: 'Lua', category: 'backend', role: 'Embedded Scripting Language', icon: 'logos:lua', highlight: 'Automation & Scripting' },
  
  { name: 'PostgreSQL', category: 'database', role: 'Relational Database Management', icon: 'logos:postgresql', highlight: 'Advanced Indexing & ACID' },
  { name: 'Oracle Database', category: 'database', role: 'Enterprise Database System', icon: 'logos:oracle', highlight: 'Mission-Critical Healthcare Data' },
  { name: 'MySQL', category: 'database', role: 'Open Source Relational Database', icon: 'logos:mysql-icon', highlight: 'Optimized Querying & Relations' },
  { name: 'MongoDB', category: 'database', role: 'Document-oriented NoSQL', icon: 'logos:mongodb-icon', highlight: 'Schema Design & Aggregation' },

  { name: 'Docker', category: 'devops', role: 'Containerization Platform', icon: 'logos:docker-icon', highlight: 'Container Isolation & Compose' },
  { name: 'Ubuntu Linux', category: 'devops', role: 'Production Server Environment', icon: 'logos:ubuntu', highlight: 'CLI, Cronjobs & Server Monitoring' },
  { name: 'Git & GitHub', category: 'devops', role: 'Version Control System', icon: 'logos:git-icon', highlight: 'Branching Strategy & CI/CD' },
  { name: 'Postman', category: 'devops', role: 'API Testing & Documentation', icon: 'logos:postman-icon', highlight: 'Automated Test Collections' },

  { name: 'Vue.js 3', category: 'frontend', role: 'Progressive JavaScript Framework', icon: 'logos:vue', highlight: 'Composition API & Reusable UI' },
  { name: 'Nuxt 4', category: 'frontend', role: 'Intuitive Full-Stack Framework', icon: 'logos:nuxt-icon', highlight: 'SSR, SSG & Nitro Engine' },
  { name: 'TypeScript', category: 'frontend', role: 'Typed JavaScript Superscript', icon: 'logos:typescript-icon', highlight: 'End-to-End Type Safety' },
  { name: 'Tailwind CSS', category: 'frontend', role: 'Utility-First CSS Framework', icon: 'logos:tailwindcss-icon', highlight: 'Modern Responsive Design System' }
]

const filteredSkills = computed(() => {
  if (activeTab.value === 'all') return skills
  return skills.filter(item => item.category === activeTab.value)
})

// Featured Projects Showcase
const projects = [
  {
    title: 'Hospital & Healthcare Core Management System',
    category: 'Enterprise Healthcare Backend',
    description: 'Sistem informasi manajemen kesehatan berstandar tinggi yang menangani antrian pasien, rekam medis, dan pelaporan terintegrasi dengan database Oracle dan framework Laravel.',
    features: [
      'Server monitoring 24/7 & penanganan bug pada shifting operasional padat',
      'Integrasi multi-tabel kompleks pada enterprise database Oracle',
      'Deployment lingkungan produksi terisolasi dengan kontainer Docker',
      'Arsitektur REST API aman untuk konsumsi client medis'
    ],
    tech: ['Laravel', 'PHP', 'Oracle DB', 'Docker', 'Ubuntu Linux'],
    badge: 'Production Proven',
    accentColor: '#023047'
  },
  {
    title: 'Secure Multi-Tenant REST API Platform',
    category: 'API Security & Microservices',
    description: 'Platform API modular dengan desain skema database ganda (MongoDB & PostgreSQL), dilengkapi proteksi JSON Web Token (JWT), sanitasi request, dan role-based access control.',
    features: [
      'Skema basis data relasional (PostgreSQL) dan dokumen fleksibel (MongoDB)',
      'Autentikasi berlapis JWT dengan mekanisme refresh token aman',
      'Validasi request ketat untuk mencegah injeksi dan payload anomali',
      'Koleksi pengujian otomatis via Postman test suite'
    ],
    tech: ['Express.js', 'Node.js', 'PostgreSQL', 'MongoDB', 'JWT', 'Postman'],
    badge: 'API Architecture',
    accentColor: '#219EBC'
  },
  {
    title: 'Modern Fullstack SSR & Jamstack Ecosystem',
    category: 'Frontend Engineering & DevTools',
    description: 'Infrastruktur frontend portofolio modular berbasis Nuxt 4 dan Vue 3 dengan rendering hibrida (SSR/SSG), state management Pinia, Tailwind CSS design system, dan integrasi GitHub Pages CI/CD.',
    features: [
      'Arsitektur tanpa siklus impor diverifikasi oleh Graphify dependency report',
      'Penyesuaian tema Dark/Light tanpa flicker hidrasi pada SSR',
      'Validasi formulir strictly-typed dengan Zod dan Axios interceptor',
      'Automasi build dan deployment static assets ke domain dianadi021.github.io'
    ],
    tech: ['Nuxt 4', 'Vue.js 3', 'TypeScript', 'Tailwind CSS', 'Pinia', 'GitHub Actions'],
    badge: 'Live Architecture',
    accentColor: '#FB8500'
  },
  {
    title: 'Automated Server Monitoring & Scripting Routine',
    category: 'DevOps & Systems Automation',
    description: 'Rangkaian skrip otomasi menggunakan Lua dan Bash Shell untuk memantau performa daemon server Ubuntu, peringatan dini beban memori, dan backup data periodik.',
    features: [
      'Pemantauan status service background dan pembersihan log otomatis',
      'Notifikasi peringatan dini beban CPU/RAM berbasis ambang batas',
      'Eksekusi terjadwal via Linux cron dan systemd service units',
      'Stabilitas operasional lingkungan produksi mandiri tanpa intervensi manual'
    ],
    tech: ['Lua', 'Bash Shell', 'Ubuntu Linux', 'Cron/Systemd', 'Docker'],
    badge: 'DevOps Routine',
    accentColor: '#FFB703'
  }
]

// Interactive Actions with SweetAlert2
const copyEmail = async () => {
  const email = 'contactmedianadi021@gmail.com'
  try {
    await navigator.clipboard.writeText(email)
    if ($swal) {
      $swal.fire({
        title: 'Email Berhasil Disalin!',
        text: `${email} telah tersimpan di clipboard Anda. Siap untuk kolaborasi!`,
        icon: 'success',
        confirmButtonColor: '#219EBC',
        timer: 3000,
        timerProgressBar: true
      })
    }
  } catch {
    if ($swal) {
      $swal.fire({
        title: 'Kontak Email',
        text: email,
        icon: 'info',
        confirmButtonColor: '#219EBC'
      })
    }
  }
}

const showBackendStatusAlert = () => {
  if ($swal) {
    $swal.fire({
      title: 'Backend Systems Ready',
      html: `
        <div class="text-left text-sm space-y-2 text-slate-700">
          <p>🟢 <strong>Node Engine:</strong> Active & Responsive</p>
          <p>🟢 <strong>Database Connectors:</strong> PostgreSQL, MySQL, Oracle, MongoDB configured</p>
          <p>🟢 <strong>Architecture:</strong> Zero Import Cycles (Graphify verified)</p>
          <p>🟢 <strong>Base URL:</strong> dianadi021.github.io</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Mantap!',
      confirmButtonColor: '#023047'
    })
  }
}
</script>

<template>
  <div class="space-y-24 py-6 sm:py-10">
    <!-- HERO SECTION -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Text & Branding Column -->
        <div class="lg:col-span-7 space-y-6 text-left">
          <!-- Availability Badge -->
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#219EBC]/10 text-[#023047] dark:text-[#8ECAE6] border border-[#219EBC]/30 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-[#198754] animate-pulse"></span>
            <span>Tersedia untuk Peran Backend & Fullstack Engineer</span>
          </div>

          <!-- Main Headline -->
          <div class="space-y-3">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Membangun Sistem <br class="hidden sm:inline" />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#219EBC] via-[#023047] to-[#FB8500] dark:from-[#8ECAE6] dark:via-[#219EBC] dark:to-[#FFB703]">
                Backend Tangguh
              </span> <br />
              & Web Modern.
            </h1>
            <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              Halo, saya <span class="font-bold text-[#023047] dark:text-[#8ECAE6]">Dian Adi Nugroho</span>. Web & Backend Developer dari Yogyakarta dengan pengalaman membangun RESTful API terproteksi, optimasi multi-database (Oracle, PostgreSQL, MongoDB), dan otomasi kontainer Docker.
            </p>
          </div>

          <!-- Quick Tech Pill Highlights -->
          <div class="flex flex-wrap items-center gap-2 pt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
            <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Laravel / PHP</span>
            <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Express.js / Node.js</span>
            <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">PostgreSQL & Oracle</span>
            <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Docker & Linux</span>
            <span class="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">Vue.js & Nuxt 4</span>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap items-center gap-3 pt-3">
            <a
              href="#projects"
              class="px-6 py-3 rounded-xl font-semibold text-white bg-[#FB8500] hover:bg-[#FB8500]/90 transition shadow-md shadow-[#FB8500]/20 flex items-center gap-2 text-sm"
            >
              <Icon name="heroicons:rocket-launch-20-solid" class="w-4 h-4" />
              Eksplorasi Proyek
            </a>

            <NuxtLink
              to="/mycv"
              class="px-5 py-3 rounded-xl font-semibold text-[#023047] dark:text-[#8ECAE6] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition flex items-center gap-2 text-sm"
            >
              <Icon name="heroicons:document-text-20-solid" class="w-4 h-4 text-[#219EBC]" />
              Detail CV & Biodata (/mycv)
            </NuxtLink>

            <button
              type="button"
              @click="copyEmail"
              class="px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-[#219EBC] dark:hover:text-[#8ECAE6] transition flex items-center gap-1.5"
              title="Salin alamat email"
            >
              <Icon name="heroicons:clipboard-document-check-20-solid" class="w-4 h-4" />
              <span>Salin Email</span>
            </button>
          </div>

          <!-- Quick Social Links -->
          <div class="flex items-center gap-4 pt-2 text-sm text-slate-500 dark:text-slate-400">
            <span class="text-xs uppercase tracking-wider font-semibold text-slate-400">Hubungkan:</span>
            <a href="https://github.com/dianadi021" target="_blank" rel="noopener noreferrer" class="hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition">
              <Icon name="simple-icons:github" class="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <a href="mailto:contactmedianadi021@gmail.com" class="hover:text-[#219EBC] flex items-center gap-1 transition">
              <Icon name="heroicons:envelope-20-solid" class="w-4 h-4 text-[#219EBC]" />
              <span>Email</span>
            </a>
            <span>•</span>
            <span class="flex items-center gap-1 text-slate-600 dark:text-slate-300">
              <Icon name="heroicons:map-pin-20-solid" class="w-4 h-4 text-[#FB8500]" />
              <span>Sleman, Yogyakarta</span>
            </span>
          </div>
        </div>

        <!-- Terminal / Live Mockup Card Column -->
        <div class="lg:col-span-5">
          <div class="rounded-2xl border border-slate-700 bg-[#023047] text-slate-200 shadow-2xl overflow-hidden font-mono text-xs">
            <!-- Window Bar -->
            <div class="px-4 py-3 bg-[#012232] border-b border-slate-700/80 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="w-3 h-3 rounded-full bg-danger block"></span>
                <span class="w-3 h-3 rounded-full bg-warning block"></span>
                <span class="w-3 h-3 rounded-full bg-success block"></span>
              </div>
              <div class="text-[11px] text-[#8ECAE6] font-semibold flex items-center gap-1">
                <Icon name="heroicons:command-line-20-solid" class="w-3.5 h-3.5" />
                <span>dianadi@dev-server:~</span>
              </div>
              <button
                type="button"
                @click="showBackendStatusAlert"
                class="text-[10px] px-2 py-0.5 rounded bg-[#219EBC]/20 text-[#8ECAE6] hover:bg-[#219EBC]/30 transition"
              >
                Inspect
              </button>
            </div>

            <!-- Terminal Body -->
            <div class="p-5 space-y-3 leading-relaxed">
              <div class="text-[#8ECAE6]">
                <span class="text-[#FB8500] font-bold">➜</span> <span class="text-white">whoami --verbose</span>
              </div>
              <div class="pl-3 border-l-2 border-[#219EBC]/40 space-y-1 text-slate-300">
                <p><span class="text-[#FFB703]">name:</span> "Dian Adi Nugroho"</p>
                <p><span class="text-[#FFB703]">role:</span> "Web Developer / Backend Developer"</p>
                <p><span class="text-[#FFB703]">location:</span> "Kab. Sleman, D.I. Yogyakarta"</p>
                <p><span class="text-[#FFB703]">domain:</span> "dianadi021.github.io"</p>
              </div>

              <div class="text-[#8ECAE6] pt-1">
                <span class="text-[#FB8500] font-bold">➜</span> <span class="text-white">cat stack.runtime.json</span>
              </div>
              <div class="pl-3 border-l-2 border-[#219EBC]/40 text-slate-300">
                <p class="text-emerald-400">// Core Stack Matrix</p>
                <p>"backend": ["Laravel", "PHP", "Express.js", "Node.js", "Lua"],</p>
                <p>"databases": ["PostgreSQL", "Oracle", "MySQL", "MongoDB"],</p>
                <p>"devops": ["Docker", "Ubuntu Linux", "Git", "Postman"],</p>
                <p>"frontend": ["Vue.js 3", "Nuxt 4", "Tailwind CSS", "TypeScript"]</p>
              </div>

              <div class="text-[#8ECAE6] pt-1">
                <span class="text-[#FB8500] font-bold">➜</span> <span class="text-white">uptime --status</span>
              </div>
              <div class="pl-3 border-l-2 border-[#198754] text-emerald-400">
                <p>● Status: 100% Operational | Zero Downtime Mindset</p>
                <p class="text-[10px] text-slate-400">{{ currentTime }}</p>
              </div>
            </div>

            <!-- Terminal Footer Action -->
            <div class="px-5 py-2.5 bg-[#011c2a] border-t border-slate-800 text-[11px] flex items-center justify-between text-slate-400">
              <span class="flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Active Session</span>
              </span>
              <button
                type="button"
                @click="showBackendStatusAlert"
                class="text-[#8ECAE6] hover:underline"
              >
                Click to Test Health Check ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- METRICS & IMPACT BAR -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="space-y-1 text-center md:text-left">
          <div class="text-3xl font-extrabold text-[#023047] dark:text-[#8ECAE6]">4+</div>
          <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">RDBMS & NoSQL</div>
          <div class="text-xs text-slate-600 dark:text-slate-400">Oracle, Postgres, Mongo, MySQL</div>
        </div>
        <div class="space-y-1 text-center md:text-left">
          <div class="text-3xl font-extrabold text-[#219EBC]">24/7</div>
          <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Server Monitoring</div>
          <div class="text-xs text-slate-600 dark:text-slate-400">Healthcare high-reliability infra</div>
        </div>
        <div class="space-y-1 text-center md:text-left">
          <div class="text-3xl font-extrabold text-[#FB8500]">REST & JWT</div>
          <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Secure Architecture</div>
          <div class="text-xs text-slate-600 dark:text-slate-400">Multi-tenant role authentication</div>
        </div>
        <div class="space-y-1 text-center md:text-left">
          <div class="text-3xl font-extrabold text-[#198754]">Dockerized</div>
          <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">DevOps & Linux</div>
          <div class="text-xs text-slate-600 dark:text-slate-400">Ubuntu Server & container isolation</div>
        </div>
      </div>
    </section>

    <!-- FEATURED PROJECTS SHOWCASE -->
    <section id="projects" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-[#219EBC] dark:text-[#8ECAE6]">Engineering Portfolio</span>
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Proyek & Rekayasa Sistem Unggulan
          </h2>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md">
          Implementasi nyata pada sistem skala enterprise, manajemen data kesehatan, dan arsitektur web modern.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(project, idx) in projects"
          :key="idx"
          class="group rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 p-6 shadow-sm hover:shadow-xl hover:border-[#219EBC]/60 transition-all duration-300 flex flex-col justify-between space-y-6"
        >
          <div class="space-y-4">
            <!-- Badge & Category -->
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#8ECAE6]/20 text-[#023047] dark:text-[#8ECAE6]">
                {{ project.category }}
              </span>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                {{ project.badge }}
              </span>
            </div>

            <!-- Title & Description -->
            <div class="space-y-2">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#219EBC] transition">
                {{ project.title }}
              </h3>
              <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <!-- Bullet Features -->
            <div class="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/60">
              <div
                v-for="(feat, fIdx) in project.features"
                :key="fIdx"
                class="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
              >
                <Icon name="heroicons:check-circle-20-solid" class="w-4 h-4 text-[#219EBC] shrink-0 mt-0.5" />
                <span>{{ feat }}</span>
              </div>
            </div>
          </div>

          <!-- Tech Tags -->
          <div class="pt-4 border-t border-slate-100 dark:border-slate-700/60">
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="t in project.tech"
                :key="t"
                class="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CORE TECHNICAL STACK & CAPABILITIES -->
    <section id="skills" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-[#FB8500]">Capabilities & Stack</span>
        <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white">
          Keahlian Teknis & Alat Rekayasa
        </h2>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Daftar framework, bahasa pemrograman, basis data, dan infrastruktur yang digunakan dalam proses rekayasa perangkat lunak.
        </p>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          @click="activeTab = 'all'"
          class="px-4 py-2 rounded-xl text-xs font-semibold transition"
          :class="activeTab === 'all' ? 'bg-[#023047] text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
        >
          Semua (16)
        </button>
        <button
          type="button"
          @click="activeTab = 'backend'"
          class="px-4 py-2 rounded-xl text-xs font-semibold transition"
          :class="activeTab === 'backend' ? 'bg-[#023047] text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
        >
          Backend & Runtime
        </button>
        <button
          type="button"
          @click="activeTab = 'database'"
          class="px-4 py-2 rounded-xl text-xs font-semibold transition"
          :class="activeTab === 'database' ? 'bg-[#023047] text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
        >
          Basis Data (SQL & NoSQL)
        </button>
        <button
          type="button"
          @click="activeTab = 'devops'"
          class="px-4 py-2 rounded-xl text-xs font-semibold transition"
          :class="activeTab === 'devops' ? 'bg-[#023047] text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
        >
          DevOps & Infrastruktur
        </button>
        <button
          type="button"
          @click="activeTab = 'frontend'"
          class="px-4 py-2 rounded-xl text-xs font-semibold transition"
          :class="activeTab === 'frontend' ? 'bg-[#023047] text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'"
        >
          Frontend Modern
        </button>
      </div>

      <!-- Skills Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="skill in filteredSkills"
          :key="skill.name"
          class="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:border-[#219EBC] hover:-translate-y-0.5 transition-all duration-200 space-y-2"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-base text-slate-900 dark:text-white">{{ skill.name }}</span>
            <Icon :name="skill.icon" class="w-6 h-6" />
          </div>
          <div class="text-xs text-slate-500 dark:text-slate-400">
            {{ skill.role }}
          </div>
          <div class="text-[11px] font-medium text-[#219EBC] dark:text-[#8ECAE6] bg-[#8ECAE6]/10 px-2 py-1 rounded">
            {{ skill.highlight }}
          </div>
        </div>
      </div>
    </section>

    <!-- CAREER HIGHLIGHTS TIMELINE (SUMMARY) -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-[#219EBC]">Rekam Jejak</span>
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Pengalaman Karir & Industri
          </h2>
        </div>
        <NuxtLink
          to="/mycv"
          class="text-xs font-bold text-[#FB8500] hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Buka CV Lengkap & Pendidikan</span>
          <Icon name="heroicons:arrow-right-20-solid" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="space-y-6">
        <!-- Experience 1 -->
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div class="space-y-2 max-w-3xl">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#023047] text-[#8ECAE6]">
                Healthcare Tech
              </span>
              <span class="text-xs text-slate-400">PT Medika Digital Nusantara</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">
              Web Developer
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Bertanggung jawab atas pemantauan server harian, mitigasi bug cepat, pengembangan fitur berbasis Laravel & PHP, pengelolaan database Oracle skala enterprise, serta kontainerisasi lingkungan aplikasi dengan Docker di bawah jadwal kerja shifting.
            </p>
            <div class="flex flex-wrap gap-2 pt-2">
              <span class="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Laravel</span>
              <span class="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Oracle Database</span>
              <span class="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Docker</span>
              <span class="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">Server Monitoring</span>
            </div>
          </div>
          <div class="text-xs font-medium text-slate-500 shrink-0">
            Sleman, D.I. Yogyakarta
          </div>
        </div>

        <!-- Experience 2 -->
        <div class="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div class="space-y-2 max-w-3xl">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#219EBC]/20 text-[#219EBC] dark:text-[#8ECAE6]">
                Software Engineering
              </span>
              <span class="text-xs text-slate-400">Zettabyte Pte Ltd</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">
              Backend Developer (Trainee)
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Mempelajari dan menerapkan perancangan skema basis data relational (PostgreSQL) serta NoSQL (MongoDB), implementasi keamanan REST API dengan protokol JWT, dan penulisan endpoints yang teruji secara komprehensif.
            </p>
            <div class="flex flex-wrap gap-2 pt-2">
              <span class="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">PostgreSQL</span>
              <span class="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">MongoDB</span>
              <span class="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">REST API Security</span>
              <span class="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">JWT Auth</span>
            </div>
          </div>
          <div class="text-xs font-medium text-slate-500 shrink-0">
            Yogyakarta
          </div>
        </div>
      </div>
    </section>

    <!-- CALL TO ACTION & CONTACT SECTION -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-3xl bg-gradient-to-br from-[#023047] via-[#034363] to-[#011a27] text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <!-- Background Accent Glow -->
        <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#219EBC]/20 blur-3xl pointer-events-none"></div>
        <div class="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-[#FB8500]/20 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-8 space-y-4">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#8ECAE6]/20 text-[#8ECAE6] border border-[#8ECAE6]/30">
              Mari Berkolaborasi
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Siap Membantu Mewujudkan Sistem yang Handal & Skalabel.
            </h2>
            <p class="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Apakah Anda membutuhkan pengembang backend untuk merancang REST API terproteksi, optimasi arsitektur database, atau membangun frontend modern berbasis Vue / Nuxt? Silakan hubungi saya langsung.
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
              class="w-full text-center px-6 py-3.5 rounded-xl font-bold text-white bg-[#FB8500] hover:bg-[#FB8500]/90 transition shadow-lg shadow-[#FB8500]/30 text-sm flex items-center justify-center gap-2"
            >
              <Icon name="heroicons:paper-airplane-20-solid" class="w-4 h-4" />
              Kirim Email Sekarang
            </a>
            <NuxtLink
              to="/mycv"
              class="w-full text-center px-6 py-3.5 rounded-xl font-bold text-[#8ECAE6] bg-white/10 hover:bg-white/20 border border-white/20 transition text-sm flex items-center justify-center gap-2"
            >
              <Icon name="heroicons:user-badge-20-solid" class="w-4 h-4" />
              Buka Halaman CV (/mycv)
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
