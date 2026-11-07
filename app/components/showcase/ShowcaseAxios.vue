<script setup lang="ts">
import axios from 'axios'

const { $api, $swal } = useNuxtApp()
const axiosLoading = ref(false)
const axiosResponse = ref<Record<string, unknown> | null>(null)
let abortController: AbortController | null = null

onBeforeUnmount(() => {
  if (abortController) {
    abortController.abort()
  }
})

const fetchDemoData = async () => {
  if (abortController) {
    abortController.abort()
  }
  abortController = new AbortController()

  axiosLoading.value = true
  axiosResponse.value = null
  try {
    // Memanfaatkan internal Nitro server route (/api/demo) via instance Axios ($api)
    const res = await $api.get('/api/demo', {
      signal: abortController.signal
    })
    axiosResponse.value = res.data as Record<string, unknown>
    if ($swal) {
      $swal.fire({
        icon: 'success',
        title: 'Axios Berhasil!',
        text: `Data diterima: ${(res.data as { title?: string }).title ?? 'Sukses'}`,
        confirmButtonColor: '#0d6efd'
      })
    }
  } catch (error: unknown) {
    if (axios.isCancel(error) || (error instanceof DOMException && error.name === 'AbortError')) {
      return
    }
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan sistem'
    axiosResponse.value = { error: message }
  } finally {
    axiosLoading.value = false
  }
}
</script>

<template>
  <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
          <Icon name="heroicons:arrow-path-20-solid" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-lg font-bold">8. Axios Client (axios)</h2>
          <p class="text-xs text-slate-500">Instance Axios plugin dengan interceptor request/response ke server route internal</p>
        </div>
      </div>
      <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
        $api / useNuxtApp()
      </span>
    </div>

    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-xs text-slate-600 dark:text-slate-400">
        Uji pemanggilan endpoint internal (<code>/api/demo</code>) via instance Axios yang terdaftar secara otomatis di Nuxt:
      </p>
      <button
        type="button"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white text-xs font-semibold transition"
        :disabled="axiosLoading"
        @click="fetchDemoData"
      >
        <Icon v-if="axiosLoading" name="heroicons:arrow-path-20-solid" class="w-4 h-4 animate-spin" />
        <Icon v-else name="heroicons:cloud-arrow-down-20-solid" class="w-4 h-4" />
        <span>{{ axiosLoading ? 'Memuat Data...' : 'Kirim Request Axios' }}</span>
      </button>
    </div>

    <!-- Result View -->
    <div v-if="axiosResponse" class="p-3 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <span class="text-[11px] font-mono text-slate-400 block mb-1">Response JSON ($api):</span>
      <pre class="text-xs font-mono text-slate-800 dark:text-slate-200 overflow-x-auto">{{ JSON.stringify(axiosResponse, null, 2) }}</pre>
    </div>
  </section>
</template>
