const ResponseSuccess = require("../responses/success.response");
const StatusCode = require("../utils/httpStatusCode");
const FileService = require("../services/file.service");

class FileController {

  static createFile = async (req, res) => {
    new ResponseSuccess(
      StatusCode.CREATED,
      "Upload file thành công",
      await FileService.createFile(req)
    ).send(res);
  }

  static viewFile = async (req, res) => {
    await FileService.viewFile(req, res);
  }
}

module.exports = FileController;