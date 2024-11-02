const Product = require("../models/product.model");

const getAllProducts = async (req, res) => {
  try {
    res.status(200).json({
      code: 200,
      message: "ok"
    });
  } catch (error) {
    res.status(500).json("Lỗi");
  }
}

module.exports = {
  getAllProducts
}