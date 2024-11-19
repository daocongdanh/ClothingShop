const ResponseSuccess = require("../responses/success.response");
const ReviewService = require("../services/review.service");
const StatusCode = require("../utils/httpStatusCode");

class ReviewController {

  static createReview = async (req, res) => {
    new ResponseSuccess(
      StatusCode.CREATED,
      "Tạo đánh giá thành công",
      await ReviewService.createReview(req)
    ).send(res);
  }
  static getReviewsByProduct = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy đánh giá theo sản phẩm thành công",
      await ReviewService.getReviewsByProduct(req)
    ).send(res);
  }
}

module.exports = ReviewController;