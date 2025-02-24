const express = require('express');
const router = express.Router();
const fileUpload = require("express-fileupload");
const productController = require('../controllers/productController');
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const filesSizeLimiter = require("../middleware/filiesSizeLimiter");

router.route('/')
    .get(productController.handleGetAllProducts)
    .post(productController.handleCreateproduct)
    .put(productController.handleUpdateProduct)
router.route('/recent').get(productController.handleGetRecentProducts)
router.route('/coverImage')
    .post(
        fileUpload({ createParentPath: true }),
        productController.handleUploadCoverImage
    )
router.route('/:id')
    .get(productController.handleGetProduct)
    .delete(productController.handleDeleteProduct)

module.exports = router;   