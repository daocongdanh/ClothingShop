const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, color, size} = req.body;
    const cart = await Cart.findOne({
      userId: userId
    });
    
    const product = await Product.findOne({
      _id: productId
    });

    const index = cart.items.findIndex(item => item.productId.toString() === productId);

    if(index === - 1){
      const newItem = {
        productId: productId,
        name: product.name,
        image: product.images[0],
        price: product.price,
        discountedPrice: product.discountedPrice,
        quantity: 1,
        color: color,
        size: size
      };
      cart.items.push(newItem);
    }
    else{
      cart.items[index].quantity++;
      cart.color = color;
      cart.size = size;
    }

    await cart.save();
    

    return res.status(200).json({
      code: 200,
      message: "Thêm mới sản phẩm vào giỏ hàng thành công",
      data: cart
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

const updateCart = async (req, res) => {
  try {
    const { quantity, userId } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({
      userId: userId
    });

    const index = cart.items.findIndex(item => item.productId.toString() === productId);

    if(index !== -1){
      cart.items[index].quantity = quantity;
    }

    await cart.save();

    return res.status(200).json({
      code: 200,
      message: "Cập nhật giỏ hàng thành công",
      data: cart
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

const deleteCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({
      userId: userId
    });

    const index = cart.items.findIndex(item => item.productId.toString() === productId);

    if(index !== -1){
      cart.items.pull({ productId });
    }

    await cart.save();

    return res.status(200).json({
      code: 204,
      message: "Xóa sản phẩm trong giỏ hàng thành công"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

const getCartByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({
      userId: userId
    })

    return res.status(200).json({
      code: 200,
      message: "Lấy giỏ hàng theo user thành công",
      data: cart
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  addToCart,
  updateCart,
  deleteCart,
  getCartByUser
}