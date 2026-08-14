const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: [true, 'Product ID is required'],
      trim: true,
      uppercase: true,
      ref: 'Product',
      index: true
    },
    variant: {
      type: String,
      required: [true, 'Variant is required'],
      trim: true
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Stock quantity cannot be negative'],
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not a valid integer quantity'
      }
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate variant entries for the same product
inventorySchema.index({ productId: 1, variant: 1 }, { unique: true });

module.exports = mongoose.model('Inventory', inventorySchema);
