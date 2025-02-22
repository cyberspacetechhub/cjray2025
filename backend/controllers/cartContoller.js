const {
    addToCart,
    getCartByUserId,
    clearCart
} = require('../services/cartService')

const handleAddToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body
    if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'Missing required fields' })
    }
    const data = req.body
    const cart = await addToCart(data)
    if(cart.error) {
        return res.status(400).json({ message: cart.error })
    }
    return res.status(200).json({ message: 'Product added to cart', cart })
}

const handleGetCartByUserId = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ message: 'Missing required fields' })
    }
    const userId = req.params.id
    const cart = await getCartByUserId(userId)
    if(cart.error) {
        return res.status(400).json({ message: cart.error })
    }
    return res.status(200).json({ message: 'Cart fetched', cart })
}

const handleClearCart = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ message: 'Missing required fields' })
    }
    const userId = req.params.id
    const cart = await clearCart(userId)
    if(cart.error) {
        return res.status(400).json({ message: cart.error })
    }
    return res.status(200).json({ message: 'Cart cleared', cart })
}

module.exports = {
    handleAddToCart,
    handleGetCartByUserId,
    handleClearCart
}