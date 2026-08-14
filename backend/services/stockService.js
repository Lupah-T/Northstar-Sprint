const Product = require('../models/Product');
const Inventory = require('../models/Inventory');

exports.checkStock = async (productId) => {
  const product = await Product.findOne({ productId });
  if (!product) {
    throw new Error(`Product ${productId} was not found`);
  }

  const inventoryItems = await Inventory.find({ productId });
  
  const totalQuantity = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    productId: product.productId,
    productName: product.name,
    variant: 'All',
    quantity: totalQuantity,
    available: totalQuantity > 0
  };
};

exports.checkVariantStock = async (productId, variant) => {
  const product = await Product.findOne({ productId });
  if (!product) {
    throw new Error(`Product ${productId} was not found`);
  }

  const inventoryItem = await Inventory.findOne({ productId, variant });
  
  if (!inventoryItem) {
    throw new Error(`${variant} is currently unavailable`);
  }

  return {
    productId: product.productId,
    productName: product.name,
    variant: inventoryItem.variant,
    quantity: inventoryItem.quantity,
    available: inventoryItem.quantity > 0
  };
};
