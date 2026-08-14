const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema({
  returnId: { type: String, required: true, unique: true },
  orderId: { type: String, required: true },
  returnEligible: { type: Boolean, required: true },
  returnStatus: { type: String, required: true },
  refundStatus: { type: String, required: true },
  requestDate: { type: Date, default: Date.now },
  refundDate: { type: Date }
});

module.exports = mongoose.model('Return', returnSchema);
