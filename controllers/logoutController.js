const User = require("../models/User");

const logoutController = async (req, res) => {
  if (!req.cookies?.refreshToken) return res.sendStatus(204);

  const refreshToken = req.cookies.refreshToken;
  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.sendStatus(204);
  }

  await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};

module.exports = { logoutController };
