const express = require('express');
const router = express.Router();
const cusomterController = require('../controllers/customerController');

router.route('/')
    .get(cusomterController.handleCustomers)
    .post(cusomterController.handleCreateCustomer)
    .put(cusomterController.handleUpdate)
router.route('/verify')
    .get(cusomterController.verifyEmail)
router.route('/check')
    .get(cusomterController.checkEmailVerification)
router.route('/:id')
    .get(cusomterController.handleCustomer)
    .delete(cusomterController.handleDelete)

module.exports = router;