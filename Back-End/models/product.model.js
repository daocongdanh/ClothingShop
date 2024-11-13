const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    description: String,
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
    colors: {
      type: [String],
      default: []
    },
    new : Boolean,
    sizes : {
      type: [String],
      default: []
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
        reviewDate: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    collection: "products",
    timestamps: true
  }
);

const Product = model('Product', productSchema);

module.exports = Product;