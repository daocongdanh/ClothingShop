const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const UserController = require("../controllers/user.controller");
const requireRoles = require("../middlewares/authJwt");
const { UserRole } = require("../constants/index");

router.post("/register", asyncHandler(UserController.register));
router.post("/login", asyncHandler(UserController.login));
router.post("/refreshToken", asyncHandler(UserController.refreshToken));
router.post("/logout", requireRoles([UserRole.USER, UserRole.ADMIN]) ,asyncHandler(UserController.logout));
router.get("/my-info", requireRoles([UserRole.USER, UserRole.ADMIN]) ,asyncHandler(UserController.getMyInfo));
router.put("/update-my-info", requireRoles([UserRole.USER, UserRole.ADMIN]) ,asyncHandler(UserController.updateMyInfo));
router.post("/add-new-address-by-user", requireRoles([UserRole.USER, UserRole.ADMIN]) ,asyncHandler(UserController.addNewAddressByMyInfo));
router.delete("/delete-address-by-user/:addressId", requireRoles([UserRole.USER, UserRole.ADMIN]) ,asyncHandler(UserController.deleteAddressByMyInfo));

module.exports = router;