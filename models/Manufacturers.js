const mongoose = require('mongoose');

const ManufacturerSchema = new mongoose.Schema({
    manufacturerID: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
  country: String,
  contactEmail: String,
  phone: String,
  address: String,
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Manufacturer', ManufacturerSchema);
