const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartContoller');

router.route('/').post(cartController.handleAddToCart);
router.route('/:id').get(cartController.handleGetCartByUserId);
router.route('/clear/:id').delete(cartController.handleClearCart);

module.exports = router;