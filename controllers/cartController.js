const Cart = require("../models/Cart");
const cryptoJs = require("crypto-js");

//CREATE NEW Cart
const createNewCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    console.log(error);
    res.status(500).json("You haven't authority to add Carts");
  }
};

//UPDATE Cart
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json("You haven't authority to edit Products");
  }
};

//DELETE Cart
const deleteCart = async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCart) res.status(404).json("no Cart found with this ID");
    res.status(200).json(`the user ${deletedCart.id} has been deleted`);
  } catch (error) {
    res.status(401).json("You haven't authority to delete Carts data");
  }
};

//GET Cart DATA
const getCart = async (req, res) => {
  try {
    const requiredCart = await Cart.findOne({ userID: req.params.userId });
    if (!requiredCart) res.status(404).json("no Cart found with this ID");
    res.status(200).json(requiredCart);
  } catch (error) {
    res.status(401).json("You haven't authority to see Carts data");
  }
};

//GET ALL CArts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(401).json("You haven't authority to see users data");
  }
};

module.exports = {
  createNewCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCarts,
};
