<script lang="ts">
	import professions from "$lib/data/professions.json";

	let { operator } = $props();
	let rarity: number = operator.rarity;
	if (rarity == 2 || rarity == 3) {
		rarity = 1;
	}

	let prof = professions[operator.profession];
</script>


<div class="card">
	<img class="layer bg" 
		src="https://raw.githubusercontent.com/PuppiizSunniiz/Arknight-Images/refs/heads/main/ui/chara/bg-{ rarity }.png" 
		alt="BG">
	<img class="layer portrait" 
		src="https://raw.githubusercontent.com/fexli/ArknightsResource/refs/heads/main/charpor/{ operator.id }_1.png" 
		alt="portrait">
	<img class="layer bg2" 
		src="https://raw.githubusercontent.com/PuppiizSunniiz/Arknight-Images/refs/heads/main/ui/chara/bg.png" 
		alt="BG">
	<img class="layer header" 
		src="https://raw.githubusercontent.com/PuppiizSunniiz/Arknight-Images/refs/heads/main/ui/chara/header-{ rarity }.png" 
		alt="header">
	<img class="layer glow" 
		src="https://raw.githubusercontent.com/PuppiizSunniiz/Arknight-Images/refs/heads/main/ui/chara/glow-{ operator.rarity }.png" 
		alt="glow">
	<img class="layer banner" 
		src="https://raw.githubusercontent.com/PuppiizSunniiz/Arknight-Images/refs/heads/main/ui/chara/banner-{ rarity }.png" 
		alt="banner">
	<div class="layer subClass" >
		<img 
			src="https://raw.githubusercontent.com/PuppiizSunniiz/Arknight-Images/refs/heads/main/ui/subclass/sub_{ operator.subProfession }_icon.png" 
			alt="subclass">
	</div>
	<img class="layer class" 
		src="https://raw.githubusercontent.com/PuppiizSunniiz/Arknight-Images/refs/heads/main/classes/black/icon_profession_{ prof }_large.png" 
		alt="class">
	{#each {length : operator.rarity}, i}
		<img class="layer star" 
			style="left: {24 + i * 9}%"
			src="https://raw.githubusercontent.com/PuppiizSunniiz/Arknight-Images/refs/heads/main/ui/star.png" 
			alt="star">
	{/each}
	<h3 class="layer name">{ operator.name }</h3>
</div>

<style>
.card {
	display: block;
	position: relative;
	width: 12.5%;
	aspect-ratio: 1 / 2;

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
</style>
