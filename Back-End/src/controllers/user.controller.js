const ResponseSuccess = require("../responses/success.response");
const UserService = require("../services/user.service");
const StatusCode = require("../utils/httpStatusCode");

class UserController {
  static register = async (req, res) => {
    new ResponseSuccess(
      StatusCode.CREATED,
      "Thêm mới tài khoản thành công",
      await UserService.register(req)
    ).send(res);
  };

  static login = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Đăng nhập thành công",
      await UserService.login(req)
    ).send(res);
  };
}

module.exports = UserController;
