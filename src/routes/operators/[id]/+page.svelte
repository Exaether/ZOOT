<script lang="ts">
    import { puppiz_url } from '$lib/consts.js';
    import Infos from './Infos.svelte';
    import Stats from './Stats.svelte';


	let { data } = $props();
	let op = data.op;
	let trait = data.trait;
	let talents = data.talents;
	let phases = data.phases;
	let selectedPhase = $state(op.phases[op.phases.length - 1]);
	let maxLevel = $derived(phases[selectedPhase].maxLevel);
	let currentLevel = $derived(Math.min(maxLevel, phases[phases.length - 1].maxLevel));
	let attributes = $derived( calculate_stats(phases[selectedPhase], currentLevel) )

	function calculate_stats(phase: { maxLevel: number; minStats: any; maxStats: any; }, level: number) {
		let levelfactor = level / phase.maxLevel;
		let minStats = phase.minStats;
		let maxStats = phase.maxStats;

		return {
			"maxHP": Math.round(minStats.maxHP + (maxStats.maxHP - minStats.maxHP) * levelfactor),
			"atk": Math.round(minStats.atk + (maxStats.atk - minStats.atk) * levelfactor),
			"def": Math.round(minStats.def + (maxStats.def - minStats.def) * levelfactor),
			"res": Math.round(minStats.res + (maxStats.res - minStats.res) * levelfactor),
			"cost": minStats.cost,
			"baseAttackTime": minStats.baseAttackTime,
			"respawnTime": minStats.respawnTime,
			"block": minStats.block,
			"taunt": minStats.taunt
		}
	}

</script>

<section class="image">
	<img src="{ puppiz_url }/characters/{ op.skins[0] }.png" alt="">
</section>
<Infos {op} {trait} {talents} {selectedPhase}/>
<Stats {op} {phases} bind:selectedPhase bind:currentLevel {attributes} {maxLevel}/>

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

</style>
