const db = require("../data/config")

//=============================

function getAll(){
   return db("todo")
}

function findById(id) {
	return db("todo").where({id}).first()
}

async function create(data) {
   const [id] = await db("todo").insert(data)
	return findById(id)
}

function remove(id) {
   return db("todo").where("id", id).del()
}
//=============================

module.exports = {
   getAll,
   findById,
   create,
   remove,
}
