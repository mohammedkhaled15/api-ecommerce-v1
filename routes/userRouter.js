const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyAccessTokenAndAuthorization = require("../middleware/verifyAccessTokenAndAuthorization");
const verifyAccessTokenAndIsAdmin = require("../middleware/verifyAccessTokenAndIsAdmin");

router.put(
  "/:id",
  verifyAccessTokenAndAuthorization,
  userController.updateUser
);

router.delete(
  "/:id",
  verifyAccessTokenAndAuthorization,
  userController.deleteUser
);

router.get(
  "/:id",
  verifyAccessTokenAndIsAdmin,
  userController.getUser
);

module.exports = router;
