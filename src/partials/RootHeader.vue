<script setup>
import { ref } from "vue";

import HamburgerMenu from "./header/HamburgerMenu.vue";
import ThemeSwitcher from "./header/SwitcherTheme.vue";
import SwiperHorizontal from "./reuseable/SwiperHorizontal.vue";

const sliderItems = ref([
	{
		src: "/assets/images/bg-masthead.jpg",
		title: "dian adi nugroho",
		sub_title: "「Programmer | Content Writer」",
		description: "@dianadi021",
		content: [
			{ src: `<i class="fa-brands fa-youtube"></i>`, anchor: "https://www.youtube.com/@dianadi021" },
			{ src: `<i class="fa-brands fa-linkedin"></i>`, anchor: "https://id.linkedin.com/in/dianadi021/" },
			{ src: `<i class="fa-brands fa-instagram"></i>`, anchor: "https://instagram.com/dianadi021/" },
			{ src: `<i class="fa-brands fa-twitter"></i>`, anchor: "https://twitter.com/dianadi021/" },
			{ src: `<i class="fa-brands fa-discord"></i>`, anchor: "https://discord.com/invite/fQ2FMgF" },
			{ src: `<i class="fa-brands fa-github"></i>`, anchor: "https://github.com/dianadi021/" },
		],
	},
	{ src: "/assets/images/dianadi0214.jpg", title: "tentang saya", description: "Dengan kerja keras dan ilmu yang sudah saya peroleh, dapat membuat saya menjadi lebih baik daripada sebelumnya. Dan saya sudah terbiasa dengan adanya perbedaan pendapat yang terjadi selama proses diskusi. Serta saya sudah terbiasa dalam bekerjasama dalam kelompok atau kerja tim." },
]);

if (localStorage.getItem("isDarkTheme") === "false" || localStorage.getItem("isDarkTheme") === false || (!("isDarkTheme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
	document.body.classList.remove("dark");
}
if (localStorage.getItem("isDarkTheme") === "true" || localStorage.getItem("isDarkTheme") === true || (!("isDarkTheme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
	document.body.classList.add("dark");
}
</script>

<template>
	<div class="fixed z-50 top-0 right-0 bg-white dark:bg-gray-900 text-black text-grey-300">
		<HamburgerMenu>
			<template v-slot:list-menu>
				<li class="p-4 border-b-4 border-gray-300 border-dotted dark:border-gray-300">
					<legend class="uppercase text-2xl text-center text-grey-300">menu</legend>
				</li>
				<li class="hover:border-b-4 hover:border-gray-900 hover:border-dotted hover:bg-gray-300 hover:border-gray-400 dark:border-gray-300">
					<a class="uppercase text-center text-lg w-full inline-block text-grey-300 hover:text-gray-900 dark:text-gray-300 px-3 dark:hover:text-gray-900 py-2 rounded-md text-sm font-medium" href="/">home</a>
				</li>
				<li class="hover:border-b-4 hover:border-gray-900 hover:border-dotted hover:bg-gray-300 hover:border-gray-400 dark:border-gray-300">
					<a class="uppercase text-center text-lg w-full inline-block text-grey-300 hover:text-gray-900 dark:text-gray-300 px-3 dark:hover:text-gray-900 py-2 rounded-md text-sm font-medium" href="#communities">communities</a>
				</li>
				<li class="hover:border-b-4 hover:border-gray-900 hover:border-dotted hover:bg-gray-300 hover:border-gray-400 dark:border-gray-300">
					<a class="uppercase text-center text-lg w-full inline-block text-grey-300 hover:text-gray-900 dark:text-gray-300 px-3 dark:hover:text-gray-900 py-2 rounded-md text-sm font-medium" href="#certificates">certificates</a>
				</li>
				<li class="hover:border-b-4 hover:border-gray-900 hover:border-dotted hover:bg-gray-300 hover:border-gray-400 dark:border-gray-300">
					<a class="uppercase text-center text-lg w-full inline-block text-grey-300 hover:text-gray-900 dark:text-gray-300 px-3 dark:hover:text-gray-900 py-2 rounded-md text-sm font-medium" href="#projects">projects</a>
				</li>
				<li class="hover:border-b-4 hover:border-gray-900 hover:border-dotted hover:bg-gray-300 hover:border-gray-400 dark:border-gray-300">
					<a class="uppercase text-center text-lg w-full inline-block text-grey-300 hover:text-gray-900 dark:text-gray-300 px-3 dark:hover:text-gray-900 py-2 rounded-md text-sm font-medium" href="https://dianadi021.github.io/mycv/" target="_blank">Curriculum Vitae</a>
				</li>
				<li class="fixed right-4 bottom-4">
					<ThemeSwitcher />
				</li>
			</template>
		</HamburgerMenu>
	</div>
	<div class="w-full h-screen bg-white dark:bg-gray-900 text-black text-grey-300">
		<SwiperHorizontal :Images="sliderItems" />
	</div>
</template>

<script>
export default { name: "RootHeader" };
</script>
