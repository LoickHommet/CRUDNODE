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
  } else if (req.url.includes("/api/name/")) {
        let data = "";
        const arrayReq = req.url.split("/");
        const id = parseInt(arrayReq[arrayReq.length - 1]);
        console.log(id);
        data = JSON.stringify(memoryDb.get(id));

        res.writeHead(200, { "content-type": "application/json" });
        res.write(data);
  }
  res.end();
});

server.listen(4000);
