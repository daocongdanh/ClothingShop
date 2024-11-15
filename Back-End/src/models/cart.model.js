const { model, Schema } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        name: {
          type: String,
          required: true
        },
        image: {
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
          required: true,
          min: 1
        },
        color: {
          type: String,
          required: true
        },
        size: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    collection: "carts",
    timestamps: true
  }
);

const Cart = model('Cart', cartSchema);

module.exports = Cart;