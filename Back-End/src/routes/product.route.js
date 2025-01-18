const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const ProductController = require("../controllers/product.controller");
const requireRoles = require("../middlewares/authJwt");
const { UserRole } = require("../constants/index");

router.get("/all", asyncHandler(ProductController.getAllProducts));
router.get("/", asyncHandler(ProductController.filterProduct));
router.get("/new", asyncHandler(ProductController.getAllProductsNew));
router.get("/:id", asyncHandler(ProductController.getProductById));
router.get("/slug/:slug", asyncHandler(ProductController.getProductBySlug));
router.get("/top5/:slug", asyncHandler(ProductController.getTop5Product));
router.post("/", requireRoles([UserRole.ADMIN]), asyncHandler(ProductController.createProduct));
router.delete("/:id/image", requireRoles([UserRole.ADMIN]), asyncHandler(ProductController.deleteImageProduct));
router.put("/:id/image", requireRoles([UserRole.ADMIN]), asyncHandler(ProductController.addImageToProduct));
router.put("/:id", requireRoles([UserRole.ADMIN]),  asyncHandler(ProductController.updateProduct));
router.get("/category/:categoryId", asyncHandler(ProductController.getProductsByCategory));

module.exports = router;