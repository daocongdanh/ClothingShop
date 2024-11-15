const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");
const asyncHandler = require("../middlewares/asyncHandler");

router.get("/", controller.getAllCategories);
router.post("/", controller.createCategory);
router.get("/with-product-detail", controller.getAllCategoriesWithProduct);
router.get("/:slug", asyncHandler(controller.getCategoryBySlug));

module.exports = router;