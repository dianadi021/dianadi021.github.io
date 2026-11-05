<script setup lang="ts">
const activeTab = ref<'all' | 'backend' | 'database' | 'devops' | 'frontend'>('all')

const skills = [
  // Mesin Backend & Skrip
  {
    name: 'Laravel',
    category: 'backend',
    role: 'Full-featured Backend Framework',
    icon: 'logos:laravel',
    note: 'Arsitektur MVC & Keandalan Layanan',
  },
  {
    name: 'PHP',
    category: 'backend',
    role: 'Bahasa Inti Server-Side',
    icon: 'logos:php',
    note: 'OOP, Composer, Standar PSR',
  },
  {
    name: 'Express.js',
    category: 'backend',
    role: 'Minimalist Node.js Framework',
    icon: 'logos:express',
    note: 'RESTful API & Middleware Terisolasi',
  },
  {
    name: 'Node.js',
    category: 'backend',
    role: 'JavaScript Runtime Environment',
    icon: 'logos:nodejs-icon',
    note: 'Event-driven Asynchronous IO',
  },
  {
    name: 'TypeScript',
    category: 'backend',
    role: 'Typed JavaScript Superscript',
    icon: 'logos:typescript-icon',
    note: 'Keamanan Tipe Statis & Refactoring Aman',
  },
  {
    name: 'JavaScript',
    category: 'backend',
    role: 'Bahasa Pemrograman Dinamis',
    icon: 'logos:javascript',
    note: 'ES6+, Asynchronous Logic & Event Loop',
  },
  {
    name: 'CodeIgniter',
    category: 'backend',
    role: 'Lightweight PHP Framework',
    icon: 'logos:codeigniter-icon',
    note: 'Pengembangan Cepat & Delivery Praktis',
  },
  {
    name: 'Lua',
    category: 'backend',
    role: 'Bahasa Skrip Tertanam & Otomasi',
    icon: 'logos:lua',
    note: 'Skrip Otomasi Server & Penjadwalan',
  },

  // Basis Data & Penyimpanan
  {
    name: 'PostgreSQL',
    category: 'database',
    role: 'Relational Database Terpercaya',
    icon: 'logos:postgresql',
    note: 'Integritas Relasi ACID & Kueri Lanjut',
  },
  {
    name: 'Oracle Database',
    category: 'database',
    role: 'Enterprise Database System',
    icon: 'logos:oracle',
    note: 'Data Rumah Sakit & Transaksi Kritis',
  },
  {
    name: 'MySQL',
    category: 'database',
    role: 'Relational Database Populer',
    icon: 'logos:mysql-icon',
    note: 'Optimasi Kueri & Relasi Multi-Tabel',
  },
  {
    name: 'MongoDB',
    category: 'database',
    role: 'Document-oriented NoSQL',
    icon: 'logos:mongodb-icon',
    note: 'Skema Fleksibel & Pipeline Agregasi',
  },

  // Infrastruktur & DevOps
  {
    name: 'Docker',
    category: 'devops',
    role: 'Platform Kontainerisasi Mandiri',
    icon: 'logos:docker-icon',
    note: 'Isolasi Lingkungan Bersih & Dockerfile',
  },
  {
    name: 'Ubuntu Linux',
    category: 'devops',
    role: 'Sistem Operasi Server Produksi',
    icon: 'logos:ubuntu',
    note: 'Server Monitoring & Systemd Daemons',
  },
  {
    name: 'Git & GitHub',
    category: 'devops',
    role: 'Kendali Versi & Kolaborasi',
    icon: 'logos:git-icon',
    note: 'Branching Strategy & GitHub Actions',
  },
  {
    name: 'GitLab',
    category: 'devops',
    role: 'DevOps & Repository Platform',
    icon: 'logos:gitlab',
    note: 'GitLab CI/CD Pipeline & Code Management',
  },
  {
    name: 'Postman',
    category: 'devops',
    role: 'API Testing & Documentation Suite',
    icon: 'logos:postman-icon',
    note: 'Koleksi Pengujian Endpoint Terotomasi',
  },

  // Antarmuka Web Modern
  {
    name: 'Vue.js 3',
    category: 'frontend',
    role: 'Progressive Web Framework',
    icon: 'logos:vue',
    note: 'Composition API Reaktif & Komponen Modular',
  },
  {
    name: 'Nuxt 4',
    category: 'frontend',
    role: 'Full-Stack Framework Hibrida',
    icon: 'logos:nuxt-icon',
    note: 'SSR, SSG Prerender & Performa Alami',
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    role: 'Utility-First CSS Framework',
    icon: 'logos:tailwindcss-icon',
    note: 'Sistem Desain Responsif & Tema Gelap/Terang',
  },
  {
    name: 'Bootstrap 5',
    category: 'frontend',
    role: 'CSS Framework & Grid System',
    icon: 'logos:bootstrap',
    note: 'Komponen Responsif & Palet Warna',
  },
]

const filteredSkills = computed(() => {
  if (activeTab.value === 'all') return skills
  return skills.filter((item) => item.category === activeTab.value)
})
</script>

<template>
  <section
    id="skills"
    class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24 text-left"
  >
    <div class="text-center max-w-2xl mx-auto space-y-2">
      <div
        class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FB8500]"
      >
        <span>🧰</span>
        <span>Perlengkapan & Piranti Rekayasa</span>
      </div>
      <h2 class="text-3xl font-extrabold text-[#023047] dark:text-white">
        Koleksi Perkakas Sang Pengrajin
      </h2>
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Bahasa, kerangka kerja, basis data, dan sarana infrastruktur yang digunakan dalam
        merancang sistem.
      </p>
    </div>

    <!-- Filter Tabs -->
    <div class="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        @click="activeTab = 'all'"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
        :class="
          activeTab === 'all'
            ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]'
            : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'
        "
      >
        Semua Perkakas ({{ skills.length }})
      </button>
      <button
        type="button"
        @click="activeTab = 'backend'"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
        :class="
          activeTab === 'backend'
            ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]'
            : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'
        "
      >
        Mesin Backend & Skrip
      </button>
      <button
        type="button"
        @click="activeTab = 'database'"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
        :class="
          activeTab === 'database'
            ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]'
            : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'
        "
      >
        Basis Data & Penyimpanan
      </button>
      <button
        type="button"
        @click="activeTab = 'devops'"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
        :class="
          activeTab === 'devops'
            ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]'
            : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'
        "
      >
        Infrastruktur & DevOps
      </button>
      <button
        type="button"
        @click="activeTab = 'frontend'"
        class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-xs"
        :class="
          activeTab === 'frontend'
            ? 'bg-[#023047] text-white ring-2 ring-[#8ECAE6]'
            : 'bg-white dark:bg-[#034363] text-slate-700 dark:text-slate-300 hover:bg-[#8ECAE6]/20'
        "
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
          <span class="font-extrabold text-base text-[#023047] dark:text-white">{{
            skill.name
          }}</span>
          <Icon :name="skill.icon" class="w-6 h-6" />
        </div>
        <div class="text-xs text-slate-500 dark:text-slate-400">
          {{ skill.role }}
        </div>
        <div
          class="text-[11px] font-semibold text-[#023047] dark:text-[#8ECAE6] bg-[#8ECAE6]/20 dark:bg-[#023047] px-3 py-1 rounded-full inline-block"
        >
          🌱 {{ skill.note }}
        </div>
      </div>
    </div>
  </section>
</template>
