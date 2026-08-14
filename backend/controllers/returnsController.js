const returnsService = require('../services/returnsService');

exports.getReturnStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return res.status(400).json({ error: 'Please provide an order ID' });
    }
    
    const result = await returnsService.checkReturnStatus(orderId);
    res.json(result);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};
