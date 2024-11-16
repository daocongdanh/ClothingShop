const { model, Schema } = require("mongoose");

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "UserId không được rỗng"]
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, "ProductId không được rỗng"]
        },
        name: {
          type: String,
          required: [true, "Tên sản phẩm không được rỗng"]
        },
        image: {
          type: String,
          required: [true, "Ảnh sản phẩm không được rỗng"]
        },
        price: {
          type: Number,
          required: [true, "Giá sản phẩm không được rỗng"],
          min: [1, "Giá sản phẩm phải > 0"]
        },
        discountedPrice: {
          type: Number,
          default: 0
        },
        quantity: {
          type: Number,
          required: [true, "Số lượng không được rỗng"],
          min: [1, "Số lượng phải > 0"]
        },
        color: {
          type: String,
          required: [true, "Màu sản phẩm không được rỗng"]
        },
        size: {
          type: String,
          required: [true, "Kích thước không được rỗng"]
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