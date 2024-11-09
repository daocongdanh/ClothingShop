const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    }
  },
  {
    collection: "categories",
    timestamps: true
  }
);

const Category = model('Category', categorySchema);

module.exports = Category;