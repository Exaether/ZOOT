<script lang="ts">
	import Range from "$lib/components/Range.svelte";
	import { images_url, puppiz_url } from "$lib/consts";

	let {
		phases,
		potentials,
		favor,
		selectedPhase = $bindable(),
		attributes = $bindable(),
		selectedPotential = $bindable(),
	} = $props();

	// variables
	selectedPhase = phases.length - 1;
	let maxLevel = $derived(phases[selectedPhase].maxLevel);
	let currentLevel = $derived(
		Math.min(maxLevel, phases[phases.length - 1].maxLevel),
	);

	let trustBonus = $state(false);
	let isDropdownOpen = $state(false);

	attributes = calculate_stats(
		phases[selectedPhase],
		1,
		selectedPotential,
		false,
	);

	$effect(() => {
		attributes = calculate_stats(
			phases[selectedPhase],
			currentLevel,
			selectedPotential,
			trustBonus,
		);
	});

	type StatKey =
		| "maxHP"
		| "atk"
		| "def"
		| "res"
		| "cost"
		| "baseAttackTime"
		| "respawnTime"
		| "block"
		| "taunt";

	function calculate_stats(
		phase: {
			range: any;
			maxLevel: number;
			minStats: any;
			maxStats: any;
		},
		level: number,
		potentialRank: number,
		trust: boolean,
	) {
		let levelfactor = level / phase.maxLevel;
		let minStats = phase.minStats;
		let maxStats = phase.maxStats;

		let stats = {
			range: phase.range,
			maxHP: Math.round(
				minStats.maxHP +
					(maxStats.maxHP - minStats.maxHP) * levelfactor,
			),
			atk: Math.round(
				minStats.atk + (maxStats.atk - minStats.atk) * levelfactor,
			),
			def: Math.round(
				minStats.def + (maxStats.def - minStats.def) * levelfactor,
			),
			res: Math.round(
				minStats.res + (maxStats.res - minStats.res) * levelfactor,
			),
			cost: minStats.cost,
			baseAttackTime: minStats.baseAttackTime,
			respawnTime: minStats.respawnTime,
			block: minStats.block,
			taunt: minStats.taunt,
		};

		// Apply potential buffs
		for (let i = 0; i < potentialRank; i++) {
			if (i >= potentials.length) break;

			const p = potentials[i];
			if (p.type === "BUFF") {
				const attr = p.attribute.toLowerCase();

				let statKey: StatKey | "" = "";
				if (attr === "max_hp" || attr === "hp") statKey = "maxHP";
				else if (attr === "atk") statKey = "atk";
				else if (attr === "def") statKey = "def";
				else if (attr === "magic_resistance" || attr === "res")
					statKey = "res";
				else if (attr === "cost" || attr === "dp_cost")
					statKey = "cost";
				else if (attr === "attack_speed") statKey = "baseAttackTime";
				else if (attr === "block_cnt") statKey = "block";
				else if (attr === "respawn_time") statKey = "respawnTime";

				if (statKey && stats[statKey] !== undefined) {
					if (p.formula === "ADDITION") {
						stats[statKey] += p.value;
					}
				}
			}
		}

		// Apply Trust Bonus
		if (trust && favor) {
			for (const key in favor) {
				if (stats[key as StatKey] !== undefined) {
					stats[key as StatKey] += favor[key];
				}
			}
		}

		return stats;
	}

	function getTrustBonusText(favor: Record<string, number>): string {
		if (!favor) return "";
		let bonuses: string[] = [];
		for (const [key, value] of Object.entries(favor)) {
			if (value > 0) {
				let name = key;
				if (key === "maxHP") name = "Max HP";
				else if (key === "atk") name = "ATK";
				else if (key === "def") name = "DEF";
				else if (key === "res") name = "RES";
				else if (key === "attack_speed") name = "ASPD";

				if (name) bonuses.push(`${name} +${value}`);
			}
		}
		return bonuses.join(", ");
	}

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function selectPotential(rank: number) {
		selectedPotential = rank;
		isDropdownOpen = false;
	}

	function closeDropdown(event: MouseEvent) {}
