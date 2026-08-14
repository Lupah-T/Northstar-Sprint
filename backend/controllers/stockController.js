const stockService = require('../services/stockService');

exports.getStockByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ error: 'Please provide a product ID' });
    }

    const result = await stockService.checkStock(productId);
    res.json(result);
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};

exports.getStockByVariant = async (req, res, next) => {
  try {
    const { productId, variant } = req.params;
    if (!productId || !variant) {
      return res.status(400).json({ error: 'Please provide a product ID and variant' });
    }

    const result = await stockService.checkVariantStock(productId, variant);
    res.json(result);
  } catch (error) {
    if (error.message.includes('not found') || error.message.includes('unavailable')) {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};
