const {createOrder, getOrdersByUserId} = require('../services/orderService')

const checkout = async (req, res) => {
    const { userId, paymentMethod, fullname, address, phone, email } = req.body;
    if(!fullname, !address, !phone, !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const data =req.body
    const result = await createOrder(data)
    if(result.error) {
        return res.status(400).json({ message: result.error });
    }
    return res.status(200).json({ message: "Order created successfully", result });
}

const handleGetOrdersByUserId = async (req, res) => {
    if(!req.params.userId) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const userId = req.params.userId;
    const result = await getOrdersByUserId(userId)
    if(result.error) {
        return res.status(400).json({ message: result.error });
    }
    return res.status(200).json({ message: "Orders fetched successfully", result });
}

module.exports = {checkout, handleGetOrdersByUserId}