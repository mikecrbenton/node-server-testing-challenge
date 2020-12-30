// db connection
const knex = require("knex")
const knexfile = require("../knexfile")

// package.json "test", "server"
module.exports = knex(knexfile[process.env.NODE_ENV]) // need to specify which config 
//module.exports = knex(knexfile)
// CROSS-ENV library ( could use DOT-ENV too)