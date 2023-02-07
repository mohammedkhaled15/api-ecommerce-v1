const verifyJWT = require("./verifyJWT");

const verifyJwtANDIsAdmin = async (req, res, next) => {
  verifyJWT(req, res, () => {
    if (req.params.id === req.user.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Permission from Admin required");
    }
  });
};

module.exports = verifyJwtANDIsAdmin;
