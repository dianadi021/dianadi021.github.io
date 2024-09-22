<script setup>
import { defineProps } from "vue";

import SwiperGallery from "./SwiperGallery.vue";

defineProps({
	isGallery: { type: Boolean, required: false, default: () => false },
	isProject: { type: Boolean, required: false, default: () => false },
	Id: { type: String, required: true, default: () => String },
	Content: { type: Array, default: () => [] },
});
</script>

<template>
	<div :id="Id" class="container-content-item flex flex-wrap align-middle justify-center w-full pb-8 pt-4">
		<div class="title text-2xl text-center w-full">
			<h1 class="uppercase w-min inline-block">{{ Id }}</h1>
		</div>
		<div v-if="!isGallery" class="title text-2xl text-center w-full flex flex-wrap align-middle justify-center gap-4" style="color: black">
			<div class="card-content-item max-w-72 rounded-lg overflow-hidden shadow-lg bg-white" v-for="(list, index) in Content" :key="index">
				<div class="relative bg-gray-400">
					<a :href="list.anchor" target="_blank">
						<img class="w-full h-48 object-cover filter blur-md transition duration-300 ease-in-out hover:blur-none" :src="list.src" :alt="list.title" style="cursor: pointer" />
					</a>
				</div>
				<div class="px-6 py-4">
					<div class="font-bold text-xl mb-2">
						<a :href="list.anchor" class="uppercase" target="_blank">{{ list.title }}</a>
					</div>
					<p class="text-gray-700 text-base mb-4 capitalize">{{ list.description }}</p>
					<a v-if="!isProject" :href="list.anchor" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-base capitalize">join us</a>
					<a v-else :href="list.anchor" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-base capitalize">visit</a>
				</div>
				<div class="px-6 pt-4 pb-2">
					<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 lowercase" v-for="(item, i) in list.tag" :key="i">#{{ item }}</span>
				</div>
			</div>
		</div>
		<div v-else class="gallery-container-content-item title text-2xl text-center w-full h-screen" style="color: black;">
			<SwiperGallery :Images="Content" />
		</div>
	</div>
</template>

<script>
export default { name: "ContentItem" };
</script>

<style scoped></style>
