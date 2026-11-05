<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'

const isOpen = ref(false)
const query = ref('')
const router = useRouter()
const colorMode = useColorMode()
const { $swal } = useNuxtApp()

interface CommandItem {
  id: string
  title: string
  category: 'Navigasi' | 'Aksi' | 'Preferensi'
  icon: string
  shortcut?: string
  action: () => void
}

const commands: CommandItem[] = [
  {
    id: 'nav-home',
    title: 'Ke Halaman Beranda',
    category: 'Navigasi',
    icon: 'heroicons:home-20-solid',
    shortcut: 'G H',
    action: () => router.push('/'),
  },
  {
    id: 'nav-experience',
    title: 'Ke Bagian Riwayat Pengalaman Industri',
    category: 'Navigasi',
    icon: 'heroicons:briefcase-20-solid',
    shortcut: 'G E',
    action: () => router.push('/#experience'),
  },
  {
    id: 'nav-skills',
    title: 'Ke Bagian Keahlian & Teknologi',
    category: 'Navigasi',
    icon: 'heroicons:code-bracket-20-solid',
    shortcut: 'G S',
    action: () => router.push('/#skills'),
  },
  {
    id: 'nav-topsis',
    title: 'Buka Kalkulator TOPSIS',
    category: 'Navigasi',
    icon: 'heroicons:calculator-20-solid',
    shortcut: 'G T',
    action: () => router.push('/portofolio/topsis'),
  },
  {
    id: 'nav-cv',
    title: 'Buka Curriculum Vitae (ATS-Friendly)',
    category: 'Navigasi',
    icon: 'heroicons:document-text-20-solid',
    shortcut: 'G C',
    action: () => router.push('/mycv'),
  },
  {
    id: 'nav-showcase',
    title: 'Buka Showcase Fitur Template',
    category: 'Navigasi',
    icon: 'heroicons:sparkles-20-solid',
    action: () => router.push('/about'),
  },
  {
    id: 'act-copy-email',
    title: 'Salin Alamat Email (contactmedianadi021@gmail.com)',
    category: 'Aksi',
    icon: 'heroicons:envelope-20-solid',
    action: async () => {
      try {
        await navigator.clipboard.writeText('contactmedianadi021@gmail.com')
        $swal?.fire({
          title: 'Email Tersalin! ✉️',
          text: 'Alamat contactmedianadi021@gmail.com siap digunakan.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          confirmButtonColor: '#219EBC'
        })
      } catch {
        // Fallback
      }
    },
  },
  {
    id: 'pref-theme',
    title: 'Alihkan Tema (Dark / Light Mode)',
    category: 'Preferensi',
    icon: 'heroicons:moon-20-solid',
    shortcut: 'T',
    action: () => {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
  },
]

const filteredCommands = computed(() => {
  if (!query.value.trim()) return commands
  const q = query.value.toLowerCase()
  return commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
  )
})

const onSelect = (cmd: CommandItem | null) => {
  if (!cmd) return
  isOpen.value = false
  query.value = ''
  cmd.action()
}

// Global Keyboard Shortcut: Ctrl+K / Cmd+K
useEventListener('keydown', (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    isOpen.value = !isOpen.value
  }
})

// Expose state and toggle method for header button
defineExpose({
  open: () => (isOpen.value = true),
  close: () => (isOpen.value = false)
})
</script>

<template>
  <ClientOnly>
    <TransitionRoot :show="isOpen" as="template" @after-leave="query = ''">
      <Dialog as="div" class="relative z-50" @close="isOpen = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-200"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-150"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-[#023047]/60 backdrop-blur-xs transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <TransitionChild
            as="template"
            enter="ease-out duration-200"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-150"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="mx-auto max-w-xl transform divide-y divide-slate-200 dark:divide-slate-700 overflow-hidden rounded-2xl bg-white dark:bg-[#034363] shadow-2xl ring-1 ring-black/5 transition-all"
            >
              <Combobox @update:model-value="onSelect">
                <div class="relative flex items-center px-4">
                  <Icon
                    name="heroicons:magnifying-glass-20-solid"
                    class="h-5 w-5 text-slate-400 dark:text-slate-300 pointer-events-none"
                  />
                  <ComboboxInput
                    class="h-12 w-full border-0 bg-transparent pl-3 pr-4 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 focus:outline-none"
                    placeholder="Ketik perintah atau navigasi... (misal: 'topsis', 'cv', 'email')"
                    @change="query = ($event.target as HTMLInputElement).value"
                  />
                  <kbd
                    class="hidden sm:inline-block rounded border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-[#023047] px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 dark:text-slate-300"
                  >
                    ESC
                  </kbd>
                </div>

                <ComboboxOptions
                  v-if="filteredCommands.length > 0"
                  static
                  class="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-slate-800 dark:text-slate-200"
                >
                  <ComboboxOption
                    v-for="cmd in filteredCommands"
                    :key="cmd.id"
                    :value="cmd"
                    as="template"
                    v-slot="{ active }"
                  >
                    <li
                      class="flex cursor-pointer select-none items-center justify-between px-4 py-2.5 transition"
                      :class="active ? 'bg-[#8ECAE6]/25 dark:bg-[#023047] text-[#023047] dark:text-white' : ''"
                    >
                      <div class="flex items-center gap-3">
                        <Icon :name="cmd.icon" class="h-4 w-4 text-[#219EBC]" />
                        <span class="font-medium text-xs sm:text-sm">{{ cmd.title }}</span>
                        <span class="rounded bg-slate-100 dark:bg-[#023047] px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          {{ cmd.category }}
                        </span>
                      </div>
                      <span
                        v-if="cmd.shortcut"
                        class="text-[10px] font-mono text-slate-400 dark:text-slate-400"
                      >
                        {{ cmd.shortcut }}
                      </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>

                <div
                  v-else
                  class="px-4 py-8 text-center text-xs text-slate-500 dark:text-slate-400"
                >
                  Perintah tidak ditemukan untuk "{{ query }}".
                </div>

                <div class="flex items-center justify-between bg-slate-50 dark:bg-[#023047]/60 px-4 py-2.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Gunakan navigasi panah & Enter untuk memilih</span>
                  <div class="flex items-center gap-1">
                    <span>Akses cepat:</span>
                    <kbd class="rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#023047] px-1 text-[10px]">Ctrl</kbd>
                    <span>+</span>
                    <kbd class="rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#023047] px-1 text-[10px]">K</kbd>
                  </div>
                </div>
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </ClientOnly>
</template>
