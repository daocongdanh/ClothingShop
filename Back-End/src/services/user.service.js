const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { UserRole } = require("../constants/index");
const {
  ConflictException,
  UnauthorizedException,
  Exception,
  ResourceNotFoundException,
  BadRequestException
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
      roles: newUser.roles,
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
        newTokens = tokens.filter(
          (item) => item.accessToken !== nonMobileToken[0].accessToken
        );
      } else {
        // Tất cả token đều là mobible -> xóa token đầu danh sách
        tokens.shift();
        newTokens = tokens;
      }
    }

    newTokens.push({
      accessToken: accessToken,
      refreshToken: refreshToken,
      isMobibleDevice: isMobile,
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
      refreshToken: refreshToken,
    };
  };

  static refreshToken = async (req) => {
    try {
      const { refreshToken } = req.body;

      const reFreshTokenExists = await User.findOne({
        tokens: {
          $elemMatch: { refreshToken: refreshToken },
        },
      });

      if (!reFreshTokenExists)
        throw new UnauthorizedException("Refresh Token không hợp lệ");

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY);

      const user = await User.findOne({
        _id: decoded.userId,
      });

      const newAccessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRATION },
        { algorithm: "RS256" }
      );

      const newRefreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_KEY,
        { expiresIn: process.env.JWT_REFRESH_EXPIRATION },
        { algorithm: "RS256" }
      );

      const index = user.tokens.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (index !== -1) {
        user.tokens[index].accessToken = newAccessToken;
        user.tokens[index].refreshToken = newRefreshToken;
      }

      await user.save();

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      console.log(error);
      if (error.name === "TokenExpiredError")
        throw new UnauthorizedException("Refresh Token đã hết hạn");
      if (error.name === "JsonWebTokenError")
        throw new UnauthorizedException("Refresh Token không hợp lệ");
      throw new Exception("Lỗi server");
    }
  };

  static logout = async (req) => {
    const { _id } = req.user;
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token không được rỗng");
    }

    const token = authHeader.split(" ")[1];

    const user = await User.findOne({
      _id: _id,
    });

    const index = user.tokens.findIndex((item) => item.accessToken === token);

    if (index !== -1) {
      user.tokens.splice(index, 1);
    } else throw new UnauthorizedException("Token không hợp lệ");

    await user.save();
  };

  static getMyInfo = async (req) => {
    const { _id } = req.user;
    const user = await User.findOne({
      _id: _id,
    });
    if (!user) throw new ResourceNotFoundException("Không tìm thấy user");
    return {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      active: user.active,
      roles: user.roles,
      address: user.address
    };
  };

  static updateMyInfo =  async (req) => {
    const { _id } = req.user;
    const { fullName, email, phone } = req.body;
    const user = await User.findOne({
      _id: _id,
    });
    if (!user) throw new ResourceNotFoundException("Không tìm thấy user");

    if (!fullName || fullName.trim() === "") {
      throw new BadRequestException("Họ và tên không được để trống");
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException("Email không hợp lệ");
    }
  
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      throw new BadRequestException("Số điện thoại phải là 10 chữ số");
    }

    const userExistsByEmail = await User.findOne({
      email: email,
    });
    if (userExistsByEmail) throw new ConflictException("Email đã tồn tại");

    const userExistsByPhone = await User.findOne({
      phone: phone,
    });
    if (userExistsByPhone) throw new ConflictException("Số điện thoại đã tồn tại");

    user.fullName = fullName;
    user.email = email;
    user.phone = phone;
    await user.save();

    return {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      active: user.active,
      roles: user.roles,
    };
  }

  static addNewAddressByMyInfo = async (req) => {
    const { _id } = req.user;
    const { name, detail, isDefault } = req.body;

    const user = await User.findOne({
      _id: _id,
    });

    const newAddress = user.address;

    if(isDefault){ // Nếu isDefault = true => bỏ isDefault tất cả address còn lại ủa user
      newAddress.forEach((address) => { // Thay đổi trực tiếp
        address.isDefault = false;
      });
    }
    newAddress.push({
      name: name,
      detail: detail,
      isDefault: isDefault
    })
    
    user.address = newAddress;

    await user.save();

    return {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      active: user.active,
      roles: user.roles,
      address: user.address
    };
  }

  static deleteAddressByMyInfo = async (req) => {
    const { _id } = req.user;
    const user = await User.findOne({
      _id: _id,
    });

    const { addressId } = req.params;

    const addressRemove = user.address.filter(item => item._id.toString() === addressId)[0];

    const newAddress = user.address.filter(item => item._id.toString() !== addressId);
    if(addressRemove.isDefault){ // Nếu xóa address là default => Gán default cho address đầu
      newAddress[0].isDefault = true;
    }
    console.log(addressRemove);
    console.log(newAddress);

    user.address = newAddress;
    await user.save();
  }
}

module.exports = UserService;
