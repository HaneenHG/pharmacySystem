const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    medicineID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
    category: String, 
    price: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    stockQuantity: { type: Number, default: 0 },
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' }, 
    isPrescriptionRequired: { type: Boolean, default: false },
});

module.exports = mongoose.model('Medicine', MedicineSchema);
