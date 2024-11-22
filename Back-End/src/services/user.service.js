const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserRole } = require("../constants/index");
const {
  ConflictException,
  UnauthorizedException,
} = require("../exceptions/global.exception");

class UserService {
  static register = async (req) => {
    const { fullName, email, phone, password } = req.body;
    if (email !== "" && email !== undefined) {
      const userExists = await User.findOne({
        email: email,
      });
      if (userExists) throw new ConflictException("Email đã tồn tại");
    }

    if (phone !== "" && phone !== undefined) {
      const userExists = await User.findOne({
        phone: phone,
      });
      if (userExists) throw new ConflictException("Số điện thoại đã tồn tại");
    }

    const hashedPassword = password ? await argon2.hash(password) : null;

    const newUser = new User({
      fullName: fullName,
      email: email,
      phone: phone,
      password: hashedPassword,
      avatar: null,
      active: true,
      roles: [UserRole.USER],
      tokens: [],
    });

    await newUser.save();

    const newCart = new Cart({
      userId: newUser._id,
      items: [],
    });

    await newCart.save();

    return {
      userId: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,
      avatar: newUser.avatar,
      active: newUser.active,
      roles: newUser.roles
    };
  };

  static login = async (req) => {
    const { phone, password } = req.body;

    const user = await User.findOne({
      phone: phone,
    });

    if (!user) {
      throw new UnauthorizedException("Tài khoản hoặc mật khẩu sai");
    }

    const verifyPassword = await argon2.verify(user.password, password);

    if (!verifyPassword)
      throw new UnauthorizedException("Tài khoản hoặc mật khẩu sai");

    // Generate Access Token and Refresh Token

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION },
      { algorithm: "RS256" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION },
      { algorithm: "RS256" }
    );

    const isMobile = req.get("User-Agent") === "mobile";

    const tokens = user.tokens;
    var newTokens = tokens;

    if (tokens.length >= process.env.MAX_TOKENS) {
      // Ưu tiên xóa thiết bị k phải mobile
      // Nếu tất cả thiết bị đều là mobible thì xóa token của thiết bị đầu tiên
      const nonMobileToken = tokens.filter((item) => !item.isMobibleDevice);

      if (nonMobileToken.length > 0) {
        // Đã tìm thấy 1 token không phải thiết bị di động
        newTokens = tokens.filter(item => item.accessToken !== nonMobileToken[0].accessToken);
      } else {
        // Tất cả token đều là mobible -> xóa token đầu danh sách
        tokens.shift();
        newTokens = tokens;
      }
    }

    newTokens.push({
      accessToken: accessToken,
      refreshToken: refreshToken,
      isMobibleDevice: isMobile
    });

    user.tokens = newTokens;
    await user.save();

    return {
      user: {
        userId: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        active: user.active,
        roles: user.roles,
      },
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  };
}

module.exports = UserService;
