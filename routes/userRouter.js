const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyAccessTokenAndAuthorization = require("../middleware/verifyAccessTokenAndAuthorization");
const verifyAccessTokenAndIsAdmin = require("../middleware/verifyAccessTokenAndIsAdmin");
const verifyAccessTokenAndIsAdminOnly = require("../middleware/verifyAccessTokenAndIsAdminOnly");

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
  "/find/:id",
  verifyAccessTokenAndIsAdminOnly,
  userController.getUser
);

router.get(
  "/findall",
  verifyAccessTokenAndIsAdminOnly,
  userController.getAllUsers
);

router.get(
  "/stats",
  verifyAccessTokenAndIsAdminOnly,
  userController.getUserStats
);

module.exports = router;
