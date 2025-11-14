import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const response = await fetch(env.SLUMBER_URL + "/operators/" + params.id + "/full");
	if (!response.ok) error(404, "Operator not found");
	const operator = await response.json();

	const op = operator.operator;
	const trait = operator.trait;
	const talents = operator.talents;
	const phases = operator.phases;

	const skills = await Promise.all( op.skills.map(async (/** @type {string} */ sk) => {
		const response = await fetch(env.SLUMBER_URL + "/skills/" + sk);
		if (!response.ok) error(404, "Skill not found");
		return response.json();
	}))

	return {
		op,
		trait,
		talents,
		phases,
		skills
	} 
}
