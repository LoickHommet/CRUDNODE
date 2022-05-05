const { cp } = require("fs");
const http = require("http");
const express = require('express')

const db = require("./db")
// const memoryDb = new Map();
// let id = 0;
// memoryDb.set(id++, { nom: "Alice" });
// memoryDb.set(id++, { nom: "Bob" });
// memoryDb.set(id++, { nom: "Charlie" });

const app = express()

const mapToObj = m => {
  return Array.from(m).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
  }, {});
};

app.use(express.json());

app.get('/api/names', (req, res) => {
  res.json(mapToObj(db.memoryDb))
})


app.get('/api/name/:id', (req, res) => {
  let id = parseInt(req.params.id)
  res.json(db.memoryDb.get(id));
})

app.post('/api/names', (req, res) => {
  const payload = req.body;
  db.memoryDb.set(db['id']++, payload);
  res.status(201).json(payload);
})

module.exports = app
