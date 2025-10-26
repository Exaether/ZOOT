/** @type {import('./$types').PageServerLoad} */
import professions from "$lib/data/professions.json";
import subProfs from "$lib/data/subProf.json";

export async function load({ params }) {
	return {
		operators: await fetch("http://127.0.0.1:8001/operators")
			.then(x => x.json())
			.then(data => Object.values(data))
			.then(operators => operators.sort((a, b) => Object.keys(subProfs).indexOf(a.subProfession) - Object.keys(subProfs).indexOf(b.subProfession)))
			.then(operators => operators.sort((a, b) => Object.keys(professions).indexOf(a.profession) - Object.keys(professions).indexOf(b.profession)))
	} 
}
