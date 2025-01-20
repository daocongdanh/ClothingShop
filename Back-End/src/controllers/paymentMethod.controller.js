const ResponseSuccess = require("../responses/success.response");
const PaymentMethodService = require("../services/paymentMethod.service");
const StatusCode = require("../utils/httpStatusCode");

class PaymentMethodController {
  static createPaymentMethod = async (req, res) => {
    new ResponseSuccess(
      StatusCode.CREATED,
      "Thêm mới phương thức thanh toán thành công",
      await PaymentMethodService.createPaymentMethod(req)
    ).send(res);
  }

  static getAllPaymentMethods = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy danh sách phương thức thanh toán thành công",
      await PaymentMethodService.getAllPaymentMethods(req)
    ).send(res);
  }

  static getPaymentMethodById = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy phương thức thanh toán theo id thành công",
      await PaymentMethodService.getPaymentMethodById(req)
    ).send(res);
  }

  static updatePaymentMethod = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Cập nhật phương thức thanh toán thành công",
      await PaymentMethodService.updatePaymentMethod(req)
    ).send(res);
  }
}

module.exports = PaymentMethodController;
