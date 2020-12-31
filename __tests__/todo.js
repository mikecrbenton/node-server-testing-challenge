const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

//========================================

// CHANGED FROM beforeEach() TO CORRECTLY ASSESS POST/DELETE TESTS 
beforeAll( async () => {
   // reseeds before each test to restart database
   await db.seed.run()
})

// this is a jest hook that will run after all the tests in the file run
afterAll( async () => {
   // close database connection before the test runner ends, to
   // prevent any warnings about leaks
   await db.destroy()
})

//========================================


// -------------DOES IT RETURN THE EXPECTED :
// - STATUS CODE  ( 200,404, 500 etc...)
// - DATA FORMAT  ( JSON, HTML, XML etc..)
// - DATA         ( Object itself )

describe( "ToDo testing: " , () => {

   // INITIAL TEST OF SERVER
   test("get /", async () => {
      const result = await supertest(server)
         .get("/")
      // STATUS CODE
      expect(result.statusCode).toBe(200)
      // FORMAT ( MIME Type )
      expect(result.type).toBe("application/json")
      // RESPONSE DATA
      expect(result.body.message).toBe("Welcome to ToDo")
      expect(result.body.message).toBeTruthy()
      expect(result.body.message).toBeDefined()
   })

   // GET ALL ITEMS
   it("get /todo", async () => {
      const res = await supertest(server)
         .get("/todo")
      // STATUS CODE
      expect(res.statusCode).toBe(200)
      // MIME TYPE
      expect(res.type).toBe("application/json")
      // DATA
      expect(res.body.length).toBeGreaterThanOrEqual(4)   // data/seeds
      expect(res.body[0].chore).toBe("Dishes")  // check first record
   })

   // POST ITEM
   it("Post a todo", async ()=> {
      const res = await supertest(server)
         .post("/todo")
         .send( { chore: "Water Plants" })

      expect(res.statusCode).toBe(201)
      expect(res.type).toBe("application/json")
      expect(res.body.chore).toBe("Water Plants")
      expect(res.body.id).toBeDefined()    // won't know exact {id} returned
   })

   it("Return created ID", async () => {
      const res = await supertest(server)
         .get("/todo/5") // IN THIS CASE WE KNOW THE ID

      expect(res.statusCode).toBe(200)
      expect(res.type).toBe("application/json")
      expect(res.body.chore).toBe("Water Plants")
      expect(res.body.id).toBe(5)    
   })

   // DELETE ITEM
   it("Delete a todo", async ()=> {
      const res = await supertest(server)
         .delete("/todo/4")

      expect(res.statusCode).toBe(200)
      expect(res.body.removed).toBe(1)
   })

   it("Try and find deleted ID", async () => {
      const res = await supertest(server)
         .get("/todo/4")

      expect(res.statusCode).toBe(404)
   })

})//describe()
