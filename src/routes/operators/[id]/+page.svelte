<script lang="ts">
    import { images_url, puppiz_url } from '$lib/consts.js';
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

<svelte:head>
	<title>ZOOT: {op.name}</title>
</svelte:head>

<section class="image">
	<img src="{ images_url }/arts/{ op.skins[0] }.webp" alt="">
</section>
<Infos {op} {trait} {talents} {selectedPhase}/>
<section id="selector">
	<Tabs bind:activeTabValue={currentTab} items={tabItems} />
	<span hidden={currentTab !== 1}>
		<Stats {phases} bind:selectedPhase bind:attributes/>
	</span>
	<span hidden={currentTab !== 2}>
		<Skills {skills} bind:selectedSkill/>
	</span>
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

@media (max-width: 600px) {
	.image {
		width: 100%;
		height: unset;
		position: static;
		img {
			width: 100%;
		}
	}
	#selector {
		width: 100%;
		height: unset;
		position: static;
	}
}

</style>
