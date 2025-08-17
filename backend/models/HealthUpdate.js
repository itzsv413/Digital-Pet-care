const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthUpdateSchema = new Schema({
  height: Number,
  weight: Number,
  temperature: Number,
  respirationRate: Number,
  oestrus: String,
  ageOfPuberty: String,
  vaccinatedDate: Date,
  dogType: String,
  catType: String,
  dogVaccine1: Boolean,
  dogVaccine2: Boolean,
  dogVaccine3: Boolean,
  dogVaccine4: Boolean,
  dogVaccine5: Boolean,
  dogVaccine6: Boolean,
  dogVaccine7: Boolean,
  catVaccine1: Boolean,
  catVaccine2: Boolean,
  catVaccine3: Boolean,
  catVaccine4: Boolean,
  catVaccine5: Boolean,
  catVaccine6: Boolean,
  catVaccine7: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('HealthUpdate', healthUpdateSchema);
