const request = require('supertest');
const server = require('../server');
const db = require("../db")


describe("Tes fonction CRUD", ()=> {

    it.skip('shoud return a templates with the message' , async () => {
        const res = await request(server)
                    .get("/api/names")
                    .expect(200)
                    .expect('content-type', "text/html")
                expect(JSON.parse(res.body)).toMatchObject(db)
                // db.memoryDb
    })

    // let id = db.id utilise le prochain id disponible 
})