// db = {
//     memoryDb: new Map(),
//     id:0,
// }

// const db["memoryDb"] = new Map();
const memoryDb = new Map();
let id = 0;
memoryDb.set(id++, { nom: "Alice" });
memoryDb.set(id++, { nom: "Bob" });
memoryDb.set(id++, { nom: "Charlie" });

module.exports = memoryDb