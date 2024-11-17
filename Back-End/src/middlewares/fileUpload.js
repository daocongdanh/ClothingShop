const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const destinationPath = path.join(__dirname, "../uploads"); // Đường dẫn thư mục đích để upload
    callback(null, destinationPath);
  },
  filename: (req, file, callback) => {
    const newFileName = `${Date.now()}-${file.originalname}`;
    callback(null, newFileName);
  },
});

// Dùng hàm này để xử lý các file nào cho phép và bị bỏ qua
const fileFilter = (req, file, callback) => {
  if(file.mimetype.startsWith("image")){
    callback(null, true); // Cho phép đi qua
  }
  else{
    callback(new Error("Chỉ cho phép tải lên file ảnh"));
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fieldSize: 1
  }
});

module.exports = upload;
