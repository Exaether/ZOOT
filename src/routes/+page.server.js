/** @type {import('./$types').PageServerLoad} */
import { env } from "$env/dynamic/private";
import professions from "$lib/data/professions.json";


export async function load({ params }) {
	return {
		operators: await fetch(env.SLUMBER_URL + "/operators")
			.then(x => x.json())
			.then(data => Object.values(data))
		// sort by subclass
			.then(operators => operators.sort((a, b) => Object.keys(professions[a.profession].subProfs).indexOf(a.subProfession) - Object.keys(professions[b.profession].subProfs).indexOf(b.subProfession)))
		// sort by class
			.then(operators => operators.sort((a, b) => Object.keys(professions).indexOf(a.profession) - Object.keys(professions).indexOf(b.profession)))
		// sort by rarity
			.then(operators => operators.sort((a, b) => b.rarity - a.rarity))
	} 
}
