const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
