const express = require("express");
const router = express.Router();
const asyncHandler = require("../middlewares/asyncHandler");
const ReviewController = require("../controllers/review.controller");

router.post("/", asyncHandler(ReviewController.createReview));

module.exports = router;