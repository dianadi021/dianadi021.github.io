<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string | number
    id?: string
    label?: string
    type?: string
    placeholder?: string
    error?: string
    disabled?: boolean
    inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
  }>(),
  {
    id: undefined,
    label: undefined,
    type: 'text',
    placeholder: '',
    error: '',
    disabled: false,
    inputmode: 'text'
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
}>()

let autoId = ''
const inputId = computed(() => {
  if (props.id) return props.id
  if (!autoId) {
    autoId = `input-${Math.random().toString(36).slice(2, 9)}`
  }
  return autoId
})

const errorId = computed(() => `${inputId.value}-error`)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}
</script>

<template>
  <div class="space-y-1 text-left">
    <label
      v-if="props.label"
      :for="inputId"
      class="block text-xs font-semibold text-slate-700 dark:text-slate-200"
    >
      {{ props.label }}
    </label>

    <div class="relative">
      <input
        :id="inputId"
        :type="props.type"
        :value="props.modelValue"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :inputmode="props.inputmode"
        :aria-invalid="!!props.error"
        :aria-describedby="props.error ? errorId : undefined"
        class="w-full min-h-[44px] rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm transition duration-150 outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60 dark:disabled:bg-slate-800"
        :class="
          props.error
            ? 'border-rose-400 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-rose-400/30 dark:bg-rose-950/20 dark:text-rose-200'
            : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-[#219EBC] focus:ring-[#219EBC]/20 dark:border-slate-700 dark:bg-[#023047] dark:text-slate-100 dark:focus:border-[#8ECAE6]'
        "
        @input="handleInput"
      />
    </div>

    <span
      v-if="props.error"
      :id="errorId"
      role="alert"
      class="text-[11px] font-medium text-rose-600 dark:text-rose-400 block pt-0.5"
    >
      {{ props.error }}
    </span>
  </div>
</template>
