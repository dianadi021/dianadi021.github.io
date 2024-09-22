<script setup>
const currentYear = new Date().getFullYear();
const HOST = window.location.host;
const URL = HOST.includes("github.io") ? `https://${HOST}` : `http://${HOST}`;
</script>

<template>
	<div class="footer-container w-full text-center p-4">
		<p>{{ currentYear }} &copy; <a :href="URL" class="capitalize font-semibold" title="dianadi021">dian adi nugroho</a></p>
	</div>
</template>

<script>
export default { name: "RootFooter" };
</script>

<style scoped>
.footer-container {
	background-color: #023047;
	color: whitesmoke;
}

.footer-container p a:hover{
  color: #FFB703;
}
</style>
