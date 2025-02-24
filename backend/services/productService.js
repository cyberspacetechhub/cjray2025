const Product = require('../models/Product');
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const sharp = require("sharp");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllProducts = async (data) => {
    const page = data.page || 1;
    const limit = data.limit || 10;
    const skip = (page - 1) * limit;

    try {
        const products = await Product.find().skip(skip).limit(limit).exec();
        const totalCount = await Product.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
        return { products, page, totalPage: totalPages };
    } catch (err) {
        return { error: err.message };
    }
}

const getRecentProducts = async (data) => {
  const page = data.page || 1;
  const limit = data.limit || 10;
  const skip = (page - 1) * limit;

  try {
      const products = await Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
      const totalCount = await Product.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);
      return { products, page, totalPage: totalPages };
  } catch (err) {
      return { error: err.message };
  }
}

const createProduct = async (data) => {
    try {
        const newProduct = await Product.create({
            "name": data.name,
            "description": data.description,
            "price": data.price,
            "category": data.category,
            "quantity": data.quantity,
            "purchasePrice": data.purchasePrice,
            "productNo": data.productNo,
            "productCompany": data.productCompany,
            "coverImage": data.coverImage,
            "searchString": `${data.name} ${data.description} ${data.productCompany} ${data.price}`
        })
        return newProduct;
    } catch (err) {
        return { error: err.message };
    }
}

const updateProduct = async (id, data) => {
    try {
        const product = await Product.findOne({ _id: id }).exec();
        if (!product) return { error: "Product not found" };

        if (data.name) product.name = data.name;
        if (data.description) product.description = data.description;
        if (data.price) product.price = data.price;
        if (data.category) product.category = data.category;
        if (data.quantity) product.quantity = data.quantity;
        if (data.purchasePrice) product.purchasePrice = data.purchasePrice;
        if (data.productNo) product.productNo = data.productNo;
        if (data.productCompany) product.productCompany = data.productCompany;

        const result = await product.save();
        return result;
    } catch (err) {
        return { error: err.message };
    }
}

const getProduct = async (id) => {
    try {
        const product = await Product.findOne({ _id: id }).exec();
        if (!product) return { error: "Product not found" };
        return product;
    } catch (err) {
        return { error: err.message };
    }
}

const deleteProduct = async (id) => {
    try {
        const product = await Product.findOne({ _id: id }).exec();
        if (!product) return { error: "Product not found" };
        const result = await product.deleteOne();
        return result;
    } catch (err) {
        return { error: err.message };
    }
}

const uploadCoverImage = async (file, id) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Compress and convert the image to WebP format
        const compressedBuffer = await sharp(file.data)
          .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80, nearLossless: true })
          .toBuffer();
  
        // Upload to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "cjRayvest",
          },
          (error, result) => {
            if (error) {
                console.log(error);
              return reject(error); // Reject the promise if there's an error
            } else {
              return resolve(result.secure_url); // Resolve the promise with the secure URL
            }
          }
        );
  
        // End the upload stream with the compressed image buffer
        uploadStream.end(compressedBuffer);
      } catch (err) {
        console.log(err)
        reject(err); // Reject the promise if an error occurs during processing
      }
    });
  };
  
  
module.exports = {
    getAllProducts,
    getRecentProducts,
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    uploadCoverImage
}