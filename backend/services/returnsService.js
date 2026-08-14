const Order = require('../models/Order');
const Return = require('../models/Return');

exports.checkReturnStatus = async (orderId) => {
  const order = await Order.findOne({ orderId });
  if (!order) {
    throw new Error(`Order ${orderId} was not found`);
  }

  const returnData = await Return.findOne({ orderId });
  
  if (!returnData) {
    return {
      orderId: order.orderId,
      eligible: false,
      returnStatus: 'Not Requested',
      refundStatus: 'Not Applicable'
    };
  }

  return {
    orderId: order.orderId,
    eligible: returnData.returnEligible,
    returnStatus: returnData.returnStatus,
    refundStatus: returnData.refundStatus
  };
};
