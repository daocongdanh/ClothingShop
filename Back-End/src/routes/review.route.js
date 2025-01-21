const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const ReviewController = require("../controllers/review.controller");
const requireRoles = require("../middlewares/authJwt");
const { UserRole } = require("../constants/index");

router.post("/", requireRoles([UserRole.USER]), asyncHandler(ReviewController.createReview));
router.get("/product/:productId", asyncHandler(ReviewController.getReviewsByProduct));
router.get("/", requireRoles([UserRole.ADMIN]), asyncHandler(ReviewController.getAllReviews));
router.put("/:id/status/:status", requireRoles([UserRole.ADMIN]), asyncHandler(ReviewController.updateReviewStatus));

module.exports = router;