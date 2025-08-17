const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// POST /api/reminders - create a vaccination reminder and send email
router.post('/', async (req, res) => {
  console.log('Received POST /api/reminders request');
  const { email, petName, vaccinationDate } = req.body;
  console.log('Request body:', req.body);

  if (!email || !petName || !vaccinationDate) {
    console.log('Missing required fields');
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('Creating transporter...');
    // Create reusable transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log('Transporter created');

    // Email content
    const mailOptions = {
      from: `"Digital Pet Care Assistant" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Vaccination Reminder for ${petName}`,
      text: `This is a reminder that your pet ${petName} has a vaccination scheduled on ${vaccinationDate}. Please make sure to take the necessary actions.`,
    };
    console.log('Sending email...');
    // Send mail
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    return res.status(200).json({ message: 'Reminder email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SMTP response:', error.response);
    }
    if (error.responseCode) {
      console.error('SMTP response code:', error.responseCode);
    }
    console.log('Sending error response to client:', error.message);
    return res.status(500).json({ message: 'Failed to send reminder email', error: error.message });
  }
});

// Add GET route for /api/reminders to confirm server is reachable
router.get('/', (req, res) => {
  res.status(200).json({ message: 'GET /api/reminders route is working' });
});

module.exports = router;
