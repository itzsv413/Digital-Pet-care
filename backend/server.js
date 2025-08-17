// server.js
// Load environment variables from .env file - make sure this is at the very top
require('dotenv').config();
console.log('Loaded SMTP_HOST:', process.env.SMTP_HOST);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
// Use the PORT from environment variables, default to 5000 if not set
const port = process.env.PORT || 5000;

// Middleware
// Enable CORS for all origins - adjust origin if needed for production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Parse incoming requests with JSON payloads
app.use(bodyParser.json());
// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true })); // Good practice to include this too

// --- Static File Serving ---
// Serve specific static directories explicitly.
// Removed the broad app.use(express.static(path.join(__dirname)));
// as it's generally better to serve only intended public assets.
// home.html is handled by the specific '/' route below.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/js', express.static(path.join(__dirname, 'js')));
// If you have a dedicated folder for all public assets (like index.html, images, etc.)
// it's better to serve that folder explicitly:
// app.use(express.static(path.join(__dirname, 'public'))); // Example: serve a 'public' folder

// --- MongoDB Connection ---
// Connect to MongoDB using the URI from the MONGODB_URI environment variable.
// Ensure your .env file exists in the project root and contains MONGODB_URI.
// Removed the fallback to localhost since you want to use a server database.
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  // Optionally exit the process if the database connection fails critically
  // process.exit(1);
});

// --- Routes ---

// Basic route to serve the home page
app.get('/', (req, res) => {
  // Ensure home.html exists in the root directory of your server
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Import and Use API routes
const authRoutes = require('./routes/auth'); // Path relative to server.js
const petRoutes = require('./routes/pets');
const healthUpdateRoutes = require('./routes/healthUpdates');
const remindersRoutes = require('./routes/reminders'); // new reminders route

// Mount auth routes under /api/auth
app.use('/api/auth', authRoutes);
// Mount other API routes under /api.
// Ensure routes defined in pets.js and healthUpdates.js have distinct paths
// e.g., pets.js might have '/pets' and healthUpdates.js might have '/health'
app.use('/api', petRoutes);
app.use('/api', healthUpdateRoutes);
app.use('/api/reminders', remindersRoutes); // mount reminders route

// --- End Routes ---

// --- Error Handling Middleware ---
// This middleware will catch any errors thrown in your routes
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace to the server console
  res.status(500).send('Something broke!'); // Send a generic error response to the client
  // In production, you might send less detail or a custom error page
});
// --- End Error Handling Middleware ---


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // Note: 'localhost' here refers to the interface the server is listening on.
  // If deployed, you'll access it via your server's domain or IP.
});