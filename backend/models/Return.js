const mongoose = require('mongoose');

const returnSchema = new mongoose.Schema(
  {
    returnId: {
      type: String,
      required: [true, 'Return ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },
    orderId: {
      type: String,
      required: [true, 'Order ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
      ref: 'Order',
      index: true
    },
    returnEligible: {
      type: Boolean,
      required: [true, 'Return eligibility flag is required'],
      default: true
    },
    returnStatus: {
      type: String,
      required: [true, 'Return status is required'],
      trim: true,
      enum: {
        values: [
          'Not Requested',
          'Requested',
          'Approved',
          'Rejected',
          'Received',
          'Completed',
          'not_requested',
          'requested',
          'approved',
          'rejected',
          'received',
          'completed'
        ],
        message: '{VALUE} is not a valid return status'
      },
      default: 'Requested'
    },
    refundStatus: {
      type: String,
      required: [true, 'Refund status is required'],
      trim: true,
      enum: {
        values: [
          'Not Applicable',
          'Not Started',
          'Pending',
          'Processed',
          'Completed',
          'Failed',
          'not_applicable',
          'not_started',
          'pending',
          'processed',
          'completed',
          'failed'
        ],
        message: '{VALUE} is not a valid refund status'
      },
      default: 'Not Started'
    },
    reason: {
      type: String,
      trim: true
    },
    requestDate: {
      type: Date,
      default: Date.now
    },
    refundDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Return', returnSchema);
