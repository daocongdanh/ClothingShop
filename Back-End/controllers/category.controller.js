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
      name: name,
      slug: slug
    });

    await newCategory.save();

    return res.status(201).json({
      code: 201,
      message: "Thêm mới danh mục sản phẩm thành công",
      data: newCategory
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi",
      error: error.message
    });
  }
}

const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Category.find({
      slug: slug
    });

    return res.status(200).json({
      code: 200,
      message: "Lấy danh mục sản phẩm theo slug thành công",
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi",
      error: error.message
    });
  }
}

const getAllCategoriesWithProduct = async (req, res) => {
  const categories = await Category.aggregate([
    {
      $lookup:{
        from: 'products',
        localField: '_id',
        foreignField: 'categoryId',
        as: 'products'
      }
    },
    {
      $addFields: {
        products: { $slice: ["$products", 10] }
      }
    }
  ]);

  try {
    return res.status(200).json({
      code: 200,
      message: "Lấy danh sách danh mục sản phẩm kèm theo sản phẩm thành công",
      data: categories
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryBySlug,
  getAllCategoriesWithProduct
}