const Category = require("../models/category.model");
const { ResourceNotFoundException } = require("../exceptions/global.exception");
class CategoryService {

  static getAllCategories = async () => {
    return await Category.find();
  }

  static createCategory = async (req) => {
    const { name, slug } = req.body;

    const category = new Category({
      name: name,
      slug: slug
    });

    return await category.save();
  }

  static getCategoryBySlug = async (req) => {
    const { slug } = req.params;
    const category = await Category.findOne({
      slug: slug
    });
    
    if(!category)
      throw new ResourceNotFoundException("Không tìm thấy danh mục sản phẩm theo slug: " + slug);

    return category;
  }

  static getAllCategoriesWithProduct = async () => {
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

    return categories;
  }

}

module.exports = CategoryService;