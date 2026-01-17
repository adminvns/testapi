const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../middleware/auth');

// In-memory user store (use database in production)
// Pre-hashed passwords: admin123 and user123
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqO', // Will be initialized with actual hash
    role: 'admin'
  },
  {
    id: 2,
    username: 'user',
    password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqO', // Will be initialized with actual hash
    role: 'user'
  }
];

// Initialize with hashed passwords (run once on server start)
async function initializeUsers() {
  for (let user of users) {
    if (user.username === 'admin' && user.password.startsWith('$2a$10$rOzJqZqZqZqZqZqZqZqZqO')) {
      user.password = await bcrypt.hash('admin123', 10);
    } else if (user.username === 'user' && user.password.startsWith('$2a$10$rOzJqZqZqZqZqZqZqZqZqO')) {
      user.password = await bcrypt.hash('user123', 10);
    }
  }
}
initializeUsers();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: {
          message: 'Username and password are required'
        }
      });
    }

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({
        error: {
          message: 'Invalid credentials'
        }
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: {
          message: 'Invalid credentials'
        }
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Login failed'
      }
    });
  }
});

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, password, role = 'user' } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: {
          message: 'Username and password are required'
        }
      });
    }

    // Check if user exists
    if (users.find(u => u.username === username)) {
      return res.status(409).json({
        error: {
          message: 'Username already exists'
        }
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      password: hashedPassword,
      role: role || 'user'
    };

    users.push(newUser);

    // Generate token
    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token: token,
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: 'Registration failed'
      }
    });
  }
});

module.exports = router;
