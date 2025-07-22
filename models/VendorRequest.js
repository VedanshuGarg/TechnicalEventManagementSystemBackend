const mongoose = require('mongoose');

const vendorRequestSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  requestType: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("VendorRequest", vendorRequestSchema);
