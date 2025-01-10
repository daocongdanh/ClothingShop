const PaymentMethod = require("../models/paymentMethod.model");

class PaymentMethodService {
  static createPaymentMethod = async (req) => {
    const { name, image } = req.body;

    const paymentMethod = new PaymentMethod({
      name: name,
      image: image,
      status: true
    });

    return await paymentMethod.save();
  }

  static getAllPaymentMethods = async () => {
    return await PaymentMethod.find();
  }
  
  static getPaymentMethodById = async (req) => {
    const { id } = req.params;

    const paymentMethod = await PaymentMethod.findOne({
      _id: id
    });

    return paymentMethod;
  }
}

module.exports = PaymentMethodService;
