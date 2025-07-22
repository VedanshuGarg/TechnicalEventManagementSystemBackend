const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  venue: { type: String, required: true },
  vendorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  imageUrl: String,
}, { timestamps: true });

module.exports = model('Event', eventSchema);
