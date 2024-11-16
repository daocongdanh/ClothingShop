const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Họ và tên không được rỗng"],
    },
    email: {
      type: String,
      required: [true, "Email không được rỗng"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Số điện thoại không được rỗng"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Mật khẩu không được rỗng"],
    },
    avatar: String,
    active: Boolean,
  },
  {
    collection: "users",
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
