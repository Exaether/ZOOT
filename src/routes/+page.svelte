<script lang="ts">
	import autoAnimate from "@formkit/auto-animate";

	import Card from "$lib/components/Card.svelte";
	import ClassFilter from "$lib/components/ClassFilter.svelte";
	import RarityFilter from "$lib/components/RarityFilter.svelte";

	import type { Operator } from "$lib/types";

	let { data } = $props();
	let operators: Operator[] = $state(data.operators);
	let opFilter: (op: Operator) => boolean = $state(() => true);
	let rarityFilter: (op: Operator) => boolean = $state(() => true);
	let searchText: string = $state("");
	let nameFilter = $derived((op: Operator) =>
		op.name.toLowerCase().includes(searchText.toLowerCase()),
	);
</script>

<svelte:head>
	<title>ZOOT</title>
</svelte:head>

<main class="page-container">
	<div class="header">
		<label class="search">
			<svg
				viewBox="0 0 24 24"
				fill="none"
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
						d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
						stroke="var(--text-primary)"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</g>
			</svg>
			<input
				type="text"
				placeholder="Search..."
				bind:value={searchText}
			/>
		</label>
		<RarityFilter bind:rarityFilter />
	</div>

	<div use:autoAnimate class="list">
		{#each operators
			.filter(opFilter)
			.filter(rarityFilter)
			.filter(nameFilter) as op (op.id)}
			<Card operator={op} />
		{/each}
	</div>

	<ClassFilter bind:opFilter />
</main>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		height: 100%;
		overflow: hidden;
		background-color: var(--bg-main);
		font-family: sans-serif;
	}

	.page-container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.header {
		height: 6vh;
		min-height: 50px;
		background-color: var(--bg-header);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
		position: relative;
		width: 100%;
	}

	.search {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 5px 0;
		height: 38px;
		border-bottom: 2px solid var(--text-primary);
		transition: all 0.2s ease;
	}

	.search:focus-within {
		border-color: var(--color-accent);
	}

	.search svg {
		height: 24px;
		width: 24px;
		opacity: 1;
	}

	.search input {
		color: var(--text-primary);
		font-size: 1.5rem;
		background: none;
		border: none;
		outline: none;
		width: 250px;
		font-family: sans-serif;
	}

	.search input::placeholder {
		color: rgba(255, 255, 255, 0.5);
		font-size: 1rem;
		vertical-align: middle;
	}

	.list {
		flex: 1;
		width: 96%; /* Leave room for ClassFilter sidebar (4%) */
		display: flex;
		flex-wrap: wrap;
		gap: 2%;
		row-gap: 3%;
		padding: 1%;
		padding-right: 5%; /* Extra padding near sidebar */
		align-content: flex-start;
		justify-content: flex-start;
		overflow-y: auto;
		box-sizing: border-box;
		position: relative;
	}

	@media (max-width: 600px) {
		.header {
			height: auto;
			min-height: 6vh;
			justify-content: space-between;
			padding: 10px 5%;
			box-sizing: border-box;
			flex-wrap: wrap;
		}

		.search {
			width: 60%;
			height: auto;
		}

		.search input {
			width: 100%;
			font-size: 1.2rem;
		}

		.list {
			width: 100%;
			padding: 5%;
			padding-top: 20px;
			gap: 5%;
			justify-content: center;
		}
	}
</style>
