<script lang="ts">
    import { images_url, puppiz_url } from "$lib/consts";
	import professions from "$lib/data/professions.json";
    import { parseDesc } from "$lib/utils/blackBoardUtils";

	let { op, trait, talents, selectedPhase } = $props();
	let traitDesc: string = $derived(getTraitDesc(selectedPhase))

	function getTalentDesc(talent: { candidates: any[]; }, phase: number): string {
		let desc = "";
		let blackboard = {};
		let candidate = talent.candidates.findLast((c: { unlockPhase: any; }) => c.unlockPhase <= phase );
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
		let candidate = trait.candidates.findLast((c: { unlockPhase: any; }) => c.unlockPhase <= phase );
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
		<h1>{ op.name }</h1>

		<div class="stars">
			{#each {length: op.rarity}, i}
			<svg 
				style:left={ -i * 1.1 }em
				fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z"></path></g>
			</svg>
			{/each}
		</div>

		<div class="classBox">
			<div class="class">
				<img 
					src="{ images_url }/ui/profession/icon_profession_{ op.profession.toLowerCase() }.webp" 
					alt="class">
			</div>
			<div class="subClass" >
				<img 
					src="{ images_url }/ui/subprofession/sub_{ op.subProfession }_icon.webp" 
					alt="subclass">
			</div>
		</div>

		<p class="trait">{@html traitDesc }</p>
	</section>
	<section class="talents">
		<h2>Talents</h2>
		{#each talents as talent}
			<article class="talent">
				<h2>{talent.name}</h2>
				<p>{@html getTalentDesc(talent, selectedPhase) }</p>
			</article>
		{/each}
	</section>
</section>

<style>
#operator {
	color: whitesmoke;
	font-family: sans-serif;
	height: 50%;
	width: 50%;
	position: absolute;
	bottom: 0;
	left: 0;
	background-color: hsla(0, 0%, 20%, 97%);
	box-sizing: border-box;
	padding-left: 2em;
	display: flex;
	gap: 4em;
}

.infos {
	background-color: hsl(0, 0%, 10%);
	position: relative;
	width: 47%;
	height: 100%;
	padding: 1em;
	box-sizing: border-box;
	h1 {
		font-size: 3.5em;
		margin-top: 0;
		margin-bottom: 0;
		margin-right: 5%;
	}
}

.stars {
	svg {
		position: relative;
		fill: hsl(50, 100%, 45%);
		transform: rotate(15deg);
		width: 3.5em;
	}
}

.classBox {
	position: absolute;
	top: 1em;
	right: -8%;
	width: 16%;
}

.subClass, .class {
	width: 100%;
	aspect-ratio: 1 / 1;
	background-color: black;
	margin-bottom: 5%;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		width: 95%;
		height: 95%;
		object-fit: contain;
	}
}

.trait {
	margin-top: 3em;
	font-size: 1em;
	line-height: 2em;
	padding: 1em;
	background-color: hsl(0, 0%, 30%);
}

:global(.kw) {
	background-color: hsl(0, 0%, 20%);
	padding: .15em;
	border-radius: .3em;
	color: hsl(200, 100%, 50%);
}

.talents {
	padding-top: 1em;
	width: 45%;
	display: flex;
	flex-direction: column;
	gap: 5%;
	article {
		border: 3px solid hsl(0, 0%, 10%);
		border-radius: 3px;

		h2 {
			margin: 0;
			width: 100%;
			background-color: hsl(0, 0%, 10%);
		}
		p {
			margin: 1em;
			padding: 0;
		}
	}
}

@media (max-width: 600px) {
	#operator {
		height: unset;
		width: 100%;
		position: static;
		flex-direction: column;
		gap: 1em;
		align-items: center;
		padding: 0;
		padding-bottom: 1em;
	}

	.infos {
		width: 85%;
		height: unset;
	}

	.talents {
		padding-top: 0;
		width: 85%;
		gap: 1em;
	}
}

</style>
