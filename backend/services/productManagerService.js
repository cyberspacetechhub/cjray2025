const ProductManager = require("../model/ProductManager");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createManager = async (data) => {

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newManager = await ProductManager.create({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      searchString: `${data.firstname} ${data.lastname} ${data.email} ${data.phone}`,
    });
    return newManager;
  } catch (e) {
    return { error: e.message };
  }
};

const getAllMangers = async (data) => {
  let page = parseInt(data.page) || 1;
  let limit = parseInt(data.limit) || 5;
  let skip = (page - 1) * limit;
  try {
    const productManagers = await ProductManager.find()
      .populate("products")
      .skip(skip)
      .limit(limit);
    const totalCount = await ProductManager.countDocuments();
    const totalPage = Math.ceil(totalCount / limit);
    return { productManagers, page, totalPage: totalPage };
  } catch (e) {
    return { error: e.message };
  }
};

const getManager = async (id) => {
  try {
    const productManager = await ProductManager.findOne({ _id: id })
      .populate("products")
      .exec();
    if (!productManager) return { error: "productManager not found" };
    return productManager;
  } catch (e) {
    return { error: e.message };
  }
};

const updateManager = async (id, data) => {
  try {
    const productManager = await ProductManager.findOne({ _id: id }).exec();
    if (!productManager) return { error: "productManager not found" };
    if (data.firstname) productManager.firstname = data.firstname;
    if (data.lastname) productManager.lastname = data.lastname;
    if (data.email) productManager.email = data.email;
    if (data.phone) productManager.phonr = data.phone;

    const result = await productManager.save();
    return result;
  } catch (e) {
    return { error: e.message };
  }
};

const deleteManager= async (id) => {
  try {
    const productManager = await ProductManager.findOne({ _id: id }).exec();
    if (!productManager) return { error: "productManager not found" };
    const result = await productManager.deleteOne();
    return result;
  } catch (e) {
    return { error: e.message };
  }
};


module.exports = {
  createManager,
  getAllMangers,
  getManager,
  updateManager,
  deleteManager
};
