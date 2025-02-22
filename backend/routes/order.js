const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.checkout);
router.get('/orders/:id', orderController.handleGetOrdersByUserId);

module.exports = router;