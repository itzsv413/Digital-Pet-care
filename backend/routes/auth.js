// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const Member = require('../models/Member'); // Adjust the path if your Member.js is elsewhere

const router = express.Router();
const saltRounds = 10; // Cost factor for bcrypt hashing

// --- Registration Route (POST /api/auth/register) ---
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Basic validation
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Check if user already exists
    const existingMember = await Member.findOne({ email: email });
    if (existingMember) {
      return res.status(409).json({ message: 'Email already in use.' }); // 409 Conflict
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new member
    const newMember = new Member({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save member to database
    const savedMember = await newMember.save();

    // Respond successfully (don't send back password hash)
    res.status(201).json({
        message: 'Registration successful!',
        memberId: savedMember._id // You might want to send the ID back
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});


// --- Login Route (POST /api/auth/login) ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password.' });
  }

  try {
    // Find member by email
    const member = await Member.findOne({ email: email });
    if (!member) {
      // Avoid specifying whether email or password was wrong for security
      return res.status(401).json({ message: 'Invalid credentials.' }); // 401 Unauthorized
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
       return res.status(401).json({ message: 'Invalid credentials.' }); // 401 Unauthorized
    }

    // Login successful!
    res.status(200).json({
      message: 'Login successful!',
      memberId: member._id, // Send memberId back to the frontend
      // You might later add a token here (e.g., JWT) for session management
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});


module.exports = router;