const User = require("../models/User");
const cryptoJs = require("crypto-js");

//UPDATE USER
const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = await cryptoJs.AES.encrypt(
      req.body.password,
      proces.env.CRYPTO_PASSWORD
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        password: req.body.password,
        // $set: req.body,
      },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json("You haven't authority to edit users data");
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) res.status(404).json("no user found with this ID");
    res.status(200).json(`the user ${deletedUser.username} has been deleted`);
  } catch (error) {
    res.status(401).json("You haven't authority to delete users data");
  }
};

//GET USER DATA
const getUser = async (req, res) => {
  try {
    const requiredUser = await User.findOne({ _id: req.params.id });
    if (!requiredUser) res.status(404).json("no user found with this ID");
    const { password, ...others } = requiredUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(401).json("You haven't authority to see users data");
  }
};

//GET ALL USERS DATA
const getAllUsers = async (req, res) => {
  try {
    const query = req.query.new;
    const allUsers = query
      ? await User.find().limit(1).sort({ _id: -1 })
      : await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(401).json("You haven't authority to see users data");
  }
};

//GET USER STATS
const getUserStats = async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json("You haven't authority to see users stats data");
  }
};

module.exports = { updateUser, deleteUser, getUser, getAllUsers, getUserStats };
