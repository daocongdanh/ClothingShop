const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");

router.get("/", controller.filterProduct);
router.get("/:slug", controller.getProductBySlug);

module.exports = router;