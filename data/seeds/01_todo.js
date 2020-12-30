
exports.seed = async function(knex) {
   await knex("todo").truncate()
	await knex("todo").insert([
		{ chore: "Dishes" },
		{ chore: "Snow Shoveling" },
		{ chore: "Laundry" },
		{ chore: "Eat" },
	])
};
