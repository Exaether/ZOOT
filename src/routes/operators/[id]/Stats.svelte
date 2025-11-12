<script lang="ts">
    import { puppiz_url } from "$lib/consts";

	let { op, selectedPhase = $bindable(), currentLevel = $bindable(), attributes, maxLevel} = $props();

</script>


<section id="attributes">
	<div class="phase-select">
		{#each op.phases as p}
			<input type="radio"
				name="phases"
				id="phase{p}"
				value="{p}"
				bind:group={selectedPhase}/>
			<label for="phase{p}">
				<img src="{puppiz_url}/ui/elite/{p}.png" alt="elite{p}">
			</label>
		{/each}
	</div>

	<div id="levelSelect">
		<input type="number" bind:value={currentLevel} min="1" max="{maxLevel}"/>
		<input type="range" bind:value={currentLevel} min="1" max="{maxLevel}">
	</div>
	<section class="stats">
		
		<div><h4>Max HP: </h4><p>{attributes.maxHP}</p></div>
		<div><h4>ATK: </h4><p>{attributes.atk}</p></div>
		<div><h4>DEF: </h4><p>{attributes.def}</p></div>
		<div><h4>RES: </h4><p>{attributes.res}</p></div>
		<div><h4>Redeployment time: </h4><p>{attributes.respawnTime}s</p></div>
		<div><h4>DP cost: </h4><p>{attributes.cost}</p></div>
		<div><h4>Block: </h4><p>{attributes.block}</p></div>
		<div><h4>Attack interval: </h4><p>{attributes.baseAttackTime}s</p></div>

	</section>
</section>

<style>
#attributes {
	color: whitesmoke;
	font-family: sans-serif;
	height: 46%;
	width: 50%;
	position: absolute;
	top: 4%;
	right: 0;
	background-color: hsla(0, 0%, 20%, 97%);
	display: flex;
	align-items: center;
	gap: 3%;
	padding-left: 1%;
	box-sizing: border-box;

}

.phase-select {
	display: flex;
	flex-direction: column-reverse;
	width: 7%;
	border-radius: 15px;
	background-color: hsl(0, 0%, 10%);

	input {
		display: none;
	}

	label {
		border-radius: 15px;
		transition: background-color .3s;
		aspect-ratio: 1/1 ;
	}

	input:checked+label {
		background-color: hsl(0, 0%, 30%);
	}

	img {
		width: 100%;
		transform: translateY(-5%);
	}
}

#levelSelect {
	height: 65%;
	width: 6%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;

	input[type="number"] {
		color: whitesmoke;
		background: none;
		border: none;
		width: 100%;
		font-size: 1.5em;
		font-weight: bold;
	}

	input[type="range"] {
		writing-mode: sideways-lr;
		height: 80%;
	}
	
	input[type="range"] {

	}
}

.stats {
	width: 80%;
	height: 40%;
	display: flex;
	flex-wrap: wrap;
	gap: 2%;
	align-items: center;
	justify-content: center;
	div {
		display: flex;
		flex-direction: column;
		border: 3px solid hsl(0, 0%, 10%);
		border-radius: 3px;
		text-align: center;
		height: 45%;
		width: 20%;

		h4 {
			margin: 0;
			width: 100%;
			background-color: hsl(0, 0%, 10%);
			font-size: 1.3em;
		}
		p {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0;
			padding: 0;
			vertical-align: middle;
			font-size: 1.3em;
			font-weight: bold;
		}
	}
}


</style>
