const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.route('/')
    .post(adminController.handleAdminCreate)
    .get(adminController.handleAdmins)

module.exports = router;