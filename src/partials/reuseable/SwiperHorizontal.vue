<script setup>
import { defineProps, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
const modules = [Autoplay, Pagination, Navigation];

const progressCircle = ref(null);
const progressContent = ref(null);
const onAutoplayTimeLeft = (s, time, progress) => {
	progressCircle.value.style.setProperty("--progress", 1 - progress);
	progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
};

defineProps({
	Images: { type: Array, required: true, default: () => [] },
});
</script>

<template>
	<swiper
		:autoplay="{
			delay: 4500,
			disableOnInteraction: false,
		}"
		:spaceBetween="30"
		:loop="true"
		:centeredSlides="true"
		:pagination="{
			clickable: true,
		}"
		:navigation="true"
		:modules="modules"
		:style="{
			'--swiper-navigation-color': 'whitesmoke',
			'--swiper-pagination-color': 'whitesmoke',
		}"
		@autoplayTimeLeft="onAutoplayTimeLeft"
		class="SwiperHorizontal"
		id="SwiperHorizontal">
		<SwiperSlide v-for="(list, index) in Images" :key="index">
			<img :src="list.src" :alt="list.title" />
			<div class="slider-captions" v-if="list.description">
				<h1 class="head-txt w-fit text-3xl uppercase">{{ list.title }}</h1>
				<h2 class="sub-head-txt text-2xl capitalize" v-if="list.sub_title">{{ list.sub_title }}</h2>
				<p v-if="typeof list.description === 'string'" class="desc-txt text-xl">{{ list.description }}</p>
				<div v-if="list.content" class="sosmed-container inline-flex text-3xl">
					<a class="bg-whitesmoke align-middle hover:bg-gray-300 text-black font-bold m-2 py-2 px-3 rounded-full" v-for="(item, i) in list.content" :key="i" v-html="item.src" :href="item.anchor" target="_blank"></a>
				</div>
			</div>
		</SwiperSlide>
		<template #container-end>
			<div class="autoplay-progress">
				<svg viewBox="0 0 48 48" ref="progressCircle">
					<circle cx="24" cy="24" r="20"></circle>
				</svg>
				<span ref="progressContent"></span>
			</div>
		</template>
	</swiper>
</template>

<script>
export default { name: "SwiperHorizontal" };
</script>

<style scoped>
#SwiperHorizontal {
	width: 100%;
	height: 100%;
}

#SwiperHorizontal .swiper-slide {
	text-align: center;
	font-size: 18px;
	background: #fff;

	/* Center slide text vertically */
	display: flex;
	justify-content: center;
	align-items: center;
}

#SwiperHorizontal .swiper-slide img {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.autoplay-progress {
	position: absolute;
	right: 16px;
	bottom: 16px;
	z-index: 10;
	width: 48px;
	height: 48px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	color: whitesmoke;
}

.autoplay-progress svg {
	--progress: 0;
	position: absolute;
	left: 0;
	top: 0px;
	z-index: 10;
	width: 100%;
	height: 100%;
	stroke-width: 4px;
	stroke: whitesmoke;
	fill: none;
	stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
	stroke-dasharray: 125.6;
	transform: rotate(-90deg);
}

.slider-captions {
	position: absolute;
	bottom: 0;
	color: whitesmoke !important;
	background-color: rgba(52, 58, 64, 0.5);
	border-radius: 1rem;
	width: 75%;
	margin-bottom: 3rem;
	padding: 2rem;
}

.slider-captions h1 {
	display: inline-block;
	margin: 0 0 2rem 0;
	border-bottom: 2px solid #ffb703;
}

.slider-captions p {
	margin: 0 7rem;
}

.bg-whitesmoke {
	/* background-color: rgba(245, 245, 245, 0.75); */
	background-color: rgba(245, 245, 245, 0.85);
}
</style>
