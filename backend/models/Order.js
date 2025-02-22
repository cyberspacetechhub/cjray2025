const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
fullname: { type: String, required: true },
address: { type: String, required: true },
phoneNumber: { type: String, required: true },
email: { type: String, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["card", "bank transfer", "cash"], required: true },
  status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);