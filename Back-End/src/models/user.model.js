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
    active: Boolean,
    roles: {
      type: [String],
      enum: ['User', 'Admin'],
    },
    address: [
      {
        name: String,
        detail: String,
        isDefault: Boolean
      }
    ],
    tokens: [
      {
        accessToken: {
          type: String,
          required: [true, "Access Token không được rỗng"],
          unique: true
        },
        refreshToken: {
          type: String,
          required: [true, "Refresh Token không được rỗng"],
          unique: true,
        },
        isMobibleDevice: Boolean
      }
    ]
  },
  {
    collection: "users",
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
