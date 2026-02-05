<script lang="ts">
	import Range from "$lib/components/Range.svelte";
	import { puppiz_url } from "$lib/consts";
	import PotentialSelector from "./PotentialSelector.svelte";
	import type { OperatorState } from "$lib/states/OperatorState.svelte";

	let { operatorState }: { operatorState: OperatorState } = $props();
</script>

<section id="attributes">
	<div class="sidebar">
		<div class="level-select">
			<div class="level-display">
				<div class="level-circle">
					<input
						type="number"
						bind:value={operatorState.currentLevel}
						min="1"
						max={operatorState.maxLevel}
					/>
				</div>
			</div>

			<input
				type="range"
				bind:value={operatorState.currentLevel}
				min="1"
				max={operatorState.maxLevel}
				class="level-slider"
			/>
		</div>

		<div class="phase-select">
			{#each { length: operatorState.phases.length }, p}
				<input
					type="radio"
					name="phases"
					id="phase{p}"
					value={p}
					bind:group={operatorState.selectedPhase}
				/>
				<label
					for="phase{p}"
					class:selected={operatorState.selectedPhase === p}
				>
					<img src="{puppiz_url}/ui/elite/{p}.png" alt="elite{p}" />
				</label>
			{/each}
		</div>

		<PotentialSelector
			potentials={operatorState.potentials}
			bind:selectedPotential={operatorState.selectedPotential}
		/>

		<div class="trust-select">
			<label class="trust-label">
				<span>Trust Bonus</span>
				<input
					type="checkbox"
					bind:checked={operatorState.isTrustBonusActive}
				/>
			</label>
			{#if operatorState.isTrustBonusActive}
				<span class="trust-desc">{operatorState.trustBonusText}</span>
			{/if}
		</div>
	</div>

	<div class="stats-container">
		<div class="stats-grid">
			<div class="stat-item">
				<h4>Max HP</h4>
				<p>{operatorState.attributes.maxHP}</p>
			</div>
			<div class="stat-item">
				<h4>ATK</h4>
				<p>{operatorState.attributes.atk}</p>
			</div>
			<div class="stat-item">
				<h4>DEF</h4>
				<p>{operatorState.attributes.def}</p>
			</div>
			<div class="stat-item">
				<h4>RES</h4>
				<p>{operatorState.attributes.res}</p>
			</div>

			<div class="stat-item">
				<h4>Redeploy</h4>
				<p>{operatorState.attributes.respawnTime}s</p>
			</div>
			<div class="stat-item">
				<h4>Cost</h4>
				<p>{operatorState.attributes.cost}</p>
			</div>
			<div class="stat-item">
				<h4>Block</h4>
				<p>{operatorState.attributes.block}</p>
			</div>
			<div class="stat-item">
				<h4>Attack Interval</h4>
				<p>{operatorState.attributes.baseAttackTime}s</p>
			</div>
		</div>

		<div class="stat-item range">
			<h4>Range</h4>
			<div class="range-box">
				<Range rangeId={operatorState.attributes.range} />
			</div>
		</div>
	</div>
</section>

<style>
	#attributes {
		color: var(--text-primary);
		font-family: sans-serif;
		height: 100%;
		width: 100%;
		background-color: var(--bg-main);
		display: flex;
		padding: 1.5rem;
		box-sizing: border-box;
		gap: 2rem;
	}

	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 25%;
		min-width: 140px;
	}

	.phase-select {
		display: flex;
		justify-content: space-around;
		padding: 0.5rem;
		background-color: var(--bg-secondary);
		border-radius: 4px;

		input {
			display: none;
		}

		label {
			cursor: pointer;
			opacity: 0.2;
			transition: all 0.3s;
			width: 28%;
		}

		label:hover {
			opacity: 0.8;
		}

		label.selected {
			opacity: 1;
			transform: scale(1.15);
			filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
		}

		img {
			width: 100%;
			display: block;
		}
	}

	.level-select {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.level-display {
		display: flex;
		justify-content: center;
	}

	.level-circle {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		border: 4px solid #fccd32;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--bg-box);
		box-shadow: 0 0 10px rgba(252, 205, 50, 0.2);
	}

	.level-circle input {
		background: none;
		border: none;
		color: var(--text-primary);
		font-size: 1.8em;
		font-weight: bold;
		text-align: center;
		width: 100%;
		outline: none;
		font-family: sans-serif;
	}

	.level-circle input::-webkit-outer-spin-button,
	.level-circle input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.level-circle input[type="number"] {
		-moz-appearance: textfield;
	}

	.level-slider {
		width: 100%;
		cursor: pointer;
	}

	.trust-select {
		background-color: var(--bg-secondary);
		border-radius: 4px;
		padding: 10px;
	}

	.trust-label {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		cursor: pointer;
	}

	.trust-desc {
		display: block;
		margin-top: 0.5rem;
		font-size: 0.9em;
		color: var(--text-desc);
		text-align: center;
	}

	.stats-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, auto);
		gap: 10px;
	}

	.stat-item {
		background-color: var(--bg-box);
		border-radius: 4px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		text-align: center;
		border: 1px solid var(--color-border);

		h4 {
			margin: 0;
			background-color: var(--bg-secondary);
			padding: 8px 4px;
			font-size: 0.85em;
			color: var(--text-label);
			text-transform: uppercase;
		}

		p {
			margin: 0;
			padding: 12px 4px;
			font-size: 1.3em;
			font-weight: bold;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.range-box {
			display: flex;
			justify-content: center;
			margin-block: 1em;
		}
	}
	.range {
		width: fit-content;
		align-self: center;
		min-width: 10em;
	}

	@media (max-width: 800px) {
		#attributes {
			flex-direction: column;
		}

		.sidebar {
			width: 100%;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
		}

		.phase-select,
		.trust-select {
			width: 40%;
			min-width: 100px;
		}
		.level-select {
			width: 90%;
			min-width: 100px;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
