<script lang="ts">
	import professions from "$lib/data/professions.json";
	import subProfs from "$lib/data/subProf.json";
	import subProfsToProf from "$lib/data/subProfToProf.json";

	let { opFilter = $bindable() } = $props();

	let selectedClass: string = $state("");
	let selectedSubClass: string = $state("");

	function setClassFilter(prof: string): void {
		selectedSubClass = "";
		selectedClass = prof;
		if (prof == "") {
			opFilter = () => true;
		} else {
			opFilter = (op: { profession: any; }) => op.profession == prof
		}
	}

	function setSubClassFilter(subProf: string): void {
		selectedSubClass = subProf;
		opFilter = (op: { subProfession: any; }) => op.subProfession == subProf
	}


</script>

<div class="classFilter">
	<button class="filterButton {selectedClass == "" ? "activeFilter" : ""}" onclick="{() => setClassFilter("") }"> 
		ALL
	</button>
	{#each Object.keys(professions) as prof}
		<button 
			class="filterButton {selectedClass == prof ? "activeFilter" : ""}" 
			onclick="{() => setClassFilter(prof) }"> 
			<img src="https://raw.githubusercontent.com/PuppiizSunniiz/Arknight-Images/refs/heads/main/classes/class_{ professions[prof] }.png" alt="">
		</button>
	{/each}
</div>
{#each Object.keys(professions) as prof}
	<div class="subClassFilter { selectedClass == prof ? "active" : ""}">
		{#each Object.keys(subProfs).filter((sub) => subProfsToProf[sub] == prof) as sub}
			<button 
				class="filterButton {selectedSubClass == sub ? "activeFilter" : ""}" 
				onclick="{() => setSubClassFilter(sub) }"> 
				<img src="https://raw.githubusercontent.com/PuppiizSunniiz/Arknight-Images/refs/heads/main/ui/subclass/sub_{ sub }_icon.png" alt="">
			</button>
		{/each}
	</div>
{/each}

<style>
.classFilter, .subClassFilter{
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;
	width: 4%;
	display: flex;
	flex-direction: column;
	background-color: black;
	justify-content: space-evenly;
	align-items: center;
	overflow-y: scroll;
}

.filterButton {
	background: none;
	width: 90%;
	aspect-ratio: 1 / 1;
	border-radius: 0;
	border: none;
	color: white;
	font-weight: bold;
	font-size: 2em;
}

.filterButton img {
	width: 100%;
}

.subClassFilter {
	border-right: 5px solid hsl(200, 80%, 50%);
	display: none;
	right: 4% }

.subClassFilter.active {
	display: flex;
}

.activeFilter {
	filter: invert(50%) sepia(70%) saturate(690%) hue-rotate(159deg) brightness(93%) contrast(94%);
}
</style>
