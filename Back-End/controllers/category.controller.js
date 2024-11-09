const Category = require("../models/category.model");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      code: 200,
      message: "Lấy tất cả danh mục sản phẩm thành công",
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi",
      error: error.message
    });
  }
}

const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const newCategory = new Category({
      name,
      slug
    });

    await newCategory.save();

    res.status(201).json({
      code: 201,
      message: "Thêm mới danh mục sản phẩm thành công",
      data: newCategory
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi",
      error: error.message
    });
  }
}

module.exports = {
  getAllCategories,
  createCategory
}