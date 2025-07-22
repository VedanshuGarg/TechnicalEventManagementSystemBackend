const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const registrationSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = model('Registration', registrationSchema);
