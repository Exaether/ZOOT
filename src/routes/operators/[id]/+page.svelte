<script lang="ts">
    import { puppiz_url } from '$lib/consts.js';
    import Graphs from './Graphs.svelte';
    import Infos from './Infos.svelte';
    import Skills from './Skills.svelte';
    import Stats from './Stats.svelte';
    import Tabs from './Tabs.svelte';


	// operator data
	let { data } = $props();
	let op = data.op;
	let trait = data.trait;
	let talents = data.talents;
	let phases = data.phases;
	let skills = data.skills;

	// variables
	let selectedPhase = $state();
	let attributes = $state();
	let selectedSkill = $state();

	// tabs
	let tabItems = [
		{ label: "Attributes", value: 1 },
		{ label: "Skills", value: 2 },
		{ label: "Modules", value: 3 }
	];
	let currentTab = $state(1);
</script>

<section class="image">
	<img src="{ puppiz_url }/characters/{ op.skins[0] }.png" alt="">
</section>
<Infos {op} {trait} {talents} {selectedPhase}/>
<section id="selector">
	<Tabs bind:activeTabValue={currentTab} items={tabItems} />
	{#if 1 === currentTab}
		<Stats {phases} bind:selectedPhase bind:attributes/>
	{/if}
	{#if 2 === currentTab}
		<Skills {skills} bind:selectedSkill/>
	{/if}
</section>

<Graphs/>

<style>

.image {
	height: 50%;
	width: 50%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	box-sizing: content-box;
	img {
		height: 100%;
	}
}

#selector {
	height: 50%;
	width: 50%;
	position: absolute;
	top: 0;
	right: 0;
	box-sizing: content-box;
}
</style>
