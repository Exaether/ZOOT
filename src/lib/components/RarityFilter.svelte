<script lang="ts">
	import type { Operator } from "$lib/types";

	let { rarityFilter = $bindable() } = $props();
	let selectedRarity: number = $state(0);
	let hoverRarity: number = $state(0);

	function filterRarity(rarity: number): void {
		selectedRarity = rarity;
		if (rarity == 0) {
			rarityFilter = () => true;
		} else {
			rarityFilter = (op: Operator) => op.rarity == rarity;
		}
	}

	function getStarColor(i: number): number {
		if (i <= selectedRarity) {
			if (i > hoverRarity) {
				return selectedRarity;
			}
			return Math.min(selectedRarity, hoverRarity);
		}
		if (i <= hoverRarity) {
			return hoverRarity;
		}
		return 0;
	}
</script>

<div class="filterBox">
	<button onclick={() => filterRarity(0)} aria-label="Clear filter">
		<svg
			class="reset"
			fill="#000000"
			viewBox="0 0 16 16"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
			<g
				id="SVGRepo_tracerCarrier"
				stroke-linecap="round"
				stroke-linejoin="round"
			></g>
			<g id="SVGRepo_iconCarrier">
				<path
					d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
					fill-rule="evenodd"
				></path>
			</g>
		</svg>
	</button>
	{#each { length: 6 } as _, i}
		<button
			class="star-btn"
			onclick={() => filterRarity(i + 1)}
			onmouseenter={() => (hoverRarity = i + 1)}
			onmouseleave={() => (hoverRarity = 0)}
			aria-label="filter {i} stars"
			style:left="{-i * 0.7}em"
		>
			<svg
				class="star s{getStarColor(i + 1)}"
				fill="#000000"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"
				></g>
				<g id="SVGRepo_iconCarrier">
					<path
						d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z"
					></path>
				</g>
			</svg>
		</button>
	{/each}
</div>

<style>
	.filterBox {
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 10px;
	}

	button {
		position: relative;
		background: none;
		border: none;
		height: 80%;
		aspect-ratio: 1 / 1;
		padding: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.reset {
		height: 70%;
		fill: var(--icon-reset);
		transition: fill 0.2s;
	}

	.reset:hover {
		fill: var(--icon-reset-hover);
	}

	.star-btn {
		margin-left: -5px;
	}

	.star {
		position: relative;
		transform: rotate(15deg);
		height: 100%;
		transition: fill 0.2s;
		filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
	}

	.s0 {
		fill: var(--rarity-0);
	}
	.s1 {
		fill: var(--rarity-1);
	}
	.s2 {
		fill: var(--rarity-2);
	}
	.s3 {
		fill: var(--rarity-3);
	}
	.s4 {
		fill: var(--rarity-4);
	}
	.s5 {
		fill: var(--rarity-5);
	}
	.s6 {
		fill: var(--rarity-6);
	}

	@media (max-width: 600px) {
		.filterBox {
			height: 50%;
			width: auto;
		}
	}
</style>
