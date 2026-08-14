const express = require('express');
const router = express.Router();
const returnsController = require('../controllers/returnsController');

router.get('/:orderId', returnsController.getReturnStatus);

module.exports = router;
