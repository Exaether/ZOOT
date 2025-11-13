<script lang="ts">
    import { puppiz_url } from "$lib/consts";
    import { parseDesc } from "$lib/utils/blackBoardUtils";
    import Tabs from "./Tabs.svelte";

	let {skills, selectedSkill = $bindable()} = $props();

	// tabs
	let tabItems = skills.map((sk: { name: any; id: any; }, index: number) => {
		return {label: sk.name, value: index}
	})
	let currentTab = $state(0);

	let maxSkillLevel = skills[0].levels.length
	let skillLevel = $state(maxSkillLevel)
	updateSelectedSkill(0, 1)

	$effect(() => {
		updateSelectedSkill(currentTab, skillLevel)
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
<Tabs bind:activeTabValue={currentTab} items={tabItems} />
	{#each skills as sk, index}
		{#if index === currentTab}
			<section class="skill">
				<div id="levelSelect">
					<div class="imagebox">
						<img src="{puppiz_url}/ui/rank/{Math.min(7, skillLevel)}.png" alt="level">
						{#if skillLevel >= 7}
							<img src="{puppiz_url}/ui/rank/m-{skillLevel - 7}.png" alt="level">
						{/if}
					</div>
					<input type="range" bind:value={skillLevel} min="1" max="{maxSkillLevel}">
				</div>
				<p class="description">{@html parseDesc(selectedSkill.description, selectedSkill.blackboard)}</p>
			</section>
		{/if}
	{/each}

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
	
	.description {
		width: 80%;
	}
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

</style>
