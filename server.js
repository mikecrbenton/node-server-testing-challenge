const express = require("express")
const cors = require("cors")
const todoRouter = require("./todo/todo-router")

const server = express()

server.use(cors())
server.use(express.json())

server.use("/todo", todoRouter)

server.get("/", (req, res) => {
	res.json({
		message: "Welcome to ToDo",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

// need to export for supertest
module.exports = server