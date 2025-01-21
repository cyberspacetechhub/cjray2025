const {
    getAllMangers,
    createManager,
    updateManager,
    getManager,
    deleteManager
} = require('../services/productManagerService');

const {
    userExists
} = require('../services/userService');

const handleManagers = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit 
    }
   const productManagers = await getAllMangers(data);
   if(!productManagers) {
    return res.status(400).json({ message: 'No productManagers found' });
   }
   res.json(productManagers);
}

const handleCreateManager = async (req, res) => {
    const {firstname, lastname, email, phone, password} = req.body;
    // console.log(req.body);
    
    if(!firstname || !lastname || !email || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicate = await userExists(email);
    if(duplicate) return res.status(409).json({ message: 'User already exists' });
    const data = req.body
    const result = await createManager(data);
    if(result.error) return res.status(500).json(result);
    res.status(201).json({Success: "Product Manager created successfully", result});
}

const handleUpdateManager = async (req, res) => {
    if(!req.body) {
        return res.status(400).json({ message: 'Data to update is required' });
    }
    
    const result = await updateManager(req.body._id, req.body);
    if(result.error) return res.status(500).json(result);

    res.status(200).json({Success: "Product Manager updated successfully", result});
    
}

const handleManagerDelete = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const result = await deleteManager(req.params.id);
    if(result.error) return res.status(500).json(result);

    res.status(200).json({Success: "Product Manager deleted successfully", result});
}

const handleManager = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const productManager = await getManager(req.params.id);
    if(!agent) {
        return res.status(400).json({ message: 'Product Manager not found' });
    }
    res.status(200).json(productManager);
}


module.exports = {
    handleManagers,
    handleCreateManager,
    handleUpdateManager,
    handleManagerDelete,
    handleManager
}