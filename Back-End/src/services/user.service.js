const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const {
  ConflictException,
  UnauthorizedException
} = require("../exceptions/global.exception");

class UserService {
  static register = async (req) => {
    const { fullName, email, phone, password } = req.body;

    if (email !== "" && email !== undefined) {
      const userExists = User.findOne({
        email: email,
      });
      if (userExists)
        throw new ConflictException("Email đã tồn tại");
    }

    if (phone !== "" && phone !== undefined) {
      const userExists = User.findOne({
        phone: phone,
      });
      if (userExists)
        throw new ConflictException("Số điện thoại đã tồn tại");
    }

    const newUser = new User({
      fullName: fullName,
      email: email,
      phone: phone,
      password: password,
      avatar: null,
      active: true,
    });

    await newUser.save();

    const newCart = new Cart({
      userId: newUser._id,
      items: [],
    });

    await newCart.save();

    return newUser;
  };

  static login = async (req) => {
    const { phone, password } = req.body;

    const user = await User.findOne({
      phone: phone,
      password: password,
    });

    if (!user) 
      throw new UnauthorizedException("Tài khoản hoặc mật khẩu sai");
    
    return user;
  };
}

module.exports = UserService;
