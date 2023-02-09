const verifyJWT = require("./verifyJWT");

const verifyAccessTokenAndIsAdminOnly = async (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Permission from Admin required");
    }
  });
};

module.exports = verifyAccessTokenAndIsAdminOnly;
