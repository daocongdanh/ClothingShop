const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: String,
      city: String,
      country: String,
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
