const mongoose = require('mongoose');

const PharmacySchema = new mongoose.Schema({
  pharmacyID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: String,
  phone: String,
  licenseNumber: { type: String, unique: true },
  managerName: String,
  isActive: { type: Boolean, default: true }, 
});

module.exports = mongoose.model('Pharmacy', PharmacySchema);
