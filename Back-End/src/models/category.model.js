const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Tên danh mục không được rỗng"],
      unique: true
    },
    slug: {
      type: String,
      required: [true, "Slug không được rỗng"]
    },
    status: Boolean
  },
  {
    collection: "categories",
    timestamps: true
  }
);

const Category = model('Category', categorySchema);

module.exports = Category;