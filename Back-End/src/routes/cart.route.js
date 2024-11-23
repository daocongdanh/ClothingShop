const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const asyncHandler = require("../middlewares/asyncHandler");
const requireRoles = require("../middlewares/authJwt");
const { UserRole } = require("../constants/index");

router.post("/", requireRoles([UserRole.USER]), asyncHandler(CartController.addToCart));
router.get("/user", requireRoles([UserRole.USER]), asyncHandler(CartController.getCartByUser));
router.put("/cart-item/:productId", requireRoles([UserRole.USER]), asyncHandler(CartController.updateCart));
router.delete("/cart-item/:productId", requireRoles([UserRole.USER]), asyncHandler(CartController.deleteCart));

module.exports = router;
