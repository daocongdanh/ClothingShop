const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const asyncHandler = require("../middlewares/asyncHandler");
const requireRoles = require("../middlewares/authJwt");
const { UserRole } = require("../constants/index");

router.get("/", asyncHandler(CategoryController.getAllCategories));
router.post("/", requireRoles([UserRole.ADMIN]), asyncHandler(CategoryController.createCategory));
router.get("/with-product-detail", asyncHandler(CategoryController.getAllCategoriesWithProduct));
router.get("/:slug", asyncHandler(CategoryController.getCategoryBySlug));

module.exports = router;