const express = require("express");
const router = express.Router();

const controller = require("../controllers/cart.controller");

router.post("/", controller.addToCart);
router.get("/user/:userId", controller.getCartByUser);
router.put("/cart-item/:productId", controller.updateCart);
router.delete("/cart-item/:productId", controller.deleteCart);

module.exports = router;