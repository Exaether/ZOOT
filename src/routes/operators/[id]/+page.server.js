import { slumber_url } from "$lib/consts";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const response = await fetch(slumber_url + "/operators/" + params.id + "/full");
	if (!response.ok) error(404, "Operator not found");
	const operator = await response.json();

	const op = operator.operator;
	const trait = operator.trait;
	const talents = operator.talents;
	const phases = operator.phases;

	return {
		op,
		trait,
		talents,
		phases
	} 
}
