<script lang="ts">
    import { puppiz_url } from '$lib/consts.js';
    import Infos from './Infos.svelte';


let { data } = $props();
let op = data.operator;
let trait = data.trait;
let talents = data.talents;
let selectedPhase = $state(op.phases[op.phases.length - 1]);

</script>

<section class="image">
	<img src="{ puppiz_url }/characters/{ op.skins[0] }.png" alt="">
</section>
<Infos {op} {trait} {talents} {selectedPhase}/>

<style>

.image {
	height: 50%;
	width: 50%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	img {
		height: 100%;
	}
}

</style>
