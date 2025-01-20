const express = require("express");
const router = express.Router();
const PaymentMethodController = require("../controllers/paymentMethod.controller");
const asyncHandler = require("../middlewares/asyncHandler");
const requireRoles = require("../middlewares/authJwt");
const { UserRole } = require("../constants/index");

router.post("/", requireRoles([UserRole.ADMIN]), asyncHandler(PaymentMethodController.createPaymentMethod));
router.get("/", asyncHandler(PaymentMethodController.getAllPaymentMethods));
router.get("/:id", asyncHandler(PaymentMethodController.getPaymentMethodById));
router.put("/:id", requireRoles([UserRole.ADMIN]), asyncHandler(PaymentMethodController.updatePaymentMethod));

module.exports = router;