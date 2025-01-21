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

  static getMyInfo = async (req, res) =>{
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy thông tin user thành công",
      await UserService.getMyInfo(req)
    ).send(res);
  }

  static updateMyInfo = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Cập nhật thông tin user thành công",
      await UserService.updateMyInfo(req)
    ).send(res);
  }

  static addNewAddressByMyInfo = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Thêm địa chỉ cho user thành công",
      await UserService.addNewAddressByMyInfo(req)
    ).send(res);
  }

  static deleteAddressByMyInfo = async (req, res) => {
    await UserService.deleteAddressByMyInfo(req);
    new ResponseSuccess(
      StatusCode.NO_CONTENT,
      "Xóa địa chỉ cho user thành công",
    ).send(res);
  }

  static updateAddressByMyInfo = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Cập nhật địa chỉ cho user thành công",
      await UserService.updateAddressByMyInfo(req)
    ).send(res);
  }

  static getAllUsers = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy tất cả user thành công",
      await UserService.getAllUsers(req)
    ).send(res);
  }

  static getUserById = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Lấy user theo id thành công",
      await UserService.getUserById(req)
    ).send(res);
  }

  static updateUser = async (req, res) => {
    new ResponseSuccess(
      StatusCode.OK,
      "Cập nhật user thành công",
      await UserService.updateUser(req)
    ).send(res);
  }
}

module.exports = UserController;
