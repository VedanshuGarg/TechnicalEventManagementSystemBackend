const mongoose = require('mongoose');
const maintenanceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  scheduledDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', maintenanceSchema);
