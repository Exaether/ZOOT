<script lang="ts">
    import Range from "$lib/components/Range.svelte";
    import { images_url, puppiz_url } from "$lib/consts";
	import skillTypes from "$lib/data/skillTypes.json"
    import { parseDesc } from "$lib/utils/blackBoardUtils";
    import Tabs from "./Tabs.svelte";

	let {skills, selectedSkill = $bindable()} = $props();

	// tabs
	let tabItems = skills.map((sk: { name: any; id: any; }, index: number) => {
		return {label: `Skill ${index+1}`, value: index}
	})

	let currentSkill = $state(0);

	let maxSkillLevel = skills[0] ? skills[0].levels.length : 0
	let skillLevel = $state(maxSkillLevel)
	if (skills[0]) {
		updateSelectedSkill(0, 1)
	}

	$effect(() => {
		updateSelectedSkill(currentSkill, skillLevel)
	});
	

	function updateSelectedSkill(skillNumber: number, level: number): void {
		level = level-1
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
			blackboard: skills[skillNumber].levels[level].blackboard
		}
	}

</script>

<section id="skills">
	<Tabs bind:activeTabValue={currentSkill} items={tabItems} />
	<section class="skill">
		{#if skills[0]}
			<div id="levelSelect">
				<div class="imagebox">
					<img src="{puppiz_url}/ui/rank/{Math.min(7, skillLevel)}.png" alt="level">
					{#if skillLevel >= 7}
						<img src="{puppiz_url}/ui/rank/m-{skillLevel - 7}.png" alt="level">
					{/if}
				</div>
				<input type="range" bind:value={skillLevel} min="1" max="{maxSkillLevel}">
			</div>
			<article class="skillDetail">
				<img src="{images_url}/skills/skill_icon_{selectedSkill.id}.webp" alt="skill icon">
				<div class="metadata">
					<p style:--color={skillTypes.SPTypesColors[selectedSkill.spType]}>
						<span class="title">Recovery</span>
						{skillTypes.SPTypesNames[selectedSkill.spType]}</p>

					<p style:--color={skillTypes.SkillTypesColors[selectedSkill.skillType]}>
						<span class="title">Activation</span>
						{selectedSkill.skillType.toLowerCase()}</p>

					<p style:--color={skillTypes.DurationTypesColor[selectedSkill.duration]}>
						<span class="title">Duration</span>
						{skillTypes.DurationTypesNames[selectedSkill.duration] ?? selectedSkill.duration+ "s"}</p>

					<p>
						<span class="title">SP cost</span>
						{selectedSkill.spCost}</p>

					<p>
						<span class="title">Starting SP</span>
						{selectedSkill.initSp}</p>

				</div>
				<h3>{selectedSkill.name}</h3>
				<p class="description">{@html parseDesc(selectedSkill.description, selectedSkill.blackboard)}</p>
				{#if selectedSkill.range}
					<Range rangeId={selectedSkill.range}/>
				{/if}
			</article>
		{/if}
	</section>

</section>

<style>
#skills {
	color: whitesmoke;
	font-family: sans-serif;
	height: 92%;
	width: 100%;
}

.skill {
	color: whitesmoke;
	font-family: sans-serif;
	height: 92%;
	width: 100%;
	background-color: hsla(0, 0%, 20%, 97%);
	display: flex;
	align-items: center;
	gap: 3%;
	padding-left: 1em;
	box-sizing: border-box;
}

#levelSelect {
	margin-top: 5%;
	height: 65%;
	width: 6%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1em;

	div.imagebox {
		width: 100%;
		height: 17%;
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		img {
			width: 90%;
		}
	}

	input[type="range"] {
		writing-mode: sideways-lr;
		height: 77%;
	}
}

:global(.vup) {
	color: hsl(200, 100%, 50%);
}

:global(.vdown) {
	color: hsl(20, 100%, 50%);
}

:global(.rem) {
	color: hsl(40, 100%, 50%);
}

article.skillDetail {
	position: relative;
	background-color: hsl(0, 0%, 30%);
	padding: 1em;
	padding-top: 3em;
	box-sizing: border-box;
	width: 85%;
	img {
		position: absolute;
		top: -3em;
		height: 6em;
	}
	p.description {
		width: 100%;
	}
	.metadata {
		display: flex;
		gap: 1em;
		position: absolute;
		top: -2em;
		height: 2.5em;
		left: 8em;
		width: 80%;
		p {
			margin: 0;
			position: relative;
			flex-grow: 1;
			padding: .5em;
			background-color: var(--color, hsl(0, 0%, 45%));
			color: black;
			text-transform: capitalize;
			white-space: nowrap;
		}
		.title {
			color: whitesmoke;
			position: absolute;
			top: -1em;
			left: 0;
			background-color: hsl(0, 0%, 15%);
			padding: .2em;
			font-size: .7em;
		}
	}
}

@media (max-width: 600px) {
	.skill {
		flex-direction: column;
		padding-bottom: 1em;
		gap: 5em;
	}

	#levelSelect {
		height: 4em;
		width: 90%;
		flex-direction: row-reverse;
		justify-content: start;

		div.imagebox {
			height: 80%;
			width: unset;
			flex-direction: row;
			img {
				height: 100%;
			}
		}
		input[type="range"] {
			writing-mode: initial;
			width: 70%;
			height: 100%;
		}
	}

	article.skillDetail {
		width: 90%;
		.metadata {
			top: -3em;
			flex-wrap: wrap;
			width: 60%;
		}
	}
}

</style>
