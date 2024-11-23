const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const ReviewController = require("../controllers/review.controller");
const requireRoles = require("../middlewares/authJwt");
const { UserRole } = require("../constants/index");

router.post("/", requireRoles([UserRole.USER]), asyncHandler(ReviewController.createReview));
router.get("/product/:productId", asyncHandler(ReviewController.getReviewsByProduct));

module.exports = router;