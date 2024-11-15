const express = require("express");
const router = express.Router();

const controller = require("../controllers/product.controller");

router.get("/", controller.filterProduct);
router.get("/new", controller.getAllProductsNew);
router.get("/:slug", controller.getProductBySlug);
router.get("/top5/:slug", controller.getTop5Product);

module.exports = router;