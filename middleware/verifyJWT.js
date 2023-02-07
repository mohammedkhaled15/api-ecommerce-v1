const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    const authHeaders = req.headers.token;
    if (!authHeaders) res.status(500).json("Access not Authorized");
    const token = authHeaders.split(" ")[1];
    jwt.verify(token, process.env.ACCESSTOKEN_SECRET, (error, user) => {
      if (error) res.status(40).json("Access not Authorized 2");
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json("Access not Authorized 3");
  }
};

module.exports = verifyJWT;
