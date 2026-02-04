<script lang="ts">
	import Range from "$lib/components/Range.svelte";
	import { images_url, puppiz_url } from "$lib/consts";
	import skillTypes from "$lib/data/skillTypes.json";
	import { parseDesc } from "$lib/utils/blackBoardUtils";
	import Tabs from "./Tabs.svelte";

	let { skills, selectedSkill = $bindable() } = $props();

	// tabs for skill selection
	let tabItems = skills.map((sk: { name: any; id: any }, index: number) => {
		return { label: `Skill ${index + 1}`, value: index };
	});

	let currentSkill = $state(0);

	let maxSkillLevel = skills[0] ? skills[0].levels.length : 0;
	let skillLevel = $state(maxSkillLevel);
	if (skills[0]) {
		updateSelectedSkill(0, 1);
	}

	$effect(() => {
		updateSelectedSkill(currentSkill, skillLevel);
	});

	function updateSelectedSkill(skillNumber: number, level: number): void {
		level = level - 1;
		selectedSkill = {
			id: skills[skillNumber].id,
			name: skills[skillNumber].name,
			skillType: skills[skillNumber].skillType,
			durationType: skills[skillNumber].durationType,
			spType: skills[skillNumber].spType,
			token: skills[skillNumber].token,
			description: skills[skillNumber].levels[level].description,
			range: skills[skillNumber].levels[level].range,
			maxCharge: skills[skillNumber].levels[level].maxCharge,
			spCost: skills[skillNumber].levels[level].spCost,
			initSp: skills[skillNumber].levels[level].initSp,
			duration: skills[skillNumber].levels[level].duration,
			blackboard: skills[skillNumber].levels[level].blackboard,
		};
	}
</script>

<section id="skills">
	<div class="skill-tabs-wrapper">
		<Tabs bind:activeTabValue={currentSkill} items={tabItems} />
	</div>

	{#if skills[0]}
		<div class="skill-display">
			<div class="level-controls">
				<div class="rank-image">
					{#if skillLevel <= 7}
						<img
							src="{puppiz_url}/ui/rank/{Math.min(7, skillLevel)}.png"
							alt="level"
						/>
					{:else}
						<img
							src="{puppiz_url}/ui/rank/m-{skillLevel - 7}.png"
							alt="mastery"
						/>
					{/if}
				</div>
				<input
					type="range"
					bind:value={skillLevel}
					min="1"
					max={maxSkillLevel}
					class="level-slider"
				/>
			</div>

			<article class="skill-detail">
				<div class="skill-header">
					<img
						src="{images_url}/skills/skill_icon_{selectedSkill.id}.webp"
						alt="skill icon"
						class="skill-icon"
					/>
					<div class="skill-title-block">
						<h3>{selectedSkill.name}</h3>
						<div class="metadata-grid">
							<div
								class="meta-item"
								style:--color={skillTypes.SPTypesColors[
									selectedSkill.spType
								] || "gray"}
							>
								<span class="label">Recovery</span>
								<span class="value"
									>{skillTypes.SPTypesNames[
										selectedSkill.spType
									]}</span
								>
							</div>

							<div
								class="meta-item"
								style:--color={skillTypes.SkillTypesColors[
									selectedSkill.skillType
								] || "gray"}
							>
								<span class="label">Activation</span>
								<span class="value"
									>{selectedSkill.skillType.toLowerCase()}</span
								>
							</div>

							<div
								class="meta-item"
								style:--color={skillTypes.DurationTypesColor[
									selectedSkill.duration
								] || "gray"}
							>
								<span class="label">Duration</span>
								<span class="value"
									>{skillTypes.DurationTypesNames[
										selectedSkill.duration
									] ?? selectedSkill.duration + "s"}</span
								>
							</div>

							<div class="meta-item sp-cost">
								<span class="label">SP Cost</span>
								<span class="value">{selectedSkill.spCost}</span
								>
							</div>

							<div class="meta-item init-sp">
								<span class="label">Initial SP</span>
								<span class="value">{selectedSkill.initSp}</span
								>
							</div>
						</div>
					</div>
				</div>

				<div class="skill-body">
					<div class="description">
						<p>
							{@html parseDesc(
								selectedSkill.description,
								selectedSkill.blackboard,
							)}
						</p>
					</div>
					{#if selectedSkill.range}
						<div class="range-preview">
							<Range rangeId={selectedSkill.range} />
						</div>
					{/if}
				</div>
			</article>
		</div>
	{/if}
</section>

<style>
	#skills {
		color: whitesmoke;
		font-family: sans-serif;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #2a2a2a;
	}

	.skill-display {
		flex: 1;
		display: flex;
		padding: 1rem;
		gap: 1.5rem;
		overflow-y: auto;
	}

	.level-controls {
		width: 4em;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;

	}

	.rank-image {
		img {
			width: 100%;
		}
	}

	.level-slider {
		writing-mode: sideways-lr;
		cursor: pointer;
	}

	.skill-detail {
		flex: 1;
		background-color: #333;
		border-radius: 4px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		border: 1px solid #444;
	}

	.skill-header {
		display: flex;
		gap: 1.5rem;
		align-items: start;
	}

	.skill-icon {
		width: 80px;
		height: 80px;
		border-radius: 4px;
		background-color: black;
		flex-shrink: 0;
	}

	.skill-title-block {
		flex: 1;
	}

	.skill-title-block h3 {
		margin: 0 0 1rem 0;
		font-size: 1.5em;
		border-bottom: 2px solid #555;
		padding-bottom: 0.5rem;
	}

	.metadata-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		background-color: var(--color, #444);
		padding: 0.4rem 0.8rem;
		border-radius: 4px;
		color: #111;
		min-width: 80px;
	}

	.sp-cost,
	.init-sp {
		background-color: #555;
		color: white;
	}

	.meta-item .label {
		font-size: 0.7em;
		text-transform: uppercase;
		opacity: 0.8;
		margin-bottom: 2px;
	}

	.meta-item .value {
		font-weight: bold;
		text-transform: capitalize;
		white-space: nowrap;
	}

	.skill-body {
		display: flex;
		gap: 1.5rem;
		border-top: 1px solid #444;
		overflow-y: scroll;
		padding-top: 1rem;
		display: flex;
		align-items: center;
	}

	.description {
		flex: 1;
		font-size: 1.1em;
		line-height: 1.6;
		color: #ddd;
	}

	.range-preview {
		flex-shrink: 0;
		padding: 0.5rem;
		background: #222;
		border-radius: 4px;
	}

	:global(.vup) {
		color: hsl(200, 100%, 60%);
		font-weight: bold;
	}
	:global(.vdown) {
		color: hsl(20, 100%, 60%);
		font-weight: bold;
	}
	:global(.rem) {
		color: hsl(40, 100%, 60%);
		font-weight: bold;
	}

	@media (max-width: 700px) {
		.skill-display {
			flex-direction: column;
		}

		.level-controls {
			width: 100%;
			flex-direction: row;
			height: auto;
			gap: 1rem;
		}

		.level-slider {
			writing-mode: horizontal-tb;
			height: auto;
			width: 100%;
		}

		.skill-detail {
			padding: 1rem;
		}

		.skill-header {
			flex-direction: column;
		}

		.skill-icon {
			width: 60px;
			height: 60px;
		}

		.skill-body {
			flex-direction: column-reverse; /* Range on top or bottom? */
		}

		.range-preview {
			align-self: center;
		}
	}
</style>
