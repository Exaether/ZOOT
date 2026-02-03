<script lang="ts">
	import Range from "$lib/components/Range.svelte";
	import { puppiz_url } from "$lib/consts";
	import PotentialSelector from "./PotentialSelector.svelte";
	import type { OperatorState } from "$lib/states/OperatorState.svelte";

	let { operatorState }: { operatorState: OperatorState } = $props();
</script>

<section id="attributes">
	<div class="selectors">
		<div class="phase-select">
			{#each { length: operatorState.phases.length }, p}
				<input
					type="radio"
					name="phases"
					id="phase{p}"
					value={p}
					bind:group={operatorState.selectedPhase}
				/>
				<label for="phase{p}">
					<img src="{puppiz_url}/ui/elite/{p}.png" alt="elite{p}" />
				</label>
			{/each}
		</div>

		<PotentialSelector
			potentials={operatorState.potentials}
			bind:selectedPotential={operatorState.selectedPotential}
		/>

		<div class="trust-select">
			<label for="trust-check">Trust Bonus:</label>
			<input
				type="checkbox"
				id="trust-check"
				bind:checked={operatorState.isTrustBonusActive}
			/>
			<span class="trust-desc">{operatorState.trustBonusText}</span>
		</div>
	</div>

	<div id="levelSelect">
		<input
			type="number"
			bind:value={operatorState.currentLevel}
			min="1"
			max={operatorState.maxLevel}
		/>
		<input
			type="range"
			bind:value={operatorState.currentLevel}
			min="1"
			max={operatorState.maxLevel}
		/>
	</div>
	<section class="stats">
		<div>
			<h4>Max HP</h4>
			<p>{operatorState.attributes.maxHP}</p>
		</div>
		<div>
			<h4>ATK</h4>
			<p>{operatorState.attributes.atk}</p>
		</div>
		<div>
			<h4>DEF</h4>
			<p>{operatorState.attributes.def}</p>
		</div>
		<div>
			<h4>RES</h4>
			<p>{operatorState.attributes.res}</p>
		</div>
		<div>
			<h4>Redeployment time</h4>
			<p>{operatorState.attributes.respawnTime}s</p>
		</div>
		<div>
			<h4>DP cost</h4>
			<p>{operatorState.attributes.cost}</p>
		</div>
		<div>
			<h4>Block</h4>
			<p>{operatorState.attributes.block}</p>
		</div>
		<div>
			<h4>Attack interval</h4>
			<p>{operatorState.attributes.baseAttackTime}s</p>
		</div>
		<div>
			<h4>Range</h4>
			<p><Range rangeId={operatorState.attributes.range} /></p>
		</div>
	</section>
</section>

<style>
	#attributes {
		color: whitesmoke;
		font-family: sans-serif;
		height: 92%;
		width: 100%;
		background-color: hsla(0, 0%, 20%, 97%);
		display: flex;
		align-items: center;
		gap: 3%;
		padding-left: 1%;
		box-sizing: border-box;
	}

	.selectors {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		width: 15%;
	}

	.phase-select {
		display: flex;
		flex-direction: row;
		width: 100%;
		border-radius: 15px;
		background-color: hsl(0, 0%, 10%);
		justify-content: center;
		padding: 0.5em;

		input {
			display: none;
		}

		label {
			border-radius: 15px;
			transition: background-color 0.3s;
			aspect-ratio: 1/1;
			width: 30%;
			margin: 0 2%;
		}

		input:checked + label {
			background-color: hsl(0, 0%, 30%);
		}

		img {
			width: 100%;
			transform: translateY(-5%);
		}
	}

	.trust-select {
		background-color: hsl(0, 0%, 10%);
		border-radius: 15px;
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: whitesmoke;

		label {
			font-weight: bold;
			margin-bottom: 0.2em;
		}

		input[type="checkbox"] {
			width: 1.5em;
			height: 1.5em;
			cursor: pointer;
		}

		.trust-desc {
			font-size: 0.8em;
			margin-top: 0.2em;
			text-align: center;
			color: hsl(0, 0%, 80%);
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
			text-align: center;
		}

		input[type="range"] {
			writing-mode: sideways-lr;
			height: 80%;
		}
	}

	.stats {
		width: 70%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
		align-items: center;
		justify-content: center;
		div {
			display: flex;
			flex-direction: column;
			border: 3px solid hsl(0, 0%, 10%);
			border-radius: 3px;
			text-align: center;
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
				margin: 0.1em;
				padding: 0;
				vertical-align: middle;
				font-size: 1.3em;
				font-weight: bold;
			}
		}
	}

	@media (max-width: 600px) {
		#attributes {
			flex-direction: column;
			gap: 1em;
			padding-top: 1em;
			height: unset;
		}
		.selectors {
			width: 90%;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap; /* Allow wrapping */
		}
		.phase-select {
			width: 30%;
		}
		.trust-select {
			width: 30%;
		}

		#levelSelect {
			height: 2em;
			width: 80%;
			flex-direction: row-reverse;
			input[type="number"] {
				height: 100%;
				width: unset;
			}
			input[type="range"] {
				writing-mode: initial;
				width: 80%;
				height: 100%;
			}
		}
		.stats {
			width: 90%;
			div {
				width: 45%;
			}
		}
	}
</style>
