const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountedPrice: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  reviews: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5 
      },
      comment: {
        type: String,
        required: true 
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Product = model('Product', productSchema, "products");

module.exports = Product;