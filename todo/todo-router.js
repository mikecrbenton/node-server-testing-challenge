const express = require("express")
const Todo = require("./todo-model")
const router = express.Router()
//=============================

// GET ALL
router.get("/", async (req, res, next) => {
	try {
		res.json( await Todo.getAll() )
	} catch(err) {
		next(err)
	}
})

// GET BY ID
router.get('/:id', (req, res) => {
   const { id } = req.params;
 
   Todo.findById(id)
   .then( todo => {
     if ( todo ) {
       res.json( todo);
     } else {
       res.status(404).json({ message: 'Could not find scheme with given id.' })
     }
   })
   .catch(err => {
     res.status(500).json({ message: 'Failed to get schemes' });
   });
 });

 // POST
router.post("/", async(req,res,next) => {
   try{
      console.log(req.body)
      const todo = await Todo.create(req.body)
      res.status(201).json(todo)
   }catch(err) {
      next(err)
   }
})

// DELETE
router.delete('/:id', (req, res) => {
   const { id } = req.params;
 
   Todo.remove(id)
   .then(amountDeleted => {
     if (amountDeleted) {
       res.json({ removed: amountDeleted });
     } else {
       res.status(404).json({ message: 'Could not find todo with given id' });
     }
   })
   .catch(err => {
     res.status(500).json({ message: 'Failed to delete scheme' });
   });
 });



//==============================
module.exports = router