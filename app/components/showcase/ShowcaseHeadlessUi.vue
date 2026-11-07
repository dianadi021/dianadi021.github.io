<script setup lang="ts">
import {
  Switch as HeadlessSwitch,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'

const { $swal } = useNuxtApp()
const isSwitchEnabled = ref(false)
const isModalOpen = ref(false)

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

const triggerSuccessSwal = () => {
  $swal?.fire({
    title: 'Sukses!',
    text: 'Ini adalah SweetAlert2 standar dengan Bootstrap primary color.',
    icon: 'success',
    confirmButtonColor: '#0d6efd'
  })
}
</script>

<template>
  <section class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 shadow-sm space-y-5">
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-info/20 text-info-700 dark:text-info flex items-center justify-center font-bold text-sm">
          <Icon name="heroicons:square-3-stack-3d-20-solid" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-lg font-bold">2. Headless UI (@headlessui/vue)</h2>
          <p class="text-xs text-slate-500">Komponen UI interaktif, accessible, dan unstyled</p>
        </div>
      </div>
      <span class="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-slate-600 dark:text-slate-300">
        @headlessui/vue
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <!-- Switch (Toggle) -->
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Headless UI Switch</span>
        <div class="flex items-center justify-between">
          <span class="text-sm">Status Notifikasi:</span>
          <HeadlessSwitch
            v-model="isSwitchEnabled"
            :class="isSwitchEnabled ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
          >
            <span
              :class="isSwitchEnabled ? 'translate-x-6' : 'translate-x-1'"
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            />
          </HeadlessSwitch>
        </div>
        <p class="text-xs text-slate-500">Nilai switch: <strong>{{ isSwitchEnabled ? 'Aktif (True)' : 'Nonaktif (False)' }}</strong></p>
      </div>

      <!-- Menu (Dropdown) -->
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Headless UI Menu (Dropdown)</span>
        <Menu as="div" class="relative inline-block text-left w-full">
          <MenuButton class="w-full inline-flex justify-between items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition">
            <span>Pilihan Menu Dropdown</span>
            <Icon name="heroicons:chevron-down-20-solid" class="w-4 h-4 text-slate-500" />
          </MenuButton>
          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems class="absolute right-0 mt-2 w-full origin-top-right divide-y divide-slate-100 dark:divide-slate-700 rounded-lg bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
              <div class="p-1">
                <MenuItem v-slot="{ active }">
                  <button :class="[active ? 'bg-primary text-white' : 'text-slate-700 dark:text-slate-200', 'group flex w-full items-center rounded-md px-2 py-2 text-xs']" @click="triggerToastSwal">
                    Opsi 1: Munculkan Toast
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button :class="[active ? 'bg-primary text-white' : 'text-slate-700 dark:text-slate-200', 'group flex w-full items-center rounded-md px-2 py-2 text-xs']" @click="triggerSuccessSwal">
                    Opsi 2: Munculkan Dialog
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <p class="text-xs text-slate-500">Accessible dropdown dengan keyboard focus navigation.</p>
      </div>

      <!-- Dialog (Modal) -->
      <div class="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Headless UI Modal (Dialog)</span>
        <button
          type="button"
          class="w-full inline-flex justify-center items-center gap-2 rounded-lg bg-primary hover:bg-primary-600 text-white px-4 py-2 text-sm font-medium transition"
          @click="isModalOpen = true"
        >
          <Icon name="heroicons:window-20-solid" class="w-4 h-4" />
          Buka Modal Dialog
        </button>
        <p class="text-xs text-slate-500">Modal dialog ramah pembaca layar (ARIA focus trap).</p>

        <!-- Headless UI Modal Transition -->
        <TransitionRoot appear :show="isModalOpen" as="template">
          <Dialog as="div" class="relative z-50" @close="isModalOpen = false">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black/50 backdrop-blur-xs" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
              <div class="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all space-y-4">
                    <DialogTitle as="h3" class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Icon name="heroicons:check-circle-20-solid" class="w-6 h-6 text-success" />
                      Modal Headless UI Aktif
                    </DialogTitle>
                    <p class="text-xs text-slate-600 dark:text-slate-300">
                      Komponen modal ini dirender melalui package <code>@headlessui/vue</code> dengan transisi animasi halus dan aksesibilitas penuh.
                    </p>
                    <div class="flex justify-end pt-2">
                      <button
                        type="button"
                        class="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-xs font-semibold text-slate-800 dark:text-slate-100 transition"
                        @click="isModalOpen = false"
                      >
                        Tutup Modal
                      </button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
      </div>
    </div>

    <!-- Disclosure (Accordion) -->
    <div class="border-t border-slate-100 dark:border-slate-700/60 pt-4">
      <Disclosure v-slot="{ open }">
        <DisclosureButton class="flex w-full justify-between rounded-lg bg-slate-100 dark:bg-slate-700/60 px-4 py-2.5 text-left text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
          <span class="flex items-center gap-2">
            <Icon name="heroicons:question-mark-circle-20-solid" class="w-4 h-4 text-primary" />
            Disclosure / Accordion Demo (Klik untuk buka/tutup)
          </span>
          <Icon
            name="heroicons:chevron-up-20-solid"
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-slate-500 transition-transform duration-200"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-3 pb-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Komponen Disclosure ini memudahkan pembuatan panel FAQ, accordion menu, atau collapsible filter tanpa memerlukan JavaScript manual tambahan.
        </DisclosurePanel>
      </Disclosure>
    </div>
  </section>
</template>
