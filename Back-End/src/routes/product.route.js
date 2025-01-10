const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const ProductController = require("../controllers/product.controller");
const requireRoles = require("../middlewares/authJwt");
const { UserRole } = require("../constants/index");

router.get("/all", asyncHandler(ProductController.getAllProducts));
router.get("/", asyncHandler(ProductController.filterProduct));
router.get("/new", asyncHandler(ProductController.getAllProductsNew));
router.get("/:slug", asyncHandler(ProductController.getProductBySlug));
router.get("/top5/:slug", asyncHandler(ProductController.getTop5Product));

module.exports = router;