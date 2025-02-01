const ResponseSuccess = require("../responses/success.response");
const OrderService = require("../services/order.service");
const StatusCode = require("../utils/httpStatusCode");

class OrderController {
  static createOrder = async (req, res) => {
    new ResponseSuccess(
      StatusCode.CREATED,
      "Tạo đơn hàng thành công",
      await OrderService.createOrder(req)
    ).send(res);
  }

  static vnpayCallBack = async (req, res) => {
    await OrderService.vnpayCallBack(req, res);
  }
}

module.exports = OrderController;