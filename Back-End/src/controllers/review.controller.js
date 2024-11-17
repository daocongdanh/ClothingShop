const ResponseSuccess = require("../responses/success.response");
const ReviewService = require("../services/review.service");
const StatusCode = require("../utils/httpStatusCode");

class ReviewController {
  static createReview = async (req, res) => {
    console.log(req.files);
    new ResponseSuccess(
      StatusCode.OK,
      "Upload ok",
      "oke"
    ).send(res);
  }
}

module.exports = ReviewController;