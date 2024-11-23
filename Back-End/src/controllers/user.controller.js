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

  static refreshToken = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Refresh Token thành công",
      await UserService.refreshToken(req)
    ).send(res);
  }

  static logout = async (req, res) => {
    await UserService.logout(req)
    new ResponseSuccess(
      StatusCode.OK,
      "Đăng xuất thành công"
    ).send(res);
  }
}

module.exports = UserController;
