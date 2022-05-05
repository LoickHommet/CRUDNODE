const request = require('supertest');
const server = require('../app');
const db = require("../db")


describe("Tes fonction CRUD", ()=> {

    it.skip('shoud return a templates with the message' , async () => {
        const res = await request(server)
                    .get("/api/names")
                    .expect(200)
                    .expect('content-type', /json/)
                expect(JSON.parse(res.body)).toMatchObject(db)
                // db.memoryDb
    })

    // let id = db.id utilise le prochain id disponible 
    it("POST /api/names doit créer un nouvel objet en BDD et le retourner", async () => {
        let insertion = { name: "Insertion" }
        let id = db.id
        const res = await request(app)
          .post("/api/names")
          .send(insertion)
          .expect(201)
          .expect('content-type', /json/)
    
        expect(db.memoryDb.get(id)).toMatchObject(insertion);
      });
    
    
      it.skip("PUT /api/name/:id modifie l'objet correspondant en DB", async () => {
        let modification = { name: "Modified" }
        const res = await request(app)
          .put("/api/name/1")
          .send(modification)
          .expect(204)
        expect(modification).toMatchObject(db.memoryDb.get(1));
      });
    
      it("GET /api/name/:id retourne le JSON de l'objet correspondant en DB", async () => {
        const res = await request(app)
          .get("/api/name/1")
            .expect(200)
            .expect("content-type", /json/);
        expect(JSON.parse(res.text)).toMatchObject(db.memoryDb.get(1));
      });
})