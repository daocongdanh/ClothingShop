const PaymentMethod = require("../models/paymentMethod.model");
const FileService = require("../services/file.service");
const {
  ResourceNotFoundException,
  ConflictException,
} = require("../exceptions/global.exception");

class PaymentMethodService {
  static createPaymentMethod = async (req) => {
    const { name, image } = req.body;

    if (name !== "" && name !== undefined) {
      const paymentMethodExists = await PaymentMethod.findOne({
        name: name,
      });
      if (paymentMethodExists)
        throw new ConflictException("Tên phương thức thanh toán đã tồn tại");
    }

    const paymentMethod = new PaymentMethod({
      name: name,
      image: image,
      status: true
    });

    return await paymentMethod.save();
  }

  static getAllPaymentMethods = async (req) => {
    const { name } = req.query;
    if(name !== undefined)
      return await PaymentMethod.find({
        name: { $regex: name, $options: "i" }
      });

    return await PaymentMethod.find();
  }
  
  static getPaymentMethodById = async (req) => {
    const { id } = req.params;

    const paymentMethod = await PaymentMethod.findOne({
      _id: id
    });

    if (!paymentMethod)
      throw new ResourceNotFoundException(
        "Không tìm thấy phương thức thanh toán theo Id: " + id
      );

    return paymentMethod;
  }

  static updatePaymentMethod = async (req) => {
    const { id } = req.params;
    const { name, image, status } = req.body;

    const paymentMethod = await PaymentMethod.findOne({
      _id: id
    });

    if (!paymentMethod)
      throw new ResourceNotFoundException(
        "Không tìm thấy phương thức thanh toán theo Id: " + id
      );
    
    paymentMethod.name = name;
    paymentMethod.status = status;

    if(image){
      FileService.deleteFile(paymentMethod.image);
      paymentMethod.image = image;
    }
    else if(image === null){
      FileService.deleteFile(paymentMethod.image);
      paymentMethod.image = null;
    }

    return await paymentMethod.save();
  }

}

module.exports = PaymentMethodService;
