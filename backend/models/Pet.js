// models/Pet.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: { type: String, required: true, trim: true }, // Added trim
  dob: { type: Date, required: true },
  // Changed 'sex' to 'gender'
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'] // Recommended to keep enum for validation
  },
  breed: { type: String, required: true, trim: true }, // Added trim
  ownerAddress: { type: String, required: true, trim: true }, // Added trim
  identificationNumber: {
    type: String,
    required: true,
    unique: true, // Assuming unique
    trim: true // Added trim
  },
}, { timestamps: true }); // Keep timestamps if you want createdAt and updatedAt fields

module.exports = mongoose.model('Pet', petSchema);