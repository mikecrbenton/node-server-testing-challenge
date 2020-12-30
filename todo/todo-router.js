const express = require("express")
const Todo = require("./todo-model")
const router = express.Router()
//=============================

router.get("/", async (req, res, next) => {
	try {
		res.json( await Todo.getAll() )
	} catch(err) {
		next(err)
	}
})



//==============================
module.exports = router