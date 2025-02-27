const {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomer,
    deleteCustomer
} = require('../services/customerService');

const { userExists } = require('../services/userService');
const { generateVerificationToken, verifyToken } = require("../services/tokenService");
const { sendVerificationEmail } = require("../services/emailService");
const User = require("../models/User");  // 🔹 Import the User model

const handleCustomers = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit
    };
    const customers = await getCustomers(data);
    if (!customers) {
        return res.status(400).json({ message: 'No customer found' });
    }
    res.json(customers);
};

const handleCreateCustomer = async (req, res) => {
    const { firstname, lastname, email, phone, address, password } = req.body;
    
    if (!firstname || !lastname || !email || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    const duplicate = await userExists(email);
    if (duplicate) {
        return res.sendStatus(409); // Conflict - Email already exists
    }
    
    const data = req.body;
    const result = await createCustomer(data);
  
    if (result.error) return res.status(500).json(result.error);

    // 🔹 Generate verification token
    const token = generateVerificationToken(result._id); 

    // 🔹 Send verification email
    await sendVerificationEmail(email, token);
    
    return res.status(201).json({ success: "Customer created successfully. Please check your email for verification.", result });
};

const handleUpdate = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: 'Data to update is required' });
    }
    
    const result = await updateCustomer(req.body._id, req.body);
    if (result.error) return res.status(500).json(result);

    res.status(200).json({ success: "Customer updated successfully", result });
};

const handleDelete = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    const result = await deleteCustomer(req.params.id);
    if (result.error) return res.status(500).json(result);

    res.status(200).json({ success: "Customer deleted successfully", result });
};

const handleCustomer = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    const customer = await getCustomer(req.params.id);
    if (!customer) {
        return res.status(400).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
};

const verifyEmail = async (req, res) => {
    // console.log("Received Request:", req.query); // Debugging
    const { token } = req.query;
    // console.log("Received Token:", token); // Debugging

    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
        // console.log("Invalid Token:", decoded); // Debugging
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
        // console.log("User Not Found");
        return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();
    // console.log("User Updated:", user);
    // console.log("Email Verified Successfully");
    res.status(200).json({ message: "Email verified successfully" });
};

const checkEmailVerification = async (req, res) => {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (user && user.isVerified) {
        return res.status(200).json({ isVerified: true });
    }
    res.status(200).json({ isVerified: false });
};
module.exports = {
    handleCustomers,
    handleCreateCustomer,
    handleUpdate,
    handleDelete,
    handleCustomer,
    verifyEmail,
    checkEmailVerification
};
