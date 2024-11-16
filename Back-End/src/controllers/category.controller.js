const ResponseSuccess = require("../responses/success.response");
const CategoryService = require("../services/category.service");
const StatusCode = require("../utils/httpStatusCode");

class CategoryControler {

  static getAllCategories = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy tất cả danh mục sản phẩm thành công",
      await CategoryService.getAllCategories()
    ).send(res);
  }

  static createCategory = async (req, res) => {
    new ResponseSuccess(
      StatusCode.CREATED,
      "Thêm mới danh mục sản phẩm thành công",
      await CategoryService.createCategory(req)
    ).send(res);
  }

  static getCategoryBySlug = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy danh mục sản phẩm theo slug thành công",
      await CategoryService.getCategoryBySlug(req)
    ).send(res);
  }

  static getAllCategoriesWithProduct = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy danh sách danh mục sản phẩm kèm theo sản phẩm thành công",
      await CategoryService.getAllCategoriesWithProduct()
    ).send(res);
  }
}


module.exports = CategoryControler;