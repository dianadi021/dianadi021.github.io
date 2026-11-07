<script setup lang="ts">
const appStore = useAppStore()
</script>

<template>
  <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-warning/20 text-warning-700 dark:text-warning flex items-center justify-center font-bold text-sm">
          <Icon name="heroicons:circle-stack-20-solid" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-lg font-bold">4. Pinia State Management (@pinia/nuxt)</h2>
          <p class="text-xs text-slate-500">State terpusat reaktif yang tersinkronisasi antar-halaman</p>
        </div>
      </div>
      <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
        app/stores/app.ts
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center text-center space-y-1">
        <span class="text-xs text-slate-500">Nilai Counter Store</span>
        <div class="text-3xl font-extrabold text-primary font-mono">{{ appStore.counter }}</div>
        <span class="text-xs text-slate-400">Getter Double Counter: <strong>{{ appStore.doubleCounter }}</strong></span>
      </div>

      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center gap-2">
        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 px-3 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white font-bold text-sm transition"
            @click="appStore.increment"
          >
            + Tambah (Increment)
          </button>
          <button
            type="button"
            class="flex-1 px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-sm transition"
            @click="appStore.decrement"
          >
            - Kurang (Decrement)
          </button>
        </div>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs text-slate-600 dark:text-slate-300 transition"
          @click="appStore.resetCounter"
        >
          Reset Counter ke 0
        </button>
      </div>

      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col justify-center space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <p>
          Nilai counter ini akan tetap sinkron ketika kamu berpindah kembali ke halaman <strong>Beranda (/)</strong> karena tersimpan di store global Pinia.
        </p>
        <div class="text-[11px] text-slate-500">
          Nama App: <code class="font-bold text-primary">{{ appStore.appName }}</code>
        </div>
      </div>
    </div>
  </section>
</template>
