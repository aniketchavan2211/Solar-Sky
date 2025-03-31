const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./orders.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create orders table if it does not exist
db.run(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        age INTEGER NOT NULL,
        address TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        solar_system TEXT NOT NULL,
        price INTEGER NOT NULL,
        date_time TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error(err.message);
    }
});

module.exports = db;
