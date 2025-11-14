<script lang="ts">
    import { fexli_url, puppiz_url } from "$lib/consts";
	import professions from "$lib/data/professions.json";

	let { operator } = $props();
	let rarity: number = operator.rarity;
	if (rarity == 2 || rarity == 3) {
		rarity = 1;
	}

	let prof = professions[operator.profession].name;
</script>


<a href="/operators/{ operator.id }" class="card">
	<img class="layer bg" 
		src="{ puppiz_url }/ui/chara/bg-{ rarity }.png" 
		alt="BG">
	<img class="layer portrait" 
		src="{ fexli_url }/charpor/{ operator.id }_1.png" 
		alt="portrait">
	<div class="layer bg2"></div>
	<img class="layer header" 
		src="{ puppiz_url }/ui/chara/header-{ rarity }.png" 
		alt="header">
	<img class="layer glow" 
		src="{ puppiz_url }/ui/chara/glow-{ operator.rarity }.png" 
		alt="glow">
	<img class="layer banner" 
		src="{ puppiz_url }/ui/chara/banner-{ rarity }.png" 
		alt="banner">
	<div class="layer subClass" >
		<img 
			src="{ puppiz_url }/ui/subclass/sub_{ operator.subProfession }_icon.png" 
			alt="subclass">
	</div>
	<img class="layer class" 
		src="{ puppiz_url }/classes/black/icon_profession_{ prof }_large.png" 
		alt="class">
	{#each {length : operator.rarity}, i}
		<img class="layer star" 
			style="left: {24 + i * 9}%"
			src="{ puppiz_url }/ui/star.png" 
			alt="star">
	{/each}
	<h3 class="layer name">{ operator.name }</h3>
</a>

<style>
.card {
	display: block;
	position: relative;
	width: 12.5%;
	aspect-ratio: 1 / 2;
	transition: transform .2s;

	.layer {
		position: absolute;
		left: 0;
		width: 100%;
	}
	.bg, .portrait, .header{
		top: 0;
	}
	.bg2 {
		bottom: 0;
		height: 10%;
		background-color: hsl(0, 0%, 30%);
	}
	.glow {
		bottom: 10%;
	}
	.banner {
		width: 110%;
		bottom: -2.5%;
		left: -5%;
	}
	.class {
		top: 1%;
		left: 2%;
		width: 22%;
		aspect-ratio: 1 / 1;
	}
	.subClass {
		top: 13%;
		left: 2%;
		width: 22%;
		aspect-ratio: 1 / 1;
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;
		img {
			width: 95%;
			height: 95%;
			object-fit: contain;
		}
	}
	.star {
		top: 1%;
		width: 17%;
	}
	.name {
		bottom: -3%;
		font-size: 1.5em;
		font-family: sans-serif;
		color: white;
		text-align: right;
	}
}

.card:hover {
	transform: scale(1.05);
}

@media (max-width: 600px) {
	.card {
		width: 45%;
	}
}
</style>
