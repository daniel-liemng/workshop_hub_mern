const userController = require("../controllers/userController");
const { userRegisterValidator } = require("../validators/userValidator");

const router = require("express").Router();

// @route  POST api/users
router.post("/register", userRegisterValidator, userController.registerUser);

module.exports = router;
