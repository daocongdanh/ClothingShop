const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const UserController = require("../controllers/user.controller");

router.post("/register", asyncHandler(UserController.register));
router.post("/login", asyncHandler(UserController.login));

module.exports = router;