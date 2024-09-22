<script setup>
import { Menu, MenuButton, MenuItems } from '@headlessui/vue';
</script>

<template>
    <Menu v-slot="{ open }">
        <MenuButton class="fixed top-4 right-4 z-50 p-3 bg-gray-800 text-white rounded-full focus:outline-none">
            <Transition name="rotate">
                <svg v-if="!open" class="w-6 h-6 transition duration-300 ease-in-out" fill=" none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path class="text-orange-400" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7">
                    </path>
                </svg>
                <svg v-else class="w-6 h-6 transition duration-300 ease-in-out" fill=" none" stroke="currentColor"
                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path class="text-orange-400" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                    </path>
                </svg>
            </Transition>
        </MenuButton>

        <Transition name="slide">
            <MenuItems
                class="fixed top-0 right-0 w-64 h-full bg-teal-500 text-white dark:bg-gray-900 dark:text-white z-40 flex flex-col py-4">
                <ul class="space-y-4">
                    <slot name="list-menu"></slot>
                </ul>
            </MenuItems>
        </Transition>
    </Menu>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.75s ease-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.rotate-enter-active,
.rotate-leave-active {
    transition: transform 0.75s ease-out;
    opacity: 0;
}

.rotate-enter-from,
.rotate-leave-to {
    transform: rotate(360deg);
    position: fixed;
    opacity: 1;
}
</style>