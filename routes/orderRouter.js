const router = require("express").Router();
const orderController = require("../controllers/orderController");
const verifyToken = require("../middleware/verifyJWT");
const verifyAccessTokenAndIsAdminOnly = require("../middleware/verifyAccessTokenAndIsAdminOnly");
const verifyAccessTokenAndAuthorization = require("../middleware/verifyAccessTokenAndAuthorization");

router.post("/", verifyToken, orderController.createNewOrder);

router.put(
  "/:userId",
  verifyAccessTokenAndIsAdminOnly,
  orderController.updateOrder
);

router.delete(
  "/:userId",
  verifyAccessTokenAndIsAdminOnly,
  orderController.deleteOrder
);

router.get(
  "/find/:userId",
  verifyAccessTokenAndAuthorization,
  orderController.deleteOrder
);

router.get("/", verifyAccessTokenAndIsAdminOnly, orderController.getAllOrders);

router.get(
  "/income",
  verifyAccessTokenAndIsAdminOnly,
  orderController.getMonthlyIncome
);

module.exports = router;
