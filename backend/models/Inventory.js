const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true },
  variant: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Inventory', inventorySchema);
