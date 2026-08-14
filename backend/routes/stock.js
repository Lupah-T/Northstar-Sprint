const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/:productId', stockController.getStockByProduct);
router.get('/:productId/:variant', stockController.getStockByVariant);

module.exports = router;
