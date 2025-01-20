const Product = require("../models/product.model");
const User = require("../models/user.model");
const Review = require("../models/review.model");

const { ResourceNotFoundException } = require("../exceptions/global.exception");

class ReviewService {
  static createReview = async (req) => {
    const { rating, comment, productId, images } = req.body;
    const { _id } = req.user;

    const product = await Product.findOne({
      _id: productId,
    });
    if (!product) throw new ResourceNotFoundException("Không tìm sản phẩm");

    const user = await User.findOne({
      _id: _id,
    });
    if (!user) throw new ResourceNotFoundException("Không tìm user");

    const review = new Review({
      user: _id,
      product: productId,
      rating: rating,
      comment: comment,
      images: images,
      reviewDate: Date.now(),
      status: true
    });

    return await review.save();
  };

  static getReviewsByProduct = async (req) => {
    const { productId } = req.params;
    const { sort, limit } = req.query;

    const product = await Product.findOne({
      _id: productId,
    });
    if (!product) throw new ResourceNotFoundException("Không tìm sản phẩm");

    const arr = sort.split(":");
    const key = arr[0];
    const value = parseInt(arr[1]);

    const reviews = await Review.find({
      product: productId
    })
    .sort({
      [key] : value
    })
    .limit(parseInt(limit))
    .populate('user');

    const reviewData = await Review.find({
      product: productId
    })

    const sum = reviewData.reduce((total, item) => total + item.rating, 0);
    const avgRate = Math.ceil(sum / reviewData.length);

    return {
      array: reviews,
      totalItem: reviewData.length,
      avgRate: avgRate
    };
  };
}

module.exports = ReviewService;
