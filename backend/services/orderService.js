
const Order = require('../models/Order');
const cartService = require('../services/cartService');

const createOrder = async (data) => {
    const cart = await cartService.getCartByUserId(data.userId);
    if (cart.length === 0) {
        return {error: "Cart is empty"}
    }
    const total = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    try {
        const newOrder = await Order.create({
            userId: data.userId,
            fullname: data.fullname,
            address: data.address,
            phone: data.phone,
            email: data.email,
            products: cart,
            total: total
        });
        return newOrder;
    } catch (err) {
        return {error: err.message}
    }

}

const getOrdersByUserId = async (userId) => {
    try {
        const orders = await Order.find({userId: userId});
        return orders;
    } catch (err) {
        return {error: err.message}
    }
}

module.exports = {createOrder, getOrdersByUserId};