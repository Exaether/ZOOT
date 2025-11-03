import { slumber_url } from "$lib/consts";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const response = await fetch(slumber_url + "/operators/" + params.id);
	if (!response.ok) error(404, "Operator not found");
	const operator = await response.json();

	const trait = await fetch(slumber_url + "/operators/" + params.id + "/trait")
		.then(x => x.json());

	const talents = await Promise.all(
	operator.talents.map(async (/** @type {string} */ i) => {
	  return await fetch(slumber_url + "/operators/" + params.id + "/talents/" + i)
	  .then(x => x.json())
	}));


	return {
		operator,
		trait,
		talents
	} 
}
