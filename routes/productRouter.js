const router = require("express").Router();
const productController = require("../controllers/productController");
const verifyAccessTokenAndIsAdminOnly = require("../middleware/verifyAccessTokenAndIsAdminOnly");
const verifyJWT = require("../middleware/verifyJWT");

router.post(
  "/",
  verifyAccessTokenAndIsAdminOnly,
  productController.createNewProduct
);

router.put(
  "/:id",
  verifyAccessTokenAndIsAdminOnly,
  productController.updateProduct
);

router.delete(
  "/:id",
  verifyAccessTokenAndIsAdminOnly,
  productController.deleteProduct
);

router.get("/:id", verifyJWT, productController.getProduct);

router.get("/", productController.getAllProducts);

module.exports = router;
