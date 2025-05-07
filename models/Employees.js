const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  employeeID: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  birthDate: { type: Date },
  nationality: { type: String },
  position: { type: String }, 
  department: { type: String },
  hireDate: { type: Date },
  salary: { type: Number },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);


