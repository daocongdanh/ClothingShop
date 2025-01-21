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

  static getAllReviews = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy tất cả đánh giá thành công",
      await ReviewService.getAllReviews()
    ).send(res);
  }

  static updateReviewStatus = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Cập nhật trạng thái đánh giá thành công",
      await ReviewService.updateReviewStatus(req)
    ).send(res);
  }
}

module.exports = ReviewController;