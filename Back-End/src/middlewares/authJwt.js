const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const requireRoles = (rolesRequired) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        code: 401,
        message: "Token không được rỗng",
      });
    }

    const token = authHeader.split(" ")[1];

    const tokenExists = await User.findOne({
      tokens: {
        $elemMatch: { accessToken: token },
      },
    });

    if (!tokenExists)
      return res.status(401).json({
        code: 401,
        message: "Token không hợp lệ",
      });
    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findOne({
      _id: decoded.userId,
    });

    if (!user)
      return res.status(401).json({
        code: 401,
        message: "Người dùng không tồn tại",
      });

    if (!user.active)
      return res.status(401).json({
        code: 401,
        message: "Tài khoản đã bị khóa",
      });
    
    if (!user.roles.some((role) => rolesRequired.includes(role))) {
      return res.status(403).json({
        code: 403,
        message: "Không có quyền truy cập",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError")
      return res.status(401).json({
        code: 401,
        message: "Token đã hết hạn",
      });
    if (error.name === "JsonWebTokenError")
      return res.status(401).json({
        code: 401,
        message: "Token không hợp lệ",
      });
    return res.status(500).json({
      code: 500,
      message: "Lỗi server",
    });
  }
};

module.exports = requireRoles;
