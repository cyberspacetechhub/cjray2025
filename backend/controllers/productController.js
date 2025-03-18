const {
    getAllProducts,
    getRecentProducts,
    createProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    uploadCoverImage,
    getProductByCategory
} = require('../services/productService');

const handleGetAllProducts = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit,
    }
    const products = await getAllProducts(data);
    if(products.error) return res.status(500).json(products);
    res.status(200).json(products);
}

const handleGetRecentProducts = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit,
    }
    const products = await getRecentProducts(data);
    if(products.error) return res.status(500).json(products);
    res.status(200).json(products);
}

const handleCreateproduct = async (req, res) => {
    // console.log(req.body)
    const {name, description, price, category, quantity, purchasePrice, productNo, productCompany, coverImage} = req.body;
    if(!name, !description, !price, !category, !quantity, !purchasePrice, !productNo, !productCompany, !coverImage){
        return res.status(400).json({ message: 'All fields are required' });
    }
    const data = req.body;
    const result = await createProduct(data);
    if(result.error) return res.status(500).json(result);
    res.status(200).json({Success: "Product created successfully", result});
}

const handleUpdateProduct = async (req, res) => {
    if(!req.body) return res.status(400).json({ message: 'Data to update required' });
    const _id = req.body._id;
    const data = req.body;
    const result = await updateProduct(_id, data);
    if(result.error) return res.status(500).json(result);
    res.status(200).json({Success: "Product updated successfully", result});
}
const handleGetProduct = async (req, res) => {
    if(!req.params.id) return res.status(400).json({ message: 'ID is required' });
    const _id = req.params.id;
    const product = await getProduct(_id);
    if(product.error) return res.status(500).json(product);
    res.status(200).json(product);
}

const handleDeleteProduct = async (req, res) => {
    if(!req.params.id) return res.status(400).json({ message: 'ID is required' });
    const _id = req.params.id;
    const result = await deleteProduct(_id);
    if(result.error) return res.status(500).json(result);
    res.status(200).json({Success: "Product deleted successfully", result});
}

const handleUploadCoverImage = async (req, res) => {
    try {
      if (!req.files.file)
        return res
          .status(400)
          .json({ status: "error", message: "Missing files" });
      const files = req.files.file;
      const result = await uploadCoverImage(files);
      // console.log(result)
      return res.status(200).json({url: result});
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  const handleGetProductByCategory = async (req, res) => {
    const data = {
      page: req.query.page,
      limit: req.query.limit,
      category: req.query.category,
    };
  
    const products = await getProductByCategory(data);
    if (!products)
      return res.status(404).json({ message: "Products not found" });
    return res.status(200).json(products);
  };

module.exports = {
    handleGetAllProducts,
    handleGetRecentProducts,
    handleCreateproduct,
    handleUpdateProduct,
    handleGetProduct,
    handleDeleteProduct,
    handleUploadCoverImage,
    handleGetProductByCategory
}