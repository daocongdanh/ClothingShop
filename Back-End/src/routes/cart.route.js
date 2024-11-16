const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cart.controller");
const asyncHandler = require("../middlewares/asyncHandler");

router.post("/", asyncHandler(CartController.addToCart));
router.get("/user/:userId", asyncHandler(CartController.getCartByUser));
router.put("/cart-item/:productId", asyncHandler(CartController.updateCart));
router.delete("/cart-item/:productId", asyncHandler(CartController.deleteCart));

module.exports = router;