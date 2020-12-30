const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

//========================================

beforeEach( async () => {
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

test("get /", async () => {
   const result = await supertest(server).get("/")
   // STATUS CODE
   expect(result.statusCode).toBe(200)
   // FORMAT ( MIME Type )
   expect(result.type).toBe("application/json")
   // RESPONSE DATA
   expect(result.body.message).toBe("Welcome to ToDo")
   expect(result.body.message).toBeTruthy()
   expect(result.body.message).toBeDefined()
})