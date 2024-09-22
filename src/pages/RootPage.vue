<script setup>
import RootHeader from "../partials/RootHeader.vue";
import RootFooter from "../partials/RootFooter.vue";
import RootContent from "../partials/RootContent.vue";
</script>

<template>
	<header class="flex flex-wrap w-full">
		<RootHeader />
	</header>
	<main class="flex flex-wrap w-full">
		<RootContent />
	</main>
	<aside class="flex flex-wrap w-full"></aside>
	<footer class="flex flex-wrap w-full">
		<RootFooter />
	</footer>
</template>

<script>
export default { name: "RootPage" };
</script>
