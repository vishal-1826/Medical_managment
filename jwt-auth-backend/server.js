const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON data

// In-memory user storage (In real applications, use a database)
const users = [];

// Secret key for signing JWT tokens
const JWT_SECRET = 'your_secret_key';

// API endpoint to register a user
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the new user with hashed password
  const newUser = {
    id: users.length + 1, // Generate a simple unique ID
    email,
    password: hashedPassword,
  };

  users.push(newUser); // Save user to the "database"
  return res.status(201).json({ message: 'User registered successfully' });
});

// API endpoint to handle login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((u) => u.email === email);

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
