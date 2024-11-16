const CartService = require("../services/cart.service");
const StatusCode  = require("../utils/httpStatusCode");
const ResponseSuccess = require("../responses/success.response");

class CartController {
  static addToCart = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Thêm mới sản phẩm vào giỏ hàng thành công",
      await CartService.addToCart(req)
    ).send(res);
  }
  
  static updateCart = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Cập nhật giỏ hàng thành công",
      await CartService.updateCart(req)
    ).send(res);
  }
  
  static deleteCart = async (req, res) => {
    await CartService.deleteCart(req);
    new ResponseSuccess(
      StatusCode.OK,
      "Xóa sản phẩm trong giỏ hàng thành công"
    ).send(res);
  }
  
  static getCartByUser = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy giỏ hàng theo user thành công",
      await CartService.getCartByUser(req)
    ).send(res);
  }
}


module.exports = CartController;