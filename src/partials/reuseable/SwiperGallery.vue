<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { defineProps, ref } from "vue";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { FreeMode, Navigation, Thumbs, Autoplay, Pagination, Zoom } from "swiper/modules";
const modules = [FreeMode, Navigation, Thumbs, Autoplay, Pagination, Zoom];

const thumbsSwiper = ref(null);
function setThumbsSwiper(swiper) {
	thumbsSwiper.value = swiper;
}

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
		@autoplayTimeLeft="onAutoplayTimeLeft"
		:autoplay="{
			delay: 4500,
			disableOnInteraction: false,
		}"
		:zoom="true"
		:loop="true"
		:navigation="true"
		:thumbs="{ swiper: thumbsSwiper }"
		:modules="modules"
		class="SwiperGallery"
		id="SwiperGallery"
		style="height: 75%">
		<swiper-slide v-for="(image, index) in Images" :key="index">
			<div class="swiper-zoom-container">
				<img :src="image.src" :alt="`Image ${index + 1}`" />
			</div>
		</swiper-slide>
		<template #container-end>
			<div class="autoplay-progress">
				<svg viewBox="0 0 48 48" ref="progressCircle">
					<circle cx="24" cy="24" r="20"></circle>
				</svg>
				<span ref="progressContent"></span>
			</div>
		</template>
	</swiper>
	<swiper
		:onSwiper="setThumbsSwiper"
		@autoplayTimeLeft="onAutoplayTimeLeft"
		:autoplay="{
			delay: 4500,
			disableOnInteraction: false,
		}"
		:loop="true"
		:spaceBetween="10"
		:slidesPerView="4"
		:freeMode="true"
		:watchSlidesProgress="true"
		:modules="modules"
		class="SwiperContentGallery">
		<swiper-slide v-for="(image, index) in Images" :key="index" class="gallery-content-item">
			<img :src="image.src" :alt="`Image ${index + 1}`" />
		</swiper-slide>
	</swiper>
</template>
<script>
export default { name: "SwiperGallery" };
</script>
<style scoped>
#SwiperGallery .swiper-slide {
	text-align: center;
	font-size: 18px;
	background: #fff;
	display: flex;
	justify-content: center;
	/* align-items: center; */
	overflow: hidden;
}

.swiper-zoom-container {
	align-items: baseline;
	width: 1280px !important;
	height: 100%;
}

#SwiperGallery .swiper-slide img {
	display: block;
	width: 100%;
	height: 100%;
	/* object-fit: cover; */
}

#SwiperGallery .swiper-slide {
	background-size: cover;
	background-position: center;
}

.SwiperContentGallery {
	height: 20%;
	box-sizing: border-box;
	padding: 10px 0;
	margin: 0 5rem;
}

.SwiperContentGallery .swiper-slide {
	width: 25%;
	height: 100%;
	opacity: 0.4;
}

.SwiperContentGallery .swiper-slide-thumb-active {
	opacity: 1;
}

.SwiperContentGallery .swiper-slide img {
	display: block;
	width: 100%;
	height: 120px;
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
	color: var(--swiper-theme-color);
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
	stroke: var(--swiper-theme-color);
	fill: none;
	stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
	stroke-dasharray: 125.6;
	transform: rotate(-90deg);
}

/* #SwiperGallery .swiper-button-prev,
#SwiperGallery .swiper-button-next {
	top: 35%;
} */
</style>
