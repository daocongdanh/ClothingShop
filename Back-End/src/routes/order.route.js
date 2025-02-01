const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order.controller");
const asyncHandler = require("../middlewares/asyncHandler");
const requireRoles = require("../middlewares/authJwt");
const { UserRole } = require("../constants/index");

router.post("/", requireRoles([UserRole.ADMIN], [UserRole.USER]), asyncHandler(OrderController.createOrder));
router.get("/vn-pay-callback", asyncHandler(OrderController.vnpayCallBack));

module.exports = router;