const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyAccessTokenAndIsAdmin = require("../middleware/verifyAccessTokenAndIsAdmin");

router.post("/:id", verifyAccessTokenAndIsAdmin, userController.updateUser);

module.exports = router;
