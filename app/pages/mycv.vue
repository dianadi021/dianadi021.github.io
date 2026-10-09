<script setup lang="ts">
useSeoMeta({
  title: 'Curriculum Vitae (ATS) | Dian Adi Nugroho - Web & Backend Developer',
  description: 'Curriculum Vitae standar ATS Dian Adi Nugroho, Web Developer & Backend Developer. Berpengalaman di Laravel, Express.js, PostgreSQL, Oracle Database, Docker, dan REST API security.',
  ogTitle: 'Curriculum Vitae (ATS) | Dian Adi Nugroho',
  ogDescription: 'Curriculum Vitae format ramah ATS Dian Adi Nugroho. Lengkap dengan riwayat kerja industri, keahlian teknis, dan portofolio.',
  ogType: 'profile',
  ogUrl: 'https://dianadi021.github.io/mycv',
  robots: 'index, follow'
})

const printResume = () => {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 print:p-0 print:m-0 print:max-w-full">
    <!-- Top Bar: Navigation & Print Actions (Hidden on Print) -->
    <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#8ECAE6]/40 dark:border-[#219EBC]/30 pb-4 print:hidden">
      <div class="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
        <NuxtLink to="/" class="hover:text-[#219EBC] flex items-center gap-1 font-semibold transition">
          <Icon name="heroicons:arrow-left-20-solid" class="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </NuxtLink>
        <span>/</span>
        <span class="text-[#023047] dark:text-[#8ECAE6] font-bold">Curriculum Vitae (Format ATS)</span>
      </div>

      <div class="flex items-center gap-2.5">
        <button
          type="button"
          @click="printResume"
          class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#FB8500] hover:bg-[#FB8500]/90 text-white transition flex items-center gap-1.5 shadow-sm"
          title="Cetak langsung atau simpan sebagai file PDF"
        >
          <Icon name="heroicons:printer-20-solid" class="w-4 h-4" />
          <span>Cetak / Unduh PDF</span>
        </button>

        <a
          href="mailto:contactmedianadi021@gmail.com"
          class="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-[#034363] border border-[#219EBC]/40 text-[#023047] dark:text-[#8ECAE6] hover:bg-[#8ECAE6]/20 transition flex items-center gap-1.5 shadow-xs"
        >
          <Icon name="heroicons:envelope-20-solid" class="w-4 h-4 text-[#219EBC]" />
          <span>Hubungi</span>
        </a>
      </div>
    </header>

    <!-- ATS-COMPLIANT RESUME CONTAINER -->
    <article class="bg-white text-slate-900 dark:bg-white dark:text-slate-900 border border-slate-300 rounded-2xl p-8 sm:p-12 shadow-md print:shadow-none print:border-none print:p-0 print:rounded-none space-y-8 font-sans leading-relaxed">
      
      <!-- 1. HEADER SECTION (CONTACT & IDENTITY) -->
      <header class="border-b-2 border-slate-900 pb-5 text-center sm:text-left space-y-2">
        <div class="space-y-1">
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 uppercase">
            Dian Adi Nugroho
          </h1>
          <p class="text-base sm:text-lg font-bold text-[#023047]">
            Web Developer / Backend Developer
          </p>
        </div>

        <!-- Coordinates Contact Bar -->
        <address class="not-italic text-xs sm:text-sm text-slate-700 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 pt-1 font-medium">
          <span>Kab. Sleman, D.I. Yogyakarta, Indonesia</span>
          <span class="hidden sm:inline">•</span>
          <a href="mailto:contactmedianadi021@gmail.com" class="hover:underline text-slate-900">
            contactmedianadi021@gmail.com
          </a>
          <span class="hidden sm:inline">•</span>
          <a href="tel:+6285179997321" class="hover:underline text-slate-900">
            +62 851-7999-7321
          </a>
          <span class="hidden sm:inline">•</span>
          <a href="https://dianadi021.github.io" target="_blank" rel="noopener noreferrer" class="hover:underline text-slate-900">
            dianadi021.github.io
          </a>
          <span class="hidden sm:inline">•</span>
          <a href="https://github.com/dianadi021" target="_blank" rel="noopener noreferrer" class="hover:underline text-slate-900">
            github.com/dianadi021
          </a>
        </address>
      </header>

      <!-- 2. PROFESSIONAL SUMMARY -->
      <section class="space-y-2 text-left">
        <h2 class="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1">
          Ringkasan Profesional
        </h2>
        <p class="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
          Web Developer dan Backend Developer dengan pengalaman dalam merancang arsitektur RESTful API yang aman, memelihara keandalan server 24/7 di bawah jadwal kerja shifting, serta mengoptimalkan skema basis data relasional (PostgreSQL, Oracle DB, MySQL) dan non-relasional (MongoDB). Terbiasa mengelola kontainerisasi aplikasi menggunakan Docker di lingkungan server Ubuntu Linux, menerapkan penanganan bug secara cepat, dan membangun antarmuka web modern berbasis Vue.js dan Nuxt.
        </p>
      </section>

      <!-- 3. TECHNICAL SKILLS (GROUPED FOR ATS PARSING) -->
      <section class="space-y-3 text-left">
        <h2 class="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1">
          Keahlian Teknis
        </h2>
        <div class="text-xs sm:text-sm space-y-1.5 text-slate-800">
          <div>
            <strong class="font-bold text-slate-950">Bahasa Pemrograman:</strong>
            <span> PHP, JavaScript, TypeScript, Lua, HTML5, CSS3</span>
          </div>
          <div>
            <strong class="font-bold text-slate-950">Framework & Runtime:</strong>
            <span> Laravel, Express.js, Node.js, CodeIgniter, Vue.js 3, Nuxt 4</span>
          </div>
          <div>
            <strong class="font-bold text-slate-950">Basis Data (Databases):</strong>
            <span> PostgreSQL, Oracle Database, MySQL, MongoDB</span>
          </div>
          <div>
            <strong class="font-bold text-slate-950">DevOps & Tools:</strong>
            <span> Docker, Ubuntu Linux, Git, GitHub, GitLab, Postman, REST API Security, JWT Authentication</span>
          </div>
          <div>
            <strong class="font-bold text-slate-950">Styling & UI Library:</strong>
            <span> Tailwind CSS, Bootstrap 5, Headless UI</span>
          </div>
        </div>
      </section>

      <!-- 4. PROFESSIONAL WORK EXPERIENCE -->
      <section class="space-y-5 text-left">
        <h2 class="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1">
          Pengalaman Kerja
        </h2>

        <!-- Experience 1 -->
        <div class="space-y-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between">
            <div>
              <h3 class="text-base font-bold text-slate-950">
                Web Developer
              </h3>
              <p class="text-xs sm:text-sm font-semibold text-[#023047]">
                PT Medika Digital Nusantara
              </p>
            </div>
            <div class="text-xs sm:text-sm text-slate-600 sm:text-right font-medium">
              <span>Sleman, D.I. Yogyakarta</span> · <span>Penuh Waktu</span>
            </div>
          </div>
          <ul class="list-disc list-outside ml-4 text-xs sm:text-sm text-slate-800 space-y-1.5 text-justify">
            <li>
              Menjalankan pemantauan server harian (server monitoring 24/7) secara konsisten dan tanggap menyelesaikan anomali teknis di bawah jadwal kerja shifting yang dinamis.
            </li>
            <li>
              Mendiagnosis dan melakukan perbaikan bug (rapid bug fixing) secara cepat dan terukur pada modul-modul sistem manajemen rumah sakit.
            </li>
            <li>
              Mengembangkan fitur-fitur aplikasi baru menggunakan framework Laravel dan PHP yang terintegrasi langsung dengan enterprise database Oracle.
            </li>
            <li>
              Mengelola isolasi lingkungan kerja menggunakan kontainer Docker pada server produksi Ubuntu Linux untuk memastikan keselarasan deployment.
            </li>
            <li>
              Mengoptimalkan kueri data medis guna menjamin kelancaran transaksi pasien dalam volume tinggi.
            </li>
          </ul>
        </div>

        <!-- Experience 2 -->
        <div class="space-y-2 pt-2">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between">
            <div>
              <h3 class="text-base font-bold text-slate-950">
                Backend Developer (Trainee)
              </h3>
              <p class="text-xs sm:text-sm font-semibold text-[#023047]">
                Zettabyte Pte Ltd
              </p>
            </div>
            <div class="text-xs sm:text-sm text-slate-600 sm:text-right font-medium">
              <span>Yogyakarta</span> · <span>Trainee / Magang</span>
            </div>
          </div>
          <ul class="list-disc list-outside ml-4 text-xs sm:text-sm text-slate-800 space-y-1.5 text-justify">
            <li>
              Merancang skema basis data relasional menggunakan PostgreSQL dan skema dokumen NoSQL menggunakan MongoDB yang terstruktur dan scalable.
            </li>
            <li>
              Mengimplementasikan protokol keamanan RESTful API menggunakan otentikasi JSON Web Token (JWT) dengan mekanisme validasi payload.
            </li>
            <li>
              Membangun endpoint API modular berbasis Express.js dan Node.js yang mematuhi konvensi RESTful baku.
            </li>
            <li>
              Menyusun koleksi pengujian otomatis menggunakan Postman untuk menjamin keandalan respons rute API.
            </li>
          </ul>
        </div>
      </section>

      <!-- 5. INDEPENDENT PROJECTS & ENGINEERING PORTFOLIO -->
      <section class="space-y-4 text-left">
        <h2 class="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1">
          Proyek & Portofolio Rekayasa
        </h2>

        <!-- Project 1 -->
        <div class="space-y-1">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between">
            <h3 class="text-sm font-bold text-slate-950">
              Modern Fullstack SSR & Jamstack Platform — <span class="font-normal text-xs text-slate-600">dianadi021.github.io</span>
            </h3>
            <span class="text-xs text-slate-600">Nuxt 4, Vue 3, Tailwind CSS, TypeScript</span>
          </div>
          <ul class="list-disc list-outside ml-4 text-xs sm:text-sm text-slate-800 space-y-1">
            <li>
              Membangun portofolio web hibrida (SSR/SSG) dengan arsitektur bebas siklus impor (zero import cycle) yang diverifikasi oleh analisis dependency Graphify.
            </li>
            <li>
              Mengimplementasikan otomasi CI/CD menggunakan GitHub Actions untuk build dan prerender static assets ke GitHub Pages.
            </li>
          </ul>
        </div>

        <!-- Project 2 -->
        <div class="space-y-1 pt-1">
          <div class="flex flex-col sm:flex-row sm:items-baseline justify-between">
            <h3 class="text-sm font-bold text-slate-950">
              Automated Server Monitoring & Maintenance Scripts
            </h3>
            <span class="text-xs text-slate-600">Lua, Bash Shell, Linux Systemd, Cron</span>
          </div>
          <ul class="list-disc list-outside ml-4 text-xs sm:text-sm text-slate-800 space-y-1">
            <li>
              Menulis skrip otomasi untuk memantau ambang batas beban CPU/memori server Ubuntu, rotasi berkas log, dan pencadangan database periodik.
            </li>
          </ul>
        </div>
      </section>

      <!-- 6. EDUCATION & CERTIFICATION -->
      <section class="space-y-3 text-left">
        <h2 class="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-1">
          Pendidikan & Lokasi
        </h2>
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
          <div>
            <h3 class="font-bold text-slate-950">Pendidikan Bidang Rekayasa Perangkat Lunak / Web Development</h3>
            <p class="text-slate-700">Fokus Pengembangan Backend, Arsitektur Basis Data, & Infrastruktur Web</p>
          </div>
          <div class="text-slate-600 font-medium sm:text-right">
            D.I. Yogyakarta, Indonesia
          </div>
        </div>
      </section>

      <!-- Footer Note -->
      <footer class="pt-4 border-t border-slate-300 text-[11px] text-slate-500 text-center">
        Curriculum Vitae ini disusun untuk keterbacaan optimal oleh Applicant Tracking System (ATS) dan tim rekruter.
      </footer>
    </article>
  </main>
</template>
