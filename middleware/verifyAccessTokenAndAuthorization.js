const verifyJWT = require("./verifyJWT");

const verifyAccessTokenAndAuthorization = async (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.params.id === req.user.id) {
      next();
    } else {
      res
        .status(403)
        .json("Can't access other user data, without Admin Permission");
    }
  });
};

module.exports = verifyAccessTokenAndAuthorization;
