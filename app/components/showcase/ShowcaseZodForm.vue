<script setup lang="ts">
import { z } from 'zod'

const { $swal } = useNuxtApp()

const zodFormSchema = z.object({
  fullName: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Format email tidak valid'),
  age: z.coerce.number().min(18, 'Usia minimal 18 tahun').max(100, 'Usia maksimal 100 tahun')
})

type ZodFormData = z.infer<typeof zodFormSchema>
const formData = reactive<ZodFormData>({
  fullName: '',
  email: '',
  age: 20
})
const formErrors = ref<Record<string, string>>({})
const formSuccess = ref(false)

const handleAgeInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const sanitized = target.value.replace(/\D/g, '')
  target.value = sanitized
  formData.age = sanitized === '' ? ('' as unknown as number) : Number(sanitized)
}

const handleZodSubmit = () => {
  formErrors.value = {}
  formSuccess.value = false
  const parseResult = zodFormSchema.safeParse(formData)

  if (!parseResult.success) {
    const formatted = parseResult.error.format()
    if (formatted.fullName?._errors?.[0]) formErrors.value.fullName = formatted.fullName._errors[0]
    if (formatted.email?._errors?.[0]) formErrors.value.email = formatted.email._errors[0]
    if (formatted.age?._errors?.[0]) formErrors.value.age = formatted.age._errors[0]
  } else {
    formSuccess.value = true
    $swal?.fire({
      title: 'Validasi Zod Lolos!',
      text: `Data valid: ${JSON.stringify(parseResult.data)}`,
      icon: 'success',
      confirmButtonColor: '#198754'
    })
  }
}
</script>

<template>
  <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-sm">
          <Icon name="heroicons:shield-check-20-solid" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-lg font-bold">7. Zod Form Validation (zod)</h2>
          <p class="text-xs text-slate-500">Validasi skema TypeScript yang aman dan deklaratif</p>
        </div>
      </div>
      <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
        zod safeParse
      </span>
    </div>

    <form class="grid grid-cols-1 md:grid-cols-3 gap-4" @submit.prevent="handleZodSubmit">
      <!-- Full Name Input -->
      <div class="space-y-1">
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Nama Lengkap (min 3 char)</label>
        <input
          v-model="formData.fullName"
          type="text"
          class="w-full text-xs px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-800"
          :class="formErrors.fullName ? 'border-danger focus:ring-danger' : 'border-slate-300 dark:border-slate-700'"
          placeholder="Misal: John Doe"
        >
        <span v-if="formErrors.fullName" class="text-[11px] text-danger font-medium block">{{ formErrors.fullName }}</span>
      </div>

      <!-- Email Input -->
      <div class="space-y-1">
        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Alamat Email</label>
        <input
          v-model="formData.email"
          type="text"
          class="w-full text-xs px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-800"
          :class="formErrors.email ? 'border-danger focus:ring-danger' : 'border-slate-300 dark:border-slate-700'"
          placeholder="nama@domain.com"
        >
        <span v-if="formErrors.email" class="text-[11px] text-danger font-medium block">{{ formErrors.email }}</span>
      </div>

      <!-- Age Input -->
      <div class="space-y-1">
        <label for="zod-age" class="block text-xs font-semibold text-slate-700 dark:text-slate-300">Usia (18 - 100 tahun)</label>
        <input
          id="zod-age"
          :value="formData.age"
          type="text"
          inputmode="numeric"
          :aria-invalid="!!formErrors.age"
          :aria-describedby="formErrors.age ? 'zod-age-error' : undefined"
          class="w-full text-xs px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none dark:bg-slate-800"
          :class="formErrors.age ? 'border-danger focus:ring-danger' : 'border-slate-300 dark:border-slate-700'"
          @input="handleAgeInput"
        >
        <span v-if="formErrors.age" id="zod-age-error" role="alert" class="text-[11px] text-danger font-medium block">{{ formErrors.age }}</span>
      </div>

      <!-- Submit Button -->
      <footer class="md:col-span-3 flex items-center justify-between pt-2">
        <span v-if="formSuccess" class="text-xs text-success font-semibold flex items-center gap-1">
          <Icon name="heroicons:check-circle-20-solid" class="w-4 h-4" />
          Validasi Berhasil & Lolos Zod Schema!
        </span>
        <span v-else class="text-xs text-slate-400">Tekan tombol untuk menguji validator Zod</span>

        <button
          type="submit"
          class="min-h-[44px] px-5 py-2 rounded-lg bg-primary hover:bg-primary-600 text-white text-xs font-bold transition shadow-xs flex items-center justify-center"
        >
          Uji Validasi Form (Zod)
        </button>
      </footer>
    </form>
  </section>
</template>
