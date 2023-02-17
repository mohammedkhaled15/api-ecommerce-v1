const jwt = require("jsonwebtoken");
const User = require("../models/User");

const refreshController = async (req, res) => {
  if (!req.cookies?.refreshToken) return res.status(401).json("Not Authorized");
  const refreshToken = req.cookies.refreshToken;
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.status(403).json("second error");

  jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET, (err, decoded) => {
    if (err || decoded.id !== foundUser._id.toString())
      return res.status(403).json("third error");
    const accessToken = jwt.sign(
      {
        id: foundUser._id,
        isAdmin: foundUser.isAdmin,
      },
      process.env.ACCESSTOKEN_SECRET,
      { expiresIn: "15s" }
    );
    res.status(200).json({ accessToken });
  });
};

module.exports = { refreshController };
