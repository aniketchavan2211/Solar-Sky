const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = require('./database'); // Import SQLite database
const app = express();
const port = 3000;

// Serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the index.html file when the user visits the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the order form page
app.get('/order.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'order.html'));
});

// Handle form submission
app.post('/submit-order', (req, res) => {
    const { full_name, age, address, email, phone, solar_system } = req.body;
    if (!full_name || !age || !address || !email || !phone || !solar_system) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    // Get the current date and time
    const date_time = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Determine price based on the selected solar system
    const prices = {
        "Solar 5KW": 375000,
        "Solar 10KW": 450000,
        "Solar 15KW": 600000
    };

    const price = prices[solar_system] || 0;

    const sql = `INSERT INTO orders (full_name, age, address, email, phone, solar_system, price, date_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [full_name, age, address, email, phone, solar_system, price, date_time], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Order placed successfully!', orderId: this.lastID });
    });
});

// Simple authentication middleware
const authenticate = (req, res, next) => {
    const { username, password } = req.body;
    
    // Hardcoded credentials (change for security)
    if (username === "admin" && password === "admin123") {
        next(); // Proceed if authentication is successful
    } else {
        res.status(401).json({ message: "Unauthorized: Invalid credentials" });
    }
};

// Route to serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Route to fetch orders (with authentication)
app.post('/get-orders', authenticate, (req, res) => {
    const sql = "SELECT * FROM orders ORDER BY date_time DESC";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Database error" });
        }
        res.json(rows);
    });
});

// Start the server and listen on port 3000
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
