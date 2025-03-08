const sqlite3 = require('sqlite3').verbose();

// Create a database connection
const db = new sqlite3.Database('./orders.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create a table if not exists
db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    age INTEGER NOT NULL,
    address TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL
)`);

module.exports = db;