</script>

<svelte:window
	onclick={(e) => {
		// Close dropdown if clicked outside
		if (
			isDropdownOpen &&
			!(e.target as Element).closest(".custom-select")
		) {
			isDropdownOpen = false;
		}
	}}
/>

<section id="attributes">
	<div class="selectors">
		<div class="phase-select">
			{#each { length: phases.length }, p}
				<input
					type="radio"
					name="phases"
					id="phase{p}"
					value={p}
					bind:group={selectedPhase}
				/>
				<label for="phase{p}">
					<img src="{puppiz_url}/ui/elite/{p}.png" alt="elite{p}" />
				</label>
			{/each}
		</div>

		<div class="potential-select">
			<label for="potential-select-input">Potential:</label>
			<div class="custom-select">
				<button class="selected-option" onclick={toggleDropdown}>
					<img
						src="{images_url}/ui/potential/potential_{selectedPotential}.webp"
						alt="Rank {selectedPotential}"
					/>
				</button>
				{#if isDropdownOpen}
					<div class="options-list">
						{#each { length: 6 }, i}
							<button
								class="option"
								onclick={() => selectPotential(i)}
							>
								<img
									src="{images_url}/ui/potential/potential_{i}.webp"
									alt="Rank {i}"
								/>
								<span class="option-desc">
									{#if i > 0}
										{potentials[i - 1].description}
									{:else}
										Base
									{/if}
								</span>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>

		<div class="trust-select">
			<label for="trust-check">Trust Bonus:</label>
			<input type="checkbox" id="trust-check" bind:checked={trustBonus} />
			<span class="trust-desc">{getTrustBonusText(favor)}</span>
		</div>
	</div>

	<div id="levelSelect">
		<input type="number" bind:value={currentLevel} min="1" max={maxLevel} />
		<input type="range" bind:value={currentLevel} min="1" max={maxLevel} />
	</div>
	<section class="stats">
		<div>
			<h4>Max HP</h4>
			<p>{attributes.maxHP}</p>
		</div>
		<div>
			<h4>ATK</h4>
			<p>{attributes.atk}</p>
		</div>
		<div>
			<h4>DEF</h4>
			<p>{attributes.def}</p>
		</div>
		<div>
			<h4>RES</h4>
			<p>{attributes.res}</p>
		</div>
		<div>
			<h4>Redeployment time</h4>
			<p>{attributes.respawnTime}s</p>
		</div>
		<div>
			<h4>DP cost</h4>
			<p>{attributes.cost}</p>
		</div>
		<div>
			<h4>Block</h4>
			<p>{attributes.block}</p>
		</div>
		<div>
			<h4>Attack interval</h4>
			<p>{attributes.baseAttackTime}s</p>
		</div>
		<div>
			<h4>Range</h4>
			<p><Range rangeId={attributes.range} /></p>
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

	.potential-select {
		background-color: hsl(0, 0%, 10%);
		border-radius: 15px;
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		align-items: center;

		label {
			font-weight: bold;
		}

		.custom-select {
			position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		button.selected-option {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5em;
			background: none;
			border: none;
			cursor: pointer;
			img {
				width: 3em;
				height: 3em;
			}
		}

		.options-list {
			position: absolute;
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
			background-color: hsl(0, 0%, 15%);
			border-radius: 5px;
			padding: 0.5em;
			display: flex;
			flex-direction: column;
			gap: 0.5em;
			z-index: 10;
			max-height: 300px;
			overflow-y: auto;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
			width: max-content;
			min-width: 100%;

			.option {
				background: none;
				border: none;
				cursor: pointer;
				padding: 0.2em;
				transition: background-color 0.2s;
				border-radius: 5px;
				display: flex;
				align-items: center;
				gap: 0.5em;
				text-align: left;
				color: whitesmoke;

				&:hover {
					background-color: hsl(0, 0%, 25%);
				}

				img {
					width: 2.5em;
					height: 2.5em;
					flex-shrink: 0;
				}

				.option-desc {
					font-size: 0.9em;
					white-space: nowrap;
				}
			}
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
		.potential-select {
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
