<script lang="ts">
	import { images_url, puppiz_url } from "$lib/consts";
	import { parseDesc } from "$lib/utils/blackBoardUtils";

	let { op, trait, talents, selectedPhase, selectedPotential = 0 } = $props();
	let traitDesc: string = $derived(getTraitDesc(selectedPhase));

	function getTalentDesc(
		talent: { candidates: any[] },
		phase: number,
		potential: number,
	): string {
		let desc = "";
		let blackboard = {};

		let candidate = talent.candidates.findLast(
			(c: { unlockPhase: any; unlockPotentialRank: any }) => {
				let phaseOk = c.unlockPhase <= phase;
				let potOk = (c.unlockPotentialRank || 0) <= potential;
				return phaseOk && potOk;
			},
		);

		if (candidate != undefined) {
			desc = candidate.description;
			blackboard = candidate.blackboard;
		}

		desc = parseDesc(desc, blackboard);

		return desc;
	}

	function getTraitDesc(phase: number): string {
		let desc = trait.description;
		let blackboard = {};
		let candidate = trait.candidates.findLast(
			(c: { unlockPhase: any }) => c.unlockPhase <= phase,
		);
		if (candidate != undefined) {
			if (candidate.overrideDescription) {
				desc = candidate.overrideDescription;
			}
			blackboard = candidate.blackboard;
		}

		desc = parseDesc(desc, blackboard);

		return desc;
	}
</script>

<section id="operator">
	<section class="infos">
		<div class="header-row">
			<h1>{op.name}</h1>
			<div class="stars">
				{#each { length: op.rarity }, i}
					<svg
						style:left="{-i * 0.8}em"
						fill="#000000"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"> </g> <g id="SVGRepo_iconCarrier"> <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z"> </path> </g>
					</svg>
				{/each}
			</div>
		</div>

		<div class="classBox">
			<div class="class">
				<img
					src="{images_url}/ui/profession/icon_profession_{op.profession.toLowerCase()}.webp"
					alt="class"
				/>
			</div>
			<div class="subClass">
				<img
					src="{images_url}/ui/subprofession/sub_{op.subProfession}_icon.webp"
					alt="subclass"
				/>
			</div>
		</div>

		<p class="trait">{@html traitDesc}</p>
	</section>

	<section class="talents">
		<h2>Talents</h2>
		<div class="talents-list">
			{#each talents as talent}
				<article class="talent">
					<h3>{talent.name}</h3>
					<p>
						{@html getTalentDesc(
							talent,
							selectedPhase,
							selectedPotential,
						)}
					</p>
				</article>
			{/each}
		</div>
	</section>
</section>

<style>
	#operator {
		color: var(--text-primary);
		font-family: sans-serif;
		height: 100%;
		width: 100%;
		background-color: var(--bg-main);
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
	}

	.infos {
		background-color: var(--bg-secondary);
		position: relative;
		flex: 1;
		height: 100%;
		padding: 2em;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 1em;
		overflow-y: auto;
	}

	.header-row {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding-right: 20%;
	}

	.infos h1 {
		font-size: 2.5em;
		margin: 0;
		word-wrap: break-word;
		line-height: 1.1;
	}

	.stars {
		display: flex;
		height: 3em;
		align-items: center;
		margin-top: 0.5em;

		svg {
			position: relative;
			fill: var(--star-color);
			transform: rotate(15deg);
			width: 3em;
			flex-shrink: 0;
		}
	}

	.classBox {
		position: absolute;
		top: 2em;
		right: 1em;
		width: 4em;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.subClass,
	.class {
		width: 100%;
		aspect-ratio: 1 / 1;
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: 90%;
			height: 90%;
			object-fit: contain;
		}
	}

	.trait {
		font-size: 1.1em;
		line-height: 1.6;
		padding: 1.5em;
		background-color: var(--bg-box);
		border-radius: 4px;
		margin-top: 2em;
		margin-bottom: auto;
		border-left: 4px solid var(--color-accent);
	}

	:global(.kw) {
		color: hsl(200, 100%, 60%);
		font-weight: bold;
	}

	.talents {
		flex: 1;
		padding: 2em;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
	}

	.talents h2 {
		margin-top: 0;
		border-bottom: 2px solid var(--color-border);
		padding-bottom: 0.5em;
		margin-bottom: 1em;
	}

	.talents-list {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.talent {
		background-color: var(--bg-box);
		border-radius: 4px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border);

		h3 {
			margin: 0;
			background-color: var(--bg-secondary);
			padding: 8px 10px;
			font-size: 0.9em;
			color: var(--text-label);
		}

		p {
			margin: 0;
			padding: 12px 10px;
			font-size: 1.1em;
		}
	}

	@media (max-width: 1200px) {
		.infos h1 {
			font-size: 2em;
		}
	}

	@media (max-width: 900px) {
		#operator {
			flex-direction: column;
			height: auto;
		}
		.infos,
		.talents {
			width: 100%;
			flex: none;
			height: auto;
		}
		.header-row {
			padding-right: 0;
		}
		.classBox {
			position: static;
			flex-direction: row;
			width: auto;
			margin-top: 1em;
			justify-content: flex-start;
		}
		.subClass,
		.class {
			width: 3em;
		}
	}
</style>
