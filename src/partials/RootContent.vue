<script setup>
import { ref } from "vue";

import ContentItem from "./reuseable/ContentItem.vue";
const srcImg404 = "/assets/images/not_found.png";

const communities = ref([{ anchor: "https://discord.com/invite/fQ2FMgF", src: "/assets/images/skd.png", title: "skuadolan", sub_title: "skuad", description: "bermain, bercanda, belajar", tag: ["skuad", "skuadolan", "skuadproduction"] }]);
const certificates = ref([{ src: "/assets/images/Belajar_Membuat_Aplikasi_Back-End_untuk_Pemula.png" }, { src: "/assets/images/Belajar_Dasar_Pemrograman_JavaScript.png" }, { src: "/assets/images/Belajar_Dasar_Pemrograman_Web.png" }]);
const projects = ref([{ anchor: "#", src: srcImg404, title: "Geoportal Sitala Wonogiri", sub_title: "Geoportal Sitala Wonogiri", description: "website geografis wonogiri", tag: ["website", "skuadproduction"] }, { anchor: "https://dianadi021.github.io/topsis/", src: "/assets/images/my-calculate.png", title: "Topsis Calculator", sub_title: "Topsis Calculator ", description: "Calculate with TOPSIS", tag: ["website", "dianadi021"] }, { anchor: "#", src: srcImg404, title: "#SKUADCITY", sub_title: "#SKUADCITY", description: "GTA5 FiveM", tag: ["game", "skuadproduction"] }]);
</script>

<template>
	<ContentItem :Id="'communities'" :Content="communities"> </ContentItem>
	<ContentItem :Id="'certificates'" :Content="certificates" :isGallery="true"> </ContentItem>
	<ContentItem :Id="'projects'" :Content="projects" :isProject="true"> </ContentItem>
</template>

<script>
export default { name: "RootContent" };
</script>

<style>
#communities {
	background-color: #023047;
	color: whitesmoke;
}

#projects {
	background-color: #8ecae6;
	color: black;
}

.title h1 {
	margin: 0 0 2rem 0;
	border-bottom: 2px solid #ffb703;
}
</style>
