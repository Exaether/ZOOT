<script lang="ts">
	import { images_url } from "$lib/consts";
	import { lazyLoad } from "$lib/utils/lazyload";
	import type { Operator } from "$lib/types";

	let { operator }: { operator: Operator } = $props();
	let rarity: number = $derived(
		operator.rarity === 2 || operator.rarity === 3 ? 1 : operator.rarity,
	);
</script>

<a href="/operators/{operator.id}" class="card">
	<img
		class="layer bg"
		src="{images_url}/ui/char_card/background_{rarity}.webp"
		alt="BG"
	/>
	<img
		class="layer portrait"
		use:lazyLoad={`${images_url}/portraits/${operator.id}_1.webp`}
		alt="portrait"
	/>
	<div class="layer bg2"></div>
	<img
		class="layer header"
		src="{images_url}/ui/char_card/header_{operator.rarity}.webp"
		alt="header"
	/>
	<img
		class="layer glow"
		src="{images_url}/ui/char_card/glow_{operator.rarity}.webp"
		alt="glow"
	/>
	<img
		class="layer banner"
		src="{images_url}/ui/char_card/banner_{rarity}.webp"
		alt="banner"
	/>
	<div class="layer subClass">
		<img
			src="{images_url}/ui/subprofession/sub_{operator.subProfession}_icon.webp"
			alt="subclass"
		/>
	</div>
	<div class="layer class">
		<img
			src="{images_url}/ui/profession/icon_profession_{operator.profession.toLowerCase()}.webp"
			alt="class"
		/>
	</div>
	<img
		class="layer stars"
		src="{images_url}/ui/char_card/star_{operator.rarity}.webp"
		alt="banner"
	/>
	<h3 class="layer name">{operator.name}</h3>
</a>

<style>
	.card {
		display: block;
		position: relative;
		width: 12.5%;
		aspect-ratio: 1 / 2;
		transition: transform 0.2s;

		.layer {
			position: absolute;
			left: 0;
			width: 100%;
		}
		.stars {
			height: 2.5em;
			left: 24%;
			width: unset;
		}
		.bg,
		.portrait,
		.header {
			top: 0;
		}
		.bg2 {
			bottom: 0;
			height: 10%;
			background-color: hsl(0, 0%, 30%);
		}
		.header {
			width: 50%;
		}
		.glow {
			bottom: 10%;
		}
		.banner {
			width: 110%;
			bottom: -2.5%;
			left: -5%;
		}
		.subClass,
		.class {
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
		.class {
			top: 1%;
			left: 2%;
			width: 22%;
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
