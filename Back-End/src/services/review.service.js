const Product = require("../models/product.model");
const User = require("../models/user.model");
const { ResourceNotFoundException } = require("../exceptions/global.exception");

class ReviewService {
  static createReview = async (req) => {
    const { userId, rating, comment, productId} = req.body;
    
    const product = await Product.findOne({
      _id: productId,
    });
    if(!product)
      throw new ResourceNotFoundException("Không tìm sản phẩm");

    const user = await User.findOne({
      _id: userId
    });
    if(!user)
      throw new ResourceNotFoundException("Không tìm user");

    const review = {
      userId: userId,
      rating: rating,
      comment: comment,
      images: [],
      reviewDate: Date.now()
    }

    product.reviews.push(review);
    
    return await product.save();
  }
}

module.exports = ReviewService;