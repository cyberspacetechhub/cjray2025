const Cart = require('../models/Cart');

const addToCart = async (data) => {
    try {
        const cart = await Cart.create(data);
        return cart;
    } catch (err) {
        return {error: err.message}
    }
}

const getCartByUserId = async (userId) => {
    try {
        const cart = await Cart.findOne({userId});
        return cart;
    } catch (err) {
        return {error: err.message}
    }
}

const clearCart = async (userId) => {
    try {
        const cart = await Cart.findOne({_id: userId});
        const result = await cart.deleteOne();
        return result;
    } catch (err) {
        return {error: err.message}
    }
}

module.exports = {
    addToCart,
    getCartByUserId,
    clearCart
}