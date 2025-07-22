const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  membershipNumber: { type: String, required: true, unique: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' }
});

module.exports = mongoose.model('Membership', membershipSchema);
