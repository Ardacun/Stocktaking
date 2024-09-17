const express = require('express');
const mysql = require('mysql2');
const crypto = require('crypto');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 8080;

const JWT_SECRET = crypto.randomBytes(256).toString('hex');
app.use(cors({ credentials: true, origin: 'http://localhost:4200'}));
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
    const updatedItem = req.body;

    // Ensure the query is properly formatted
    db.query('UPDATE items SET ? WHERE id = ?', [updatedItem, id], (err, results) => {
        if (err) {
            console.error('Error updating item:', err);
            return res.status(500).json({ message: 'Database error while updating item.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        res.json({ message: 'Item updated successfully.', results });
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

app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;

    // Hash the new password if it's provided
    if (updatedUser.password) {
        updatedUser.password_hash = bcrypt.hashSync(updatedUser.password, 10);
        delete updatedUser.password; // Remove the plain password field from the object
    }

    // Ensure the query is properly formatted
    db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ message: 'Database error while updating user.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'User updated successfully.', results });
    });
});

app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', id, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Auth - Register Route
app.post('/api/auth/register', (req, res) => {
    const { username, email, password, role } = req.body;  // Changed password_hash to password

    // Check if username or email already exists
    const query = 'SELECT * FROM users WHERE username = ? OR email = ?';

    db.query(query, [username, email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database error.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);  // Salt generation
        const hashedPassword = bcrypt.hashSync(password, salt);  // Hashing the plain password

        // Insert the new user
        const insertQuery = 'INSERT INTO users SET ?';
        const newUser = { username, email, password_hash: hashedPassword, role };  // Storing the hashed password

        db.query(insertQuery, newUser, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error registering user.' });
            }
            return res.status(201).json({ message: 'User registered successfully.' });
        });
    });
});

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    

    // Check if username exists
    db.query('SELECT * FROM users WHERE username = ?', username, (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const user = results[0]; // Get user details
        const isPasswordCorrect = bcrypt.compareSync(password, user.password_hash); // Check if password is correct
        
        if (!isPasswordCorrect) { // If password is incorrect, return an error
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
        
        // Generate a token
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
            expiresIn: '1h'
        });

        // Set HTTP-only cookie with the token
        res.cookie('auth_token', token, {
            httpOnly: false,        // Prevents JavaScript access (XSS protection)
            secure: true,          // Ensures the cookie is sent over HTTPS
            sameSite: 'Strict',    // Prevents CSRF by allowing the cookie to be sent only to the same site
            maxAge: 60 * 60 * 1000 // Optional: set expiration for the cookie (in milliseconds)
        });
        
        // Send a response with the message
        res.json({ message: 'Logged in successfully' });
    });
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

app.post('/api/orders', (req, res) => {
    const orders = req.body;
    db.query('INSERT INTO orders SET ?', orders, (err, results) => {
        if (err) throw err;
        
        // Fetch the newly inserted order using the insertId
        db.query('SELECT * FROM orders WHERE id = ?', [results.insertId], (err, order) => {
            if (err) {
                return res.status(500).json({ message: 'Error fetching order', error: err });
            }
            
            // Return the newly created order
            res.json(order[0]);  // Assuming order is an array, return the first item
        });
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

// Order Items
app.get('/api/orderitems', (req, res) => {
    db.query('SELECT * FROM ordersitem', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// app.get('/api/orderitems/:id', (req, res) => {
//     const id = req.params.id;
//     db.query('SELECT * FROM ordersitem WHERE id = ?', id, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });

app.post('/api/ordersitems', (req, res) => {
    const orderitems = req.body;
    db.query('INSERT INTO ordersitem SET ?', orderitems, (err, results) => {
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

app.get('api/categories/name/:name', (req, res) => {
    const name = req.params.name;
    db.query('SELECT id FROM categories WHERE name = ?', name, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
