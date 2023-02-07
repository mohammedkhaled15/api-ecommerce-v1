const cryptoJs = require("crypto-js");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(401).json("Don't leave any required data empty");
  }
  try {
    const loggedUser = await User.findOne({ username: req.body.username });
    if (!loggedUser) res.status(500).json("Username Not Found in Database");
    const hashedPassword = cryptoJs.AES.decrypt(
      loggedUser.password,
      process.env.CRYPTO_PASSWORD
    );
    const originalPassword = hashedPassword.toString(cryptoJs.enc.Utf8);
    if (originalPassword !== req.body.password)
      res.status(401).json("Wrong password UNAUTHORIZED ENTRY");
    const accessToken = jwt.sign(
      { id: loggedUser.id, isAdmin: loggedUser.isAdmin },
      process.env.ACCESSTOKEN_SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...others } = loggedUser._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = loginController;
