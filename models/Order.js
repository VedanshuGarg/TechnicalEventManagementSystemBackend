const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: Array,
  total: Number,
  status: { type: String, default: 'Processing' }
});

module.exports = mongoose.model('Order', orderSchema);
