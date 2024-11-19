const Product = require("../models/product.model");
const User = require("../models/user.model");
const { ResourceNotFoundException } = require("../exceptions/global.exception");
const { ObjectId } = require("mongoose").Types;

class ReviewService {
  static createReview = async (req) => {
    const { userId, rating, comment, productId, images } = req.body;

    const product = await Product.findOne({
      _id: productId,
    });
    if (!product) throw new ResourceNotFoundException("Không tìm sản phẩm");

    const user = await User.findOne({
      _id: userId,
    });
    if (!user) throw new ResourceNotFoundException("Không tìm user");

    const review = {
      user: {
        userId: userId,
        fullName: user.fullName,
      },
      rating: rating,
      comment: comment,
      images: images,
      reviewDate: Date.now(),
    };

    product.reviews.push(review);

    return await product.save();
  };

  static getReviewsByProduct = async (req) => {
    const { productId } = req.params;
    const { sort, limit } = req.query;

    const product = await Product.findOne({
      _id: productId,
    });
    if (!product) throw new ResourceNotFoundException("Không tìm sản phẩm");

    let aggregate = [
      {
        $match: {
          _id: new ObjectId(productId),
        },
      },
      { $unwind: "$reviews" }
    ];

    const arr = sort.split(":");
    const key = arr[0];
    const value = parseInt(arr[1]);
    
    aggregate.push({
      $sort: {
        [`reviews.${key}`]: value,
      },
    });

    aggregate.push(
      {
        $limit: parseInt(limit),
      },
      {
        $project: {
          reviews: 1
        }
      }
    );

    const reviews = await Product.aggregate(aggregate);

    return {
      array: reviews,
      totalItem: product.reviews.length
    };
  };
}

module.exports = ReviewService;
