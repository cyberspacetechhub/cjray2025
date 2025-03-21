const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  productNo: {
    type: String,
    required: true
  },
  productCompany: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
  },
  imageUrls: {
    type: [String],
  },
  videoUrl: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Available', 'Sold Out',],
    default: 'Available'
  },
  isTrending:{
    type: Boolean,
    default: false
  },
  onSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: mongoose.Schema.Types.Decimal128,
  },
  saleStartDate: {
    type: Date,
  },
  saleEndDate: {
    type: Date,
  },
  searchString: {
    type: String
  },

},{timestamps: true});

const Product = mongoose.model('Product', ProductSchema,);

module.exports = Product;