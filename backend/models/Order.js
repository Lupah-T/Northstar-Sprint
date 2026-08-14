const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: [true, 'Order ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },
    customerId: {
      type: String,
      required: [true, 'Customer ID is required'],
      trim: true,
      uppercase: true,
      ref: 'Customer',
      index: true
    },
    orderDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      required: [true, 'Order status is required'],
      trim: true,
      enum: {
        values: [
          'Processing',
          'Shipped',
          'Delivered',
          'Cancelled',
          'Returned',
          'processing',
          'shipped',
          'delivered',
          'cancelled',
          'returned'
        ],
        message: '{VALUE} is not a valid order status'
      },
      default: 'Processing'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
