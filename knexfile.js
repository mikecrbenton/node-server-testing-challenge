// NEED TO SPECIFY WHICH CONFIG WHEN RUNNING KNEX COMMANDS

// npx knex migrate:latest --env=development
// npx knex migrate:latest --env=testing

// npx knex seed:run --env=development
// npx knex seed:run --env=testing


module.exports = {

  development: {

   client: "sqlite3",
   useNullAsDefault: true,
   connection: {
      filename: "./data/todo.db3",
   },
   migrations: {
      directory: "./data/migrations",
   },
   seeds: {
      directory: "./data/seeds",
   },

  },

  testing: {

   client: "sqlite3",
   useNullAsDefault: true,
   connection: {
      filename: "./data/test.db3",
   },
   migrations: {
      directory: "./data/migrations",
   },
   seeds: {
      directory: "./data/seeds",
   },
 }

};
