const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

app.post('/api/items', (req, res) => {
    const items = req.body;
    db.query('INSERT INTO items SET ?', items, (err, results) => {
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
app.post('/api/auth/register', (req, res) => {
    
    const { username, email, password, role } = req.body;
    
    const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(query, username, email, (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        
        db.query('INSERT INTO users SET ?', { username, email, password: hashedPassword, role }, (err, results) => {
            if (err) throw err;
            results.status(201).json({ message: 'User registered successfully.' });
        });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = results[0];
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(200).json({ token });
}); 

app.post('/api/auth/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'You have been logged out successfully.' });
}); 

// Orders
app.get('/api/orders', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/orders/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM orders WHERE id = ?', id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/api/orders/:id', (req, res) => {
    const id = req.params.id;
    db.query('UPDATE orders SET ? WHERE id = ?', req.body, id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.delete('/api/orders/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM orders WHERE id = ?', id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Categories
app.get('/api/categories/name/:name', (req, res) => {
    const name = req.params.name;
    db.query('SELECT * FROM categories WHERE name = ?', name, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
});
