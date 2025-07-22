const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  description: String,
  price: Number,
  status: { type: String, default: "Pending" }
});

module.exports = mongoose.model("Item", itemSchema);
