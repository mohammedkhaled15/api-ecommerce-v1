const verifyJWT = require("./verifyJWT");

const verifyAccessTokenAndAuthorization = async (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.params.id === req.user.id || req.user.isAdmin === true) {
      next();
    } else {
      res
        .status(403)
        .json("Can't access this data, it isn't Yours nor you admin!");
    }
  });
};

module.exports = verifyAccessTokenAndAuthorization;
