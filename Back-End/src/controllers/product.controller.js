const ResponseSuccess = require("../responses/success.response");
const ProductService = require("../services/product.service");
const StatusCode = require("../utils/httpStatusCode");

class ProductController {

  static filterProduct = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy danh sách sản phẩm theo các tiêu chí thành công",
      await ProductService.filterProduct(req)
    ).send(res);
  };

  static getProductBySlug = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy sản phẩm theo slug thành công",
      await ProductService.getProductBySlug(req)
    ).send(res);
  };

  static getAllProductsNew = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy sản phẩm mới nhất thành công",
      await ProductService.getAllProductsNew()
    ).send(res);
  };

  static getTop5Product = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy top 5 sản phẩm thành công",
      await ProductService.getTop5Product(req)
    ).send(res);
  };

  static getAllProducts = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy tất cả sản phẩm sản phẩm thành công",
      await ProductService.getAllProducts()
    ).send(res);
  }

  static createProduct = async (req, res) => {
    new ResponseSuccess(
      StatusCode.CREATED,
      "Thêm mới sản phẩm sản phẩm thành công",
      await ProductService.createProduct(req)
    ).send(res);
  }

  static getProductById = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy tất cả sản phẩm sản phẩm theo Id thành công",
      await ProductService.getProductById(req)
    ).send(res);
  }

  static deleteImageProduct = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Xóa ảnh sản phẩm thành công",
      await ProductService.deleteImageProduct(req)
    ).send(res);
  }

  static addImageToProduct = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Thêm ảnh vào sản phẩm thành công",
      await ProductService.addImageToProduct(req)
    ).send(res);
  }

  static updateProduct = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Cập nhật sản phẩm thành công",
      await ProductService.updateProduct(req)
    ).send(res);
  }

  static getProductsByCategory = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy sản phẩm theo danh mục sản phẩm thành công",
      await ProductService.getProductsByCategory(req)
    ).send(res);
  }
}

module.exports = ProductController;
