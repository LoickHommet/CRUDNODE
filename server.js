const { cp } = require("fs");
const http = require("http");

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
    if (req.method === "POST") {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            // INCLURE VOTRE LOGIQUE DE ROUTE ICI

            // ici vous récupérez le JSON sous forme d'un objet Javascript 
            data = JSON.parse(data); 
            memoryDb.set(++id, data);

            res.end();
        });

    }
  } 
  res.end();
});

server.listen(4000);
