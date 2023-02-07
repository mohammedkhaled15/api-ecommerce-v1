const User = require("../models/User");
const cryptoJs = require("crypto-js");

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
        // username: req.body.username,
        // password: req.body.password,
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...others } = updatedUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json("You haven't authority to edit users data");
  }
};

module.exports = { updateUser };
