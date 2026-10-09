<script setup lang="ts">
const colorMode = useColorMode()
const appStore = useAppStore()
const route = useRoute()

const isHydrated = ref(false)
const activeHash = ref('')

onMounted(() => {
  isHydrated.value = true
  if (route.hash) {
    activeHash.value = route.hash
  }

  // Scroll listener to update active section on home page
  const handleScroll = () => {
    if (route.path !== '/') return
    const scrollPos = window.scrollY + 140
    const projectsEl = document.getElementById('projects')
    const skillsEl = document.getElementById('skills')

    if (skillsEl && scrollPos >= skillsEl.offsetTop) {
      activeHash.value = '#skills'
    } else if (projectsEl && scrollPos >= projectsEl.offsetTop) {
      activeHash.value = '#projects'
    } else {
      activeHash.value = ''
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
})

watch(() => route.hash, (newVal) => {
  activeHash.value = newVal || ''
})

watch(() => route.path, () => {
  activeHash.value = route.hash || ''
})

const isNavActive = (path: string, hash = '') => {
  if (hash) {
    return route.path === '/' && activeHash.value === hash
  }
  if (path === '/') {
    return route.path === '/' && !activeHash.value
  }
  return route.path === path
}

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#faf8f5] text-[#023047] dark:bg-[#023047] dark:text-[#f8f9fa] transition-colors duration-300 font-sans selection:bg-[#8ECAE6]/40 selection:text-[#023047]">
    <!-- Ghibli-Style Cloud & Warm Atmosphere Canvas Header -->
    <header class="border-b border-[#8ECAE6]/30 dark:border-[#219EBC]/20 bg-[#faf8f5]/90 dark:bg-[#023047]/90 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-2">
        <!-- Logo & Personal Brand Brandmark -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#219EBC] via-[#023047] to-[#FB8500] p-0.5 shadow-sm group-hover:rotate-3 transition-transform">
            <div class="w-full h-full bg-[#faf8f5] dark:bg-[#023047] rounded-[14px] flex items-center justify-center font-bold text-base text-[#219EBC] dark:text-[#8ECAE6]">
              🌿
            </div>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h1 class="text-base font-bold text-[#023047] dark:text-white leading-none tracking-tight group-hover:text-[#219EBC] transition">
                {{ appStore.appName }}
              </h1>
              <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-[#8ECAE6]/30 text-[#023047] dark:text-[#8ECAE6] font-semibold">
                Studio
              </span>
            </div>
            <span class="text-xs text-[#219EBC] dark:text-[#8ECAE6] font-medium block mt-0.5">
              Web & Backend Craftsman
            </span>
          </div>
        </NuxtLink>

        <!-- Navigation Links with Reactive Active State -->
        <nav class="hidden md:flex items-center space-x-1 p-1 rounded-full bg-white/70 dark:bg-[#034363]/60 border border-[#8ECAE6]/40 dark:border-[#219EBC]/30 shadow-xs">
          <!-- Beranda -->
          <NuxtLink
            to="/"
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            :class="isNavActive('/') ? 'bg-[#219EBC] text-white shadow-sm ring-2 ring-[#8ECAE6]/40' : 'text-[#023047] dark:text-[#8ECAE6] hover:bg-[#8ECAE6]/20 hover:text-[#023047] dark:hover:text-white'"
          >
            <span v-if="isNavActive('/')" class="w-1.5 h-1.5 rounded-full bg-[#FFB703]"></span>
            <span>Beranda</span>
          </NuxtLink>

          <!-- Proyek (#projects) -->
          <NuxtLink
            to="/#projects"
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            :class="isNavActive('/', '#projects') ? 'bg-[#219EBC] text-white shadow-sm ring-2 ring-[#8ECAE6]/40' : 'text-[#023047] dark:text-[#8ECAE6] hover:bg-[#8ECAE6]/20 hover:text-[#023047] dark:hover:text-white'"
          >
            <span v-if="isNavActive('/', '#projects')" class="w-1.5 h-1.5 rounded-full bg-[#FFB703]"></span>
            <span>Karya & Proyek</span>
          </NuxtLink>

          <!-- Tech Stack (#skills) -->
          <NuxtLink
            to="/#skills"
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            :class="isNavActive('/', '#skills') ? 'bg-[#219EBC] text-white shadow-sm ring-2 ring-[#8ECAE6]/40' : 'text-[#023047] dark:text-[#8ECAE6] hover:bg-[#8ECAE6]/20 hover:text-[#023047] dark:hover:text-white'"
          >
            <span v-if="isNavActive('/', '#skills')" class="w-1.5 h-1.5 rounded-full bg-[#FFB703]"></span>
            <span>Peralatan</span>
          </NuxtLink>

          <!-- Curriculum Vitae (/mycv) -->
          <NuxtLink
            to="/mycv"
            class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
            :class="isNavActive('/mycv') ? 'bg-[#FB8500] text-white shadow-sm ring-2 ring-[#FFB703]/50' : 'text-[#023047] dark:text-[#8ECAE6] hover:bg-[#8ECAE6]/20 hover:text-[#023047] dark:hover:text-white'"
          >
            <span v-if="isNavActive('/mycv')" class="w-1.5 h-1.5 rounded-full bg-[#FFB703]"></span>
            <span>Jejak Karir</span>
            <span class="text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase" :class="isNavActive('/mycv') ? 'bg-[#023047] text-[#FFB703]' : 'bg-[#FB8500] text-white'">
              CV
            </span>
          </NuxtLink>

          <!-- Showcase Lib (/about) -->
          <NuxtLink
            to="/about"
            class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1"
            :class="isNavActive('/about') ? 'bg-[#219EBC] text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-[#023047] dark:hover:text-[#8ECAE6] hover:bg-[#8ECAE6]/20'"
          >
            <span v-if="isNavActive('/about')" class="w-1.5 h-1.5 rounded-full bg-[#FFB703]"></span>
            <span>Showcase Lib</span>
          </NuxtLink>
        </nav>

        <!-- Right Side Controls -->
        <div class="flex items-center space-x-3">
          <!-- Atmosphere Badge -->
          <div class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-[#8ECAE6]/20 border border-[#219EBC]/30 text-[#023047] dark:text-[#8ECAE6]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#198754] animate-ping"></span>
            <span>{{ isHydrated ? 'Siap Berlayar' : 'Memuat...' }}</span>
          </div>

          <!-- Ghibli Sun/Moon Theme Toggle -->
          <button
            type="button"
            class="w-9 h-9 rounded-full bg-white dark:bg-[#034363] border border-[#8ECAE6]/50 dark:border-[#219EBC]/40 shadow-xs flex items-center justify-center text-[#FB8500] dark:text-[#FFB703] hover:scale-105 transition-transform"
            :title="`Ubah ke tema ${colorMode.value === 'dark' ? 'siang terang' : 'malam berbintang'}`"
            @click="toggleTheme"
          >
            <Icon
              :name="colorMode.value === 'dark' ? 'heroicons:sun-20-solid' : 'heroicons:moon-20-solid'"
              class="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Ghibli-Style Cozy Footer -->
    <footer class="border-t border-[#8ECAE6]/30 dark:border-[#219EBC]/20 bg-white/70 dark:bg-[#012232] py-10 text-xs transition-colors">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center space-x-3">
            <span class="text-xl">🍃</span>
            <div>
              <p class="font-bold text-[#023047] dark:text-white">Dian Adi Nugroho</p>
              <p class="text-slate-500 dark:text-slate-400">Merajut logika backend dan web dengan dedikasi dari Sleman, D.I. Yogyakarta</p>
            </div>
          </div>
          <div class="flex items-center gap-3 font-medium text-[#219EBC] dark:text-[#8ECAE6]">
            <NuxtLink to="/" class="hover:underline">Beranda</NuxtLink>
            <span>•</span>
            <NuxtLink to="/#projects" class="hover:underline">Karya</NuxtLink>
            <span>•</span>
            <NuxtLink to="/mycv" class="text-[#FB8500] font-bold hover:underline">Curriculum Vitae</NuxtLink>
            <span>•</span>
            <NuxtLink to="/about" class="hover:underline">Showcase Library</NuxtLink>
          </div>
        </div>
        <div class="border-t border-[#8ECAE6]/20 dark:border-[#219EBC]/10 pt-4 flex flex-col sm:flex-row items-center justify-between text-slate-400 dark:text-slate-500 gap-2">
          <p>© {{ new Date().getFullYear() }} dianadi021.github.io · Dibuat dengan cinta & sentuhan damai ala Studio Ghibli.</p>
          <div class="flex items-center gap-2 text-[#023047] dark:text-[#8ECAE6]">
            <span class="w-2 h-2 rounded-full bg-[#FFB703]"></span>
            <span>Nuxt 4 · Tailwind · Pinia</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

