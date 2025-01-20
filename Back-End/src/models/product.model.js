const { model, Schema } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Tên sản phẩm không được rỗng"],
      unique: true
    },
    slug: {
      type: String,
      required: true
    },
    description: String,
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
    colors: {
      type: [String],
      default: []
    },
    new : Boolean,
    status: Boolean,
    sizes : {
      type: [String],
      default: []
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, "CategoryId không được rỗng"]
    },
    images: {
      type: [String],
      default: []
    }
  },
  {
    collection: "products",
    timestamps: true
  }
);

const Product = model('Product', productSchema);

module.exports = Product;