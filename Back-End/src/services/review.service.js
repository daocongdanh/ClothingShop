const Product = require("../models/product.model");
const { ResourceNotFoundException } = require("../exceptions/global.exception");

class ReviewService {
  static createReview = async (req) => {
    // console.log(req.body);
  }
}

module.exports = ReviewService;