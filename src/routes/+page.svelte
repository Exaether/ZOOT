<script lang="ts">
	import autoAnimate from '@formkit/auto-animate'

    import Card from "./Card.svelte";
    import ClassFilter from "./ClassFilter.svelte";
    import RarityFilter from './RarityFilter.svelte';

	let { data } = $props();
	let operators = $state(data.operators);
	let opFilter: Function = $state(() => true);
	let rarityFilter: Function = $state(() => true);
	let searchText: string = $state("");
	let nameFilter: Function = $derived((op: { name: string; }) => op.name.toLowerCase().includes(searchText.toLowerCase()));
		
</script>

<div class="header">
	<label class="search">
		<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
		<input type="text" placeholder="Search..." bind:value={ searchText }/>
	</label>
	<RarityFilter bind:rarityFilter/>
</div>
<div use:autoAnimate class="list">
	{#each operators.filter(opFilter).filter(rarityFilter).filter(nameFilter) as op (op.id)}
		<Card operator={ op }/>
	{/each}
</div>
<ClassFilter bind:opFilter/>

<style>
.list {
	width: 89.7%;
	height: 92%;
	display: flex;
	flex-wrap: wrap;
	gap: 2%;
	row-gap: 3%;
	padding-inline: 1%;
	padding-top: 1%;
	align-content: flex-start;
	justify-content: flex-start;
	overflow-y: scroll;
}

.header {
	height: 6%;
	width: 100%;
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}

.search {
	height: 100%;
	display: flex;
	align-items: center;
	gap: 10px;
}

.search svg {
	height: 60%;
}

.search input {
	color: white;
	font-size: 1.5em;
	height: 80%;
	background: none;
	border: none;
	border-bottom: 5px solid white;
	border-radius: 2px;
}

.search input:focus {
	border-color: hsl(200, 80%, 50%);
	transition: border-color .5s;
	outline: none;
}

@media (max-width: 600px) {
	.header {
		height: 6vh;
		width: 100vw;
		justify-content: space-between;
		gap: 2%;
	}
	.search {
		width: 40%;
	}
	.search input {
		width: 100%;
		font-size: 1em;
	}
	.list {
		width: 95vw;
		gap: 7%;
		row-gap: 3%;
		padding-top: 15vh;
		padding-left: 4%;
	}
}

</style>
