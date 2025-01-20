const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "Số sao không được rỗng"],
      min: [1, "Số sao tối thiểu là 1"],
      max: [5, "Số sao tối đa là 5"] 
    },
    comment: {
      type: String,
      required: [true, "Đánh giá không được rỗng"] 
    },
    images: {
      type: [String],
      default: []
    },
    reviewDate: {
      type: Date,
      default: Date.now
    },
    status: Boolean,
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, "ProductId không được rỗng"]
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "UserId không được rỗng"]
    },
  },
  {
    collection: "reviews",
    timestamps: true
  }
);

const Review = model('Review', reviewSchema);

module.exports = Review;