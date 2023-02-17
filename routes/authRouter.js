const router = require("express").Router();
const registerController = require("../controllers/registerController");
const User = require("../models/User");
const loginController = require("../controllers/loginController");
const { refreshController } = require("../controllers/refreshController");
const { logoutController } = require("../controllers/logoutController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/refresh", refreshController);
router.get("/logout", logoutController);

module.exports = router;
