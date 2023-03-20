const Product = require("../models/Product");

//CREATE NEW PRODUCT
const createNewProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json("You haven't authority to add Products");
  }
};

//UPDATE Product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json("You haven't authority to edit Products");
  }
};

//DELETE Product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) res.status(404).json("no product found with this ID");
    res
      .status(200)
      .json(`the product ${deletedProduct.title} has been deleted`);
  } catch (error) {
    res.status(401).json("You haven't authority to delete products data");
  }
};

//GET product DATA
const getProduct = async (req, res) => {
  try {
    const requiredProduct = await Product.findOne({ _id: req.params.id });
    if (!requiredProduct) res.status(404).json("no product found with this ID");
    res.status(200).json(requiredProduct);
  } catch (error) {
    res.status(401).json("You haven't authority to see products data");
  }
};

//GET ALL Products DATA
const getAllProducts = async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 });
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(401).json("You haven't authority to see users data");
  }
};

module.exports = {
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAllProducts,
};
