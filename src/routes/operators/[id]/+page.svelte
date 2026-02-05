<script lang="ts">
	import { images_url } from "$lib/consts.js";
	import Graphs from "./Graphs.svelte";
	import Infos from "./Infos.svelte";
	import Skills from "./Skills.svelte";
	import Stats from "./Stats.svelte";
	import Tabs from "./Tabs.svelte";

	import { OperatorState } from "$lib/states/OperatorState.svelte";

	// operator data
	let { data } = $props();
	let op = data.op;
	let trait = data.trait;
	let talents = data.talents;
	let phases = data.phases;
	let skills = data.skills;
	let potentials = data.potentials;
	let favor = data.favor;

	// variables
	let operatorState = new OperatorState(phases, potentials, favor);
	let selectedSkill = $state("");

	// tabs
	let tabItems = [
		{ label: "Attributes", value: 1 },
		{ label: "Skills", value: 2 },
		{ label: "Modules", value: 3 },
	];
	let currentTab = $state(1);
</script>

<svelte:head>
	<title>ZOOT: {op.name}</title>
</svelte:head>

<main class="operator-layout">
	<section class="area-image">
		<img src="{images_url}/arts/{op.skins[0]}.webp" alt={op.name} />
	</section>

	<section class="area-infos">
		<Infos
			{op}
			{trait}
			{talents}
			selectedPhase={operatorState.selectedPhase}
			selectedPotential={operatorState.selectedPotential}
		/>
	</section>

	<section class="area-selector">
		<Tabs bind:activeTabValue={currentTab} items={tabItems} />
		<div class="tab-content">
			<div class="tab-pane" class:active={currentTab === 1}>
				<Stats {operatorState} />
			</div>
			<div class="tab-pane" class:active={currentTab === 2}>
				<Skills {skills} bind:selectedSkill />
			</div>
			<div class="tab-pane" class:active={currentTab === 3}>
				<div class="placeholder">Modules coming soon</div>
			</div>
		</div>
	</section>

	<section class="area-graphs">
		<Graphs />
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		background-color: var(--bg-main);
		overflow: hidden;
	}

	.operator-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}

	.area-image {
		grid-area: 1 / 1 / 2 / 2;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		img {
			height: 100%;
			width: auto;
			object-fit: contain;
		}
	}

	.area-infos {
		grid-area: 2 / 1 / 3 / 2;
		overflow: hidden;
		position: relative;
	}

	.area-selector {
		grid-area: 1 / 2 / 2 / 3;
		display: flex;
		flex-direction: column;
		position: relative;
		min-height: 0;
	}

	.tab-content {
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.tab-pane {
		width: 100%;
		height: 100%;
		flex: 1;
		display: none;
		min-height: 0;
	}

	.tab-pane.active {
		display: block;
	}

	.area-graphs {
		grid-area: 2 / 2 / 3 / 3;
		position: relative;
		overflow: hidden;
	}

	.placeholder {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--text-primary);
		font-style: italic;
	}

	@media (max-width: 900px) {
		:global(body) {
			overflow-y: auto;
		}

		.operator-layout {
			display: flex;
			flex-direction: column;
			height: auto;
			min-height: 100vh;
			overflow: visible;
		}

		.area-image {
			height: 50vh;
			width: 100%;
		}

		.area-image img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: top;
		}

		.area-infos {
			min-height: 50vh;
		}

		.area-selector {
			min-height: 50vh;
		}

		.area-graphs {
			min-height: 30vh;
		}
	}
</style>
