<script lang="ts">
	import professionsData from "$lib/data/professions.json";
	const professions = professionsData as any;
	import { puppiz_url } from "$lib/consts";
	import { slide } from "svelte/transition";

	import type { Operator } from "$lib/types";

	let { opFilter = $bindable() } = $props();

	let selectedClass: string = $state("");
	let selectedSubClass: string = $state("");

	function setClassFilter(prof: string): void {
		selectedSubClass = "";
		selectedClass = prof;
		if (prof == "") {
			opFilter = () => true;
		} else {
			opFilter = (op: Operator) => op.profession == prof;
		}
	}

	function setSubClassFilter(subProf: string): void {
		selectedSubClass = subProf;
		opFilter = (op: Operator) => op.subProfession == subProf;
	}
</script>

<div class="classFilter">
	<button
		class="filterButton {selectedClass == '' ? 'activeFilter' : ''}"
		onclick={() => setClassFilter("")}
	>
		ALL
	</button>
	{#each Object.keys(professions) as prof}
		<button
			class="filterButton {selectedClass == prof ? 'activeFilter' : ''}"
			onclick={() => setClassFilter(prof)}
		>
			<img
				src="{puppiz_url}/classes/class_{professions[prof].name}.png"
				alt=""
			/>
		</button>
	{/each}
</div>
{#each Object.keys(professions) as prof}
	{#if selectedClass == prof}
		<div
			transition:slide={{ axis: "x", duration: 200 }}
			class="subClassFilter"
		>
			{#each Object.keys(professions[prof].subProfs) as sub}
				<button
					class="filterButton {selectedSubClass == sub
						? 'activeFilter'
						: ''}"
					onclick={() => setSubClassFilter(sub)}
				>
					<img
						src="{puppiz_url}/ui/subclass/sub_{sub}_icon.png"
						alt=""
					/>
				</button>
			{/each}
		</div>
	{/if}
{/each}

<style>
	.classFilter,
	.subClassFilter {
		position: fixed;
		z-index: 1;
		top: 0;
		right: 0;
		height: 100vh;
		width: 4%;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		gap: 10px;
		align-items: center;
		background-color: var(--bg-header);
		overflow-y: scroll;
	}

	.filterButton {
		background: none;
		padding: 0;
		width: 90%;
		aspect-ratio: 1;
		border-radius: 0;
		border: none;
		color: var(--text-primary);
		font-weight: bold;
		font-size: 2em;
		transition: filter 0.3s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.filterButton img {
		object-fit: contain;
		max-width: 100%;
		max-height: 100%;
	}

	.subClassFilter {
		border-right: 5px solid var(--color-accent);
		right: 4%;
	}

	.activeFilter {
		filter: invert(50%) sepia(70%) saturate(690%) hue-rotate(159deg)
			brightness(93%) contrast(94%);
	}

	@media (max-width: 600px) {
		.classFilter,
		.subClassFilter {
			flex-direction: row;
			height: 6vh;
			width: 100vw;
			top: 6vh;
			left: 0;
		}
		.subClassFilter {
			top: 12vh;
			border-top: 2px solid var(--color-accent);
			border-right: none;
		}
		.filterButton {
			width: unset;
			height: 90%;
			font-size: 1.5em;
		}
	}
</style>
