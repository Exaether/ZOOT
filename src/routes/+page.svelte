<script lang="ts">
	import autoAnimate from '@formkit/auto-animate'


    import Card from "./Card.svelte";
    import ClassFilter from "./ClassFilter.svelte";
    import RarityFilter from './RarityFilter.svelte';

	let { data } = $props();
	let operators = $state(data.operators);
	let opFilter: Function = $state(() => true);
	let rarityFilter: Function = $state(() => true);

	sortRarity()

	function sortRarity(): void {
		operators.sort((a, b) => b.rarity - a.rarity)
	};

	function sortInverted(): void {
		operators.sort((a, b) => a.rarity - b.rarity)
	};
		
</script>

<div class="header">
	<RarityFilter bind:rarityFilter/>
</div>
<div use:autoAnimate class="list">
	{#each operators.filter(opFilter).filter(rarityFilter) as op (op.id)}
		<Card operator={ op }/>
	{/each}
</div>
<ClassFilter bind:opFilter/>

<style>
.list {
	width: 89.7%;
	height: 92vh;
	display: flex;
	flex-wrap: wrap;
	gap: 2%;
	row-gap: 3%;
	padding-inline: 1%;
	margin-top: 1%;
	align-content: flex-start;
	justify-content: flex-start;
	overflow-y: scroll;
}

.header {
	height: 6vh;
	width: 100vw;
	background-color: black;
	position: relative;

}

</style>
