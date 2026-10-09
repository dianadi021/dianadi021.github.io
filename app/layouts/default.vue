<script setup lang="ts">
const colorMode = useColorMode()
const appStore = useAppStore()
const route = useRoute()
const { $dayjs } = useNuxtApp()

const isHydrated = ref(false)
onMounted(() => {
  isHydrated.value = true
})

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
    <!-- Navbar Header -->
    <header class="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo & Brand -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="w-9 h-9 rounded-lg bg-[#023047] text-[#8ECAE6] border border-[#219EBC]/30 flex items-center justify-center font-bold text-base shadow-sm group-hover:border-[#219EBC] transition">
            DA
          </div>
          <div>
            <h1 class="text-base font-bold text-slate-900 dark:text-white leading-none group-hover:text-[#219EBC] transition">
              {{ appStore.appName }}
            </h1>
            <span class="text-xs text-[#219EBC] dark:text-[#8ECAE6] font-medium">Web & Backend Developer</span>
          </div>
        </NuxtLink>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center space-x-1">
          <NuxtLink
            to="/"
            class="px-3 py-2 rounded-lg text-sm font-medium transition"
            :class="route.path === '/' ? 'bg-[#219EBC]/10 text-[#219EBC] dark:text-[#8ECAE6] font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            Beranda
          </NuxtLink>
          <a
            href="/#projects"
            class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Proyek
          </a>
          <a
            href="/#skills"
            class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            Tech Stack
          </a>
          <NuxtLink
            to="/mycv"
            class="px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5"
            :class="route.path === '/mycv' ? 'bg-[#219EBC]/10 text-[#219EBC] dark:text-[#8ECAE6] font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
          >
            <span>Curriculum Vitae</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-[#FB8500] text-white font-bold leading-none">CV</span>
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <span>Showcase Lib</span>
          </NuxtLink>
        </nav>

        <!-- Status & Theme Controls -->
        <div class="flex items-center space-x-3">
          <!-- SSR / CSR Badge -->
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="isHydrated ? 'bg-success/10 text-success dark:bg-success/20 dark:text-success' : 'bg-warning/20 text-warning-700 dark:text-warning'"
          >
            {{ isHydrated ? '● CSR Hydrated' : '○ SSR Ready' }}
          </span>

          <!-- Dark Mode Toggle -->
          <button
            type="button"
            class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
            :title="`Ubah ke tema ${colorMode.value === 'dark' ? 'light' : 'dark'}`"
            @click="toggleTheme"
          >
            <Icon
              :name="colorMode.value === 'dark' ? 'heroicons:sun-20-solid' : 'heroicons:moon-20-solid'"
              class="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Slot -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Global Footer -->
    <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-xs text-slate-500 dark:text-slate-400">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <Icon name="heroicons:code-bracket-20-solid" class="w-4 h-4 text-[#219EBC]" />
          <span>© {{ new Date().getFullYear() }} Dian Adi Nugroho · Web & Backend Developer (dianadi021.github.io)</span>
        </div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="hover:text-[#219EBC] transition">Beranda</NuxtLink>
          <span>•</span>
          <a href="/#projects" class="hover:text-[#219EBC] transition">Proyek</a>
          <span>•</span>
          <NuxtLink to="/mycv" class="hover:text-[#FB8500] font-medium transition">Curriculum Vitae (/mycv)</NuxtLink>
          <span>•</span>
          <NuxtLink to="/about" class="hover:text-[#219EBC] transition">Showcase Lib (/about)</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
