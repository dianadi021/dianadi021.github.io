<script setup lang="ts">
const { $swal } = useNuxtApp()

const triggerSuccessSwal = () => {
  $swal?.fire({
    title: 'Sukses!',
    text: 'Ini adalah SweetAlert2 standar dengan Bootstrap primary color.',
    icon: 'success',
    confirmButtonColor: '#0d6efd'
  })
}

const triggerConfirmSwal = async () => {
  if (!$swal) return
  const result = await $swal.fire({
    title: 'Apakah kamu yakin?',
    text: 'Aksi ini mendemonstrasikan dialog konfirmasi asinkron.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Ya, eksekusi!',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    $swal.fire({
      title: 'Dikonfirmasi!',
      text: 'Kamu menekan tombol konfirmasi.',
      icon: 'success',
      confirmButtonColor: '#198754'
    })
  }
}

const triggerToastSwal = () => {
  $swal?.fire({
    toast: true,
    position: 'top-end',
    icon: 'info',
    title: 'Toast notifikasi berhasil dimunculkan!',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })
}
</script>

<template>
  <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-4">
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div class="flex items-center gap-2">
        <Icon name="heroicons:bell-20-solid" class="w-5 h-5 text-warning" />
        <h2 class="text-base font-bold">5. SweetAlert2 (sweetalert2)</h2>
      </div>
      <span class="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono text-slate-500">CSR Plugin Safe</span>
    </div>

    <p class="text-xs text-slate-500">SweetAlert2 dikonfigurasi melalui plugin client-only sehingga 100% aman dan tidak menyebabkan error SSR.</p>

    <div class="flex flex-wrap gap-2.5">
      <button
        type="button"
        class="px-3.5 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white text-xs font-semibold transition"
        @click="triggerSuccessSwal"
      >
        Alert Sukses
      </button>
      <button
        type="button"
        class="px-3.5 py-2 rounded-lg bg-danger hover:bg-danger-600 text-white text-xs font-semibold transition"
        @click="triggerConfirmSwal"
      >
        Dialog Konfirmasi
      </button>
      <button
        type="button"
        class="px-3.5 py-2 rounded-lg bg-info hover:bg-info-600 text-slate-900 text-xs font-semibold transition"
        @click="triggerToastSwal"
      >
        Toast Notification
      </button>
    </div>
  </div>
</template>
