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

router.post("/", async(req,res,next) => {
   try{
      console.log(req.body)
      const todo = await Todo.create(req.body)
      res.status(201).json(todo)
   }catch(err) {
      next(err)
   }
})



//==============================
module.exports = router