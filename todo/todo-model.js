const db = require("../data/config")

//=============================

function getAll(){
   return db("todo")
}
//=============================

module.exports = {
   getAll,
   
}
