const Category = require("../models/category.model");
const Product = require("../models/product.model");
const {
  ResourceNotFoundException,
  ConflictException,
  DeletionException
} = require("../exceptions/global.exception");
const createSlug = require("../utils/slugUtil");

class CategoryService {
  static getAllCategories = async (req) => {
    const { name } = req.query;
    if(name !== undefined)
      return await Category.find({
        name: { $regex: name, $options: "i" }
      });

    return await Category.find();
  };

  static createCategory = async (req) => {
    const { name } = req.body;

    if (name !== "" && name !== undefined) {
      const categoryExists = await Category.findOne({
        name: name,
      });
      if (categoryExists)
        throw new ConflictException("Tên danh mục sản phẩm đã tồn tại");
    }

    const slug = createSlug(name);

    const category = new Category({
      name: name,
      slug: slug,
      status: true
    });

    return await category.save();
  };

  static getCategoryBySlug = async (req) => {
    const { slug } = req.params;
    const category = await Category.findOne({
      slug: slug,
    });

    if (!category)
      throw new ResourceNotFoundException(
        "Không tìm thấy danh mục sản phẩm theo slug: " + slug
      );

    return category;
  };

  static getAllCategoriesWithProduct = async () => {
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "categoryId",
          as: "products",
        },
      },
      {
        $addFields: {
          products: { $slice: ["$products", 10] },
        },
      },
    ]);

    return categories;
  };

  static deleteCategory = async (req) => {
    const { id } = req.params;

    const productExists = await Product.findOne({
      categoryId : id
    });
    if(productExists){
      throw new DeletionException(
        "Không thể xóa danh mục sản phẩm"
      );
    }
    await Category.deleteOne({
      _id: id
    })
  };

  static getCategoryById = async (req) => {
    const { id } = req.params;

    const category = await Category.findOne({
      _id: id,
    });

    if (!category)
      throw new ResourceNotFoundException(
        "Không tìm thấy danh mục sản phẩm theo Id: " + id
      );
      
    return category;
  };

  static updateCategory = async (req) => {
    const { id } = req.params;
    const { name, status } = req.body;

    const category = await Category.findOne({
      _id: id,
    });

    if (!category)
      throw new ResourceNotFoundException(
        "Không tìm thấy danh mục sản phẩm theo Id: " + id
      );

    if(category.name !== name){
      const categoryExists = await Category.findOne({
        name: name,
      });
      if(categoryExists){
        throw new ConflictException("Tên danh mục sản phẩm đã tồn tại");
      }
    }
    
    const slug = createSlug(name);
    category.name = name;
    category.slug = slug;
    category.status = status;
    
    await category.save();
    return category;
  }

}

module.exports = CategoryService;
