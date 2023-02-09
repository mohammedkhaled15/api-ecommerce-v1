const router = require("express").Router();
const verifyToken = require("../middleware/verifyJWT");
const verifyAccessTokenAndAuthorization = require("../middleware/verifyAccessTokenAndAuthorization");
const verifyAccessTokenAndIsAdminOnly = require("../middleware/verifyAccessTokenAndIsAdminOnly");
const cartController = require("../controllers/cartController");

router.post("/", verifyToken, cartController.createNewCart);

router.put(
  "/:id",
  verifyAccessTokenAndAuthorization,
  cartController.updateCart
);

router.delete(
  "/:id",
  verifyAccessTokenAndAuthorization,
  cartController.deleteCart
);

router.get(
  "/:userId",
  verifyAccessTokenAndAuthorization,
  cartController.getCart
);

router.get("/", verifyAccessTokenAndIsAdminOnly, cartController.getAllCarts);

module.exports = router;
