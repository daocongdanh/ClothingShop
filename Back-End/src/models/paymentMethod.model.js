const { model, Schema } = require("mongoose");

const paymentMethodSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Tên phương thức thanh toán không được rỗng"],
    },
    image: String,
    status: Boolean
  }
);

const PaymentMethod = model("PaymentMethod", paymentMethodSchema);
module.exports = PaymentMethod;