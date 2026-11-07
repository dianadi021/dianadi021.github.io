<script setup lang="ts">
const { x: mouseX, y: mouseY } = useMouse()
const isOnline = useOnline()
const { copy, copied } = useClipboard()
const samplePersistedNote = useLocalStorage('showcase_note', 'Teks ini tersimpan di LocalStorage secara reaktif!')
</script>

<template>
  <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
          <Icon name="heroicons:sparkles-20-solid" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-lg font-bold">3. VueUse Utilities (@vueuse/core) & Nuxt Icon</h2>
          <p class="text-xs text-slate-500">Komposisi reaktif peramban browser & ribuan icon</p>
        </div>
      </div>
      <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
        @vueuse/nuxt · @nuxt/icon
      </span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <!-- useMouse -->
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
        <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
          <Icon name="heroicons:cursor-arrow-rays-20-solid" class="w-4 h-4 text-primary" />
          <span>useMouse</span>
        </div>
        <div class="text-base font-mono font-bold text-slate-900 dark:text-white">
          X: {{ mouseX }} px · Y: {{ mouseY }} px
        </div>
        <p class="text-[11px] text-slate-500">Posisi kursor real-time</p>
      </div>

      <!-- useOnline -->
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
        <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
          <Icon name="heroicons:wifi-20-solid" class="w-4 h-4 text-info" />
          <span>useOnline</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="inline-block w-2.5 h-2.5 rounded-full"
            :class="isOnline ? 'bg-success animate-pulse' : 'bg-danger'"
          />
          <span class="text-sm font-bold">{{ isOnline ? 'Tersambung (Online)' : 'Offline' }}</span>
        </div>
        <p class="text-[11px] text-slate-500">Status konektivitas browser</p>
      </div>

      <!-- useClipboard -->
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
        <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
          <Icon name="heroicons:clipboard-document-check-20-solid" class="w-4 h-4 text-warning" />
          <span>useClipboard</span>
        </div>
        <button
          type="button"
          class="w-full px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-xs font-medium transition flex items-center justify-center gap-1.5"
          @click="copy('Nuxt All-Around Template: Copy Success!')"
        >
          <Icon :name="copied ? 'heroicons:check-20-solid' : 'heroicons:document-duplicate-20-solid'" class="w-3.5 h-3.5" />
          <span>{{ copied ? 'Tersalin ke Clipboard!' : 'Salin Teks Contoh' }}</span>
        </button>
        <p class="text-[11px] text-slate-500">Akses API Clipboard</p>
      </div>

      <!-- useLocalStorage -->
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
        <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
          <Icon name="heroicons:circle-stack-20-solid" class="w-4 h-4 text-primary" />
          <span>useLocalStorage</span>
        </div>
        <input
          v-model="samplePersistedNote"
          type="text"
          class="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800"
          placeholder="Ketik catatan..."
        >
        <p class="text-[11px] text-slate-500">Tersimpan otomatis di browser</p>
      </div>
    </div>

    <!-- Icon sets demo -->
    <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
      <span class="font-semibold text-slate-600 dark:text-slate-400">Dukungan Multi Icon Set (Nuxt Icon):</span>
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">
          <Icon name="heroicons:rocket-launch-20-solid" class="w-4 h-4 text-danger" /> Heroicons
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">
          <Icon name="lucide:heart" class="w-4 h-4 text-danger" /> Lucide
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">
          <Icon name="ph:lightning-fill" class="w-4 h-4 text-warning" /> Phosphor
        </span>
        <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-700">
          <Icon name="carbon:data-analytics" class="w-4 h-4 text-info" /> Carbon
        </span>
      </div>
    </div>
  </section>
</template>
