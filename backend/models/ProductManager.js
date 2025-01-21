const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const ProductManagerSchema = User.discriminator('ProductManager', new Schema({
  verified: {
    type: Boolean,
    default: false
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  
}));

module.exports = ProductManagerSchema;