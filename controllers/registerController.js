const cryptoJs = require("crypto-js");
const User = require("../models/User");

const registerController = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(500).json("Don't leave any required data empty");
  }
  try {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      address: req.body.address,
      email: req.body.email,
      mobile: req.body.mobile,
      password: cryptoJs.AES.encrypt(
        req.body.password,
        process.env.CRYPTO_PASSWORD
      ).toString(),
      isAdmin: req.body.isAdmin,
      img: req.body.img,
    });
    const newUser = await user.save();
    res
      .status(201)
      .json(`You have beenn succesfully registered as ${user.username}`);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = registerController;
