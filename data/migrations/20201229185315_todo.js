exports.up = async function(knex) {
   await knex.schema.createTable("todo", (table) => {
		table.increments()
      table.text("chore").notNullable()
   })
};

exports.down = async function(knex) {
   await knex.schema.dropTableIfExists("todo")
};
