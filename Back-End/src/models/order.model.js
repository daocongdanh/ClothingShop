const { model, Schema } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "UserId không được rỗng"],
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "ProductId không được rỗng"],
        },
        name: {
          type: String,
          required: [true, "Tên sản phẩm không được rỗng"],
        },
        image: {
          type: String,
          required: [true, "Ảnh sản phẩm không được rỗng"],
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
      },
    ],
    address: {
      type: String,
      required: [true, "Địa chỉ không được rỗng"]
    },
    totalAmount: {
      type: Number,
      required: [true, "Tổng tiền không được rỗng"],
      min: [1, "Tổng tiền phải > 0"]
    },
    fee: {
      type: Number,
      required: [true, "Phí ship không được rỗng"],
      min: [1, "Phí ship > 0"]
    },
    paymentMethod: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentMethod',
      required: [true, "PaymentMethodId không được rỗng"]
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },
    orderDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: "orders",
    timestamps: true
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
