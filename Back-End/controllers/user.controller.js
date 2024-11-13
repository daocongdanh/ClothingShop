const User = require("../models/user.model");
const Cart = require("../models/cart.model");

const register = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    const newUser = new User({
      fullName: fullName,
      email: email,
      phone: phone,
      password: password,
      avatar: null,
      active: true
    });

    await newUser.save();

    const newCart = new Cart({
      userId: newUser._id,
      items: []
    });

    await newCart.save();

    return res.status(201).json({
      code: 201,
      message: "Thêm mới tài khoản thành công",
      data: newUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({
      phone: phone,
      password: password
    });

    if(user === null){
      return res.status(401).json({
        code: 401,
        message: "Tài khoản hoặc mật khẩu sai",
      });
    }

    return res.status(200).json({
      code: 200,
      message: "Đăng nhập thành công",
      data: user
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  

}
module.exports = {
  register,
  login
}