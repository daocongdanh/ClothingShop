const querystring = require("qs");
const crypto = require("crypto");
const Order = require("../models/order.model");
const User = require("../models/user.model");
const Cart = require("../models/cart.model");
const PaymentMethod = require("../models/paymentMethod.model");
const { OrderStatus } = require("../constants/index");

const { getVNPayConfig, sortObject } = require("../configurations/vnpayConfig");

const { ResourceNotFoundException, BadRequestException } = require("../exceptions/global.exception");

class OrderService {
  static createOrder = async (req) => {
    const { _id } = req.user;
    const { address, totalAmount, fee, paymentMethodId } = req.body;

    const user = await User.findOne({
      _id: _id,
    });
    if (!user)
      throw new ResourceNotFoundException(
        "Không tìm thấy user theo Id = " + _id
      );

    const cart = await Cart.findOne({
      userId: _id,
    });
    if (!cart)
      throw new ResourceNotFoundException("Không tìm thấy giỏ hàng theo user");

    if(cart.items.length === 0)
      throw new BadRequestException("Giỏ hàng trống");

    const paymentMethod = await PaymentMethod.findOne({
      _id: paymentMethodId,
    });

    if (!paymentMethod)
      throw new ResourceNotFoundException(
        "Không tìm thấy phương thức thanh toán theo Id: " + paymentMethodId
      );

    if (paymentMethod.name === "VNPAY") {
      var vnp_Params = getVNPayConfig(req);
      vnp_Params["vnp_ReturnUrl"] = process.env.VNPAY_RETURN_URL + `?address=${address}&fee=${fee}&payment=${paymentMethodId}&user=${_id}`;
      vnp_Params["vnp_Amount"] = totalAmount * 100;
      vnp_Params["vnp_BankCode"] = "NCB";
      vnp_Params = sortObject(vnp_Params);

      var signData = querystring.stringify(vnp_Params, { encode: false });
      var hmac = crypto.createHmac("sha512", process.env.VNPAY_SECRET_KEY);
      var signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;

      return process.env.VNPAY_URL + "?" + querystring.stringify(vnp_Params, { encode: false });
    } else {
      const order = new Order({
        userId: _id,
        items: cart.items,
        address: address,
        totalAmount: totalAmount,
        fee: fee,
        paymentMethod: paymentMethodId,
        orderStatus: OrderStatus.PENDING,
        orderDate: new Date()
      })
      await order.save();

      cart.items = [];
      await cart.save();

      return order;
    }
  };

  static vnpayCallBack = async (req, res) => {
    const { address, fee, payment, user, vnp_Amount, vnp_TransactionStatus} = req.query;

    if(vnp_TransactionStatus === '00'){
      const cart = await Cart.findOne({
        userId: user,
      });

      const order = new Order({
        userId: user,
        items: cart.items,
        address: address,
        totalAmount: parseInt(vnp_Amount) / 100,
        fee: fee,
        paymentMethod: payment,
        orderStatus: OrderStatus.PENDING,
        orderDate: new Date()
      });
      await order.save();

      cart.items = [];
      await cart.save();
    }

    return res.redirect(`http://localhost:3000/payment-status/${vnp_TransactionStatus}`);
  }
}

module.exports = OrderService;
