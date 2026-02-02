/** @type {import('./$types').PageServerLoad} */
import { env } from "$env/dynamic/private";
import professionsData from "$lib/data/professions.json";
/** @type {any} */
const professions = professionsData;

export async function load({ params }) {
	const response = await fetch(env.SLUMBER_URL + "/operators");
	const data = await response.json();
	let operators = Object.values(data);

	// sort by subclass
	operators.sort((a, b) => {
		const subProfsA = Object.keys(professions[a.profession].subProfs);
		const subProfsB = Object.keys(professions[b.profession].subProfs);
		return subProfsA.indexOf(a.subProfession) - subProfsB.indexOf(b.subProfession);
	});

	// sort by class
	operators.sort((a, b) => {
		const profs = Object.keys(professions);
		return profs.indexOf(a.profession) - profs.indexOf(b.profession);
	});

	// sort by rarity
	operators.sort((a, b) => b.rarity - a.rarity);

	return {
		operators
	};
}
