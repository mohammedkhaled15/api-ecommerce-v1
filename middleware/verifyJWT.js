const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    const authHeaders = req.headers.token;
    if (!authHeaders) {
      res.status(500).json("Access not Authorized No Token In Headers");
      return;
    }
    const token = authHeaders.split(" ")[1];
    jwt.verify(token, process.env.ACCESSTOKEN_SECRET, (error, user) => {
      if (error)
        return res
          .status(403)
          .json("Access not Authorized due to problems in accessToken");
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json("Access not Authorized");
  }
};

module.exports = verifyJWT;
