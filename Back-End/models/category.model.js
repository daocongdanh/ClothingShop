const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description : String,
});

const Category = model('Category', categorySchema , "categories");

module.exports = Category;