const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database'); // Import SQLite database
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

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
    const { full_name, age, address, email, phone } = req.body;
    if (!full_name || !age || !address || !email || !phone) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const sql = `INSERT INTO orders (full_name, age, address, email, phone) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [full_name, age, address, email, phone], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Order placed successfully!', orderId: this.lastID });
    });
});

// Start the server and listen on port 3000
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
