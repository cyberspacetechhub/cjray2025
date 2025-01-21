const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const AdminSchema = User.discriminator('Admin', new Schema({
 username: {
    type: String,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  whatsappLink:String
}))
module.exports = AdminSchema;