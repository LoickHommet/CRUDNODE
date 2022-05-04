const { cp } = require("fs");
const http = require("http");

// const memoryDb = require("./db")
const memoryDb = new Map();
let id = 0;
memoryDb.set(id++, { nom: "Alice" });
memoryDb.set(id++, { nom: "Bob" });
memoryDb.set(id++, { nom: "Charlie" });

const server = http.createServer((req, res) => {
  if (req.url === "/api/names") {
    if (req.method === "GET") {
      let data = "";
      data = JSON.stringify(Array.from(memoryDb.entries()));
      res.writeHead(200, { "content-type": "application/json" });
      res.write(data);
    }
    else if (req.method === "POST") {
        console.log('ici');
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            // INCLURE VOTRE LOGIQUE DE ROUTE ICI

            // ici vous récupérez le JSON sous forme d'un objet Javascript
            data = JSON.parse(data);
            memoryDb.set(++id, data);
            console.log(memoryDb)

            res.end();
        });
    }

    // if (req.method === "PUT") {
    //     const arrayReq = req.url.split("/");
    //     const id = parseInt(arrayReq[arrayReq.length - 1]);

    //     if (id) {
    //         if (memoryDb.has(id)) {
    //             let data = '';
    //             req.on('data', chunk => {
    //                 data += chunk;
    //             });
    //             req.on('end', () => {
    //                 // INCLURE VOTRE LOGIQUE DE ROUTE ICI

    //                 // ici vous récupérez le JSON sous forme d'un objet Javascript 
    //                 data = JSON.parse(data); 
    //                 // memoryDb.set(++id, data);
    //                 memoryDb.set(id, data)

    //                 res.writeHead(201);
    //                 res.end();
    //             });

    //         }

    //         else { // Si l'utilisateur n'existe pas
    //             res.writeHead(404, { 'content-type': "text/html" });
    //             res.write("<h1>Cet utilisateur n'existe pas</h1>");
    //         }
    //     }

    //     else { // Si aucun id n'a été entré
    //         res.writeHead(404, { 'content-type': "text/html" });
    //         res.write("<h1>Cet utilisateur n'existe pas</h1>");
    //     }
    // }

    // if (req.method === "DELETE") {
    //     const arrayReq = req.url.split("/");
    //     const id = parseInt(arrayReq[arrayReq.length - 1]);

    //     if (id) {
    //         if (memoryDb.has(id) != null) {
    //             memoryDb.delete(id);
    //         }

    //         else { // Si l'utilisateur n'existe pas
    //             res.writeHead(404, { 'content-type': "text/html" });
    //             res.write("<h1>Cet utilisateur n'existe pas</h1>");
    //         }
    //     }

    //     else { // Si aucun id n'a été entré
    //         res.writeHead(404, { 'content-type': "text/html" });
    //         res.write("<h1>Cet utilisateur n'existe pas</h1>");
    //     }
    // }
  } else if (req.url.includes("/api/name/")) {
    let data = "";
    const arrayReq = req.url.split("/");
    const id = parseInt(arrayReq[arrayReq.length - 1]);

    data = JSON.stringify(memoryDb.get(id));

    res.writeHead(200, { "content-type": "application/json" });
    res.write(data);
  }

  
  res.end();
});

