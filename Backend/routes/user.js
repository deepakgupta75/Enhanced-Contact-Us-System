const express = require('express');
const router = express.Router();
const User = require('../models/user');



// POST route to save user message (assuming you only want to save user details here)
router.post('/', async (req, res) => {
  const { name, email, phone_number } = req.body;

  try {
    // Create a new user instance
    const user = new User({
      name,
      email,
      phone_number
    });

    // Save user data to the database
    const savedUser = await user.save();

    res.status(201).json({ message: 'User Add successfully!', user: savedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user details' });
  }
});

// GET route to retrieve all user messages
router.get('/', async (req, res) => {
  try {
    // Fetch all user messages from the database
    const users = await User.find();
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user messages' });
  }
});

module.exports = router;



