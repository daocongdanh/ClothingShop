const path = require("path");
const fs = require("fs"); // file system
const { ResourceNotFoundException } = require("../exceptions/global.exception");

class FileService {
  static createFile = async (req) => {
    const files = req.files.map((file) => path.basename(file.path));
    return files;
  };

  static viewFile = async (req, res) => {
    const { fileName } = req.params;
    const imagePath = path.join(path.join(__dirname, "../uploads/"), fileName);

    // Kiểm tra xem file có tồn tại hay không ?
    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        // Không tồn tại => lỗi
        return res.status(404).json({
          code: 404,
          message: "Không tìm thấy file",
        });
      }
      // Tồn tại => response
      res.sendFile(imagePath);
    });
  };

  static deleteFile = (fileName) => {
    const filePath = path.join(__dirname, "../uploads", fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        throw new ResourceNotFoundException("Không tìm thấy ảnh");
      } else {
        console.log("Tệp đã được xóa:", filePath);
      }
    });
  }


}

module.exports = FileService;
