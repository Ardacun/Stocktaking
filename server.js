const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'azerty123',
    database: 'stocktaking'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected');
});

// Items
app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/items/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM items WHERE id = ?', id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/api/items/:id', (req, res) => {
    const id = req.params.id;
    db.query('UPDATE items SET ? WHERE id = ?', req.body, id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}); 

app.delete('/api/items/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM items WHERE id = ?', id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}); 

// Categories
app.get('/api/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.delete('/api/categories/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM categories WHERE id = ?', id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Auth
app.get('/api/auth', (req, res) => {
    db.query('SELECT * FROM auth', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/auth/register', (req, res) => {
    db.query('INSERT INTO auth SET ?', req.body, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/api/auth/login', (req, res) => {
    db.query('SELECT * FROM auth WHERE email = ? AND password = ?', req.body.email, req.body.password, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}); 

app.get('/api/auth/logout', (req, res) => {
    db.query('DELETE FROM auth', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}); 

app.get('/api/auth/isloggedin', (req, res) => {
    db.query('SELECT * FROM auth', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
