const express = require('express');
const router = express.Router();
const HealthUpdate = require('../models/HealthUpdate');

// Health updates route
router.post('/health-updates', async (req, res) => {
  try {
    const healthData = req.body;

    const newHealthUpdate = new HealthUpdate(healthData);

    await newHealthUpdate.save();

    res.status(201).json({ message: 'Health update successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
