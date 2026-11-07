<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'luxury'
    type?: 'button' | 'submit' | 'reset'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    ariaBusy?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    size: 'md',
    disabled: false,
    loading: false,
    ariaBusy: false
  }
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const isLocked = computed(() => props.disabled || props.loading)

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-[#FB8500] hover:bg-[#e87500] text-white shadow-xs focus-visible:ring-[#FB8500]'
    case 'secondary':
      return 'bg-white dark:bg-[#034363] border border-slate-200 dark:border-slate-600 text-[#023047] dark:text-white hover:bg-slate-50 dark:hover:bg-[#023047] shadow-2xs focus-visible:ring-[#219EBC]'
    case 'danger':
      return 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus-visible:ring-rose-500'
    case 'ghost':
      return 'bg-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 focus-visible:ring-[#219EBC]'
    case 'luxury':
      return 'bg-gradient-to-r from-[#D4AF37] to-[#C5A880] hover:from-[#c29e2e] hover:to-[#b3956d] text-white font-serif shadow-md focus-visible:ring-[#D4AF37]'
    default:
      return 'bg-[#FB8500] hover:bg-[#e87500] text-white shadow-xs'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'min-h-[36px] px-3 py-1.5 text-xs'
    case 'lg':
      return 'min-h-[48px] px-6 py-3 text-sm'
    case 'md':
    default:
      return 'min-h-[44px] px-4 py-2 text-xs sm:text-sm'
  }
})

const handleClick = (event: MouseEvent) => {
  if (!isLocked.value) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="props.type"
    :disabled="isLocked"
    :aria-busy="props.loading || props.ariaBusy"
    class="inline-flex items-center justify-center gap-2 rounded-xl font-bold transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 select-none"
    :class="[variantClasses, sizeClasses]"
    @click="handleClick"
  >
    <svg
      v-if="props.loading"
      class="h-4 w-4 animate-spin text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>
