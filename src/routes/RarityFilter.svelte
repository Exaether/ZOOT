<script lang="ts">
	let { rarityFilter = $bindable() } = $props();
	let selectedRarity: number = $state(0);
	let hoverRarity: number = $state(0);

	function filterRarity(rarity: number): void {
		selectedRarity = rarity;
		if (rarity == 0) {
			rarityFilter = () => true;
		} else {
			rarityFilter = (op: { rarity: number; }) => op.rarity == rarity;
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
	<button onclick="{() => filterRarity(0) }" aria-label="Clear filter">
		<svg 
			class="reset"
			fill="#000000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z" fill-rule="evenodd"></path> </g>
		</svg>
	</button>
	{#each {length: 6} as _, i}
		<button
			onclick="{() => filterRarity(i + 1) }"
			onmouseenter={() => hoverRarity = i + 1}
			onmouseleave={() => hoverRarity = 0}
			aria-label="filter { i } stars">
			<svg 
				class="star s{ getStarColor(i + 1) }"
				fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z"></path></g>
			</svg>
		</button>
	{/each}
</div>

<style>

.filterBox {
	height: 80%;
	position: absolute;
	right: 12%;
	display: flex;
	align-items: center;
}


button {
	background: none;
	border: none;
	height: 100%;
	aspect-ratio: 1 / 1;
	padding: 0;
}

.reset {
	height: 75%;
	fill: hsl(0, 0%, 50%);
	transition: fill .2s;
}

.reset:hover{
	fill: hsl(0, 100%, 50%)
}

.star {
	height: 100%;
	transition: fill .5s;
}

.s0 {
	fill: hsl(0, 0%, 70%);
}

.s1 {
	fill: hsl(0, 0%, 100%)
}

.s2 {
	fill: hsl(60, 100%, 50%)
}

.s3 {
	fill: hsl(210, 100%, 50%)
}

.s4 {
	fill: hsl(266, 70%, 65%)
}

.s5 {
	fill: hsl(40, 100%, 50%)
}

.s6 {
	fill: hsl(20, 100%, 50%)
}
</style>

