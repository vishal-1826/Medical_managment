const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON data

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // your MySQL username
  password: '12345', // your MySQL password (leave empty for no password or provide the password)
  database: 'user_authentication', // the database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Secret key for signing JWT tokens
const JWT_SECRET = 'your_secret_key';

// API endpoint to register a user
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the new user with hashed password
    db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword],
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving user to database' });
        }
        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  });
});

// API endpoint to handle login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    const user = results[0];

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // User authenticated, generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  });
});
//for logout and remove the token from the local storage

//for product
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM product', (err, results) => {
    if (err) {

      res.status(500).send('Error fetching products');
      return;
    }
    res.json(results);  // Send the results as JSON
  });
});
//new product
app.post('/products', express.json(), (req, res) => {
  const newProduct = req.body;
  db.query('INSERT INTO product SET ?', newProduct, (err, result) => {
    if (err) {

      res.status(500).send('Error inserting product');
      return;
    }
    res.json({ message: 'New product added', id: result.insertId });
  });
});

app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  // Convert the date format
  if (updatedProduct.expirationDate) {
    const date = new Date(updatedProduct.expirationDate);
    updatedProduct.expirationDate = date.toISOString().split('T')[0];
  }



  // Check for undefined fields
  for (const key in updatedProduct) {
    if (updatedProduct[key] === undefined) {

      res.status(400).send(`Error: ${key} is undefined`);
      return;
    }
  }
  if (!productId || productId === 'undefined') {

    res.status(400).send('Error: productId is undefined');
    return;
  }

  db.query('UPDATE product SET ? WHERE id = ?', [updatedProduct, productId], (err, result) => {
    if (err) {

      res.status(500).send('Error updating product');
      return;
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// Delete product
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;

  console.log('Product ID to delete:', productId);

  // Ensure productId is defined
  if (!productId || productId === 'undefined') {
    console.error('Error: productId is undefined');
    res.status(400).send('Error: productId is undefined');
    return;
  }

  db.query('DELETE FROM product WHERE id = ?', [productId], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).send('Error deleting product');
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
