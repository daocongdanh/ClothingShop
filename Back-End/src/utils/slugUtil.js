const createSlug = (text) => {
  return text
        .toLowerCase() // Chuyển toàn bộ chữ thành chữ thường
        .trim() // Loại bỏ khoảng trắng đầu và cuối chuỗi
        .normalize('NFD') // Chuẩn hóa ký tự Unicode (chuyển dấu thành ký tự gốc)
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu tiếng Việt
        .replace(/đ/g, 'd') // Thay 'đ' thành 'd'
        .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự đặc biệt
        .replace(/\s+/g, '-') // Thay khoảng trắng thành dấu '-'
        .replace(/-+/g, '-'); // Xóa bớt các dấu '-' liên tiếp
}

module.exports = createSlug;