const router = require("express").Router();
const productController = require("../controllers/productController");
const verifyAccessTokenAndIsAdminOnly = require("../middleware/verifyAccessTokenAndIsAdminOnly");

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

router.get("/:id", productController.getProduct);
router.get("/", productController.getAllProducts);

module.exports = router;
