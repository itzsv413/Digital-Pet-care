// routes/pets.js
const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet'); // Import the Pet model

// Pet registration route
router.post('/pet-registration', async (req, res) => {
  try {
    // Changed 'sex' to 'gender' in destructuring req.body
    const { name, dob, gender, breed, ownerAddress, identificationNumber } = req.body;

    // Basic validation (optional here if you rely heavily on Mongoose schema, but good practice)
    if (!name || !dob || !gender || !breed || !ownerAddress || !identificationNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

     // Validate gender value against the enum
     if (!['Male', 'Female'].includes(gender)) {
         return res.status(400).json({ message: 'Invalid value for gender' });
     }

    // Convert dob string to Date object (important!)
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date of birth format' });
    }


    // Create a new Pet document - Changed 'sex' to 'gender' here
    const newPet = new Pet({
      name,
      dob: dobDate, // Use the Date object
      gender, // Use the gender variable
      breed,
      ownerAddress,
      identificationNumber,
    });

    // Save the new pet document to the database
    await newPet.save();

    // Send a success response
    res.status(201).json({ message: 'Pet registered successfully', petId: newPet._id }); // Optionally return the new pet ID

  } catch (error) {
    console.error('Error during pet registration:', error); // Log the full error on the server

    // Handle potential unique key errors (e.g., duplicate identificationNumber)
    if (error.code === 11000) { // MongoDB duplicate key error code
        // Assuming identificationNumber is the unique field causing the error
        const field = Object.keys(error.keyValue)[0];
        const value = error.keyValue[field];
        return res.status(409).json({ message: `Duplicate value '${value}' for field '${field}'.` });
    }

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
         const messages = Object.values(error.errors).map(val => val.message);
         return res.status(400).json({ message: 'Validation failed', errors: messages });
    }

    // Handle other errors
    res.status(500).json({ message: 'Server error during pet registration' });
  }
});

// You might have other pet-related routes here

module.exports = router;