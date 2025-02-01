const productRoutes = require("./product.route");
const categoryRoutes = require("./category.route");
const userRoutes = require("./user.route");
const cartRoutes = require("./cart.route");
const reviewRoutes = require("./review.route");
const fileRoutes = require("./file.route");
const paymentMethodRoutes = require("./paymentMethod.route");
const orderRoutes = require("./order.route");

module.exports = (app) => {
  app.use(`${process.env.API_PREFIX}/products`, productRoutes);
  app.use(`${process.env.API_PREFIX}/categories`, categoryRoutes);
  app.use(`${process.env.API_PREFIX}/users`,userRoutes);
  app.use(`${process.env.API_PREFIX}/carts`,cartRoutes);
  app.use(`${process.env.API_PREFIX}/reviews`,reviewRoutes);
  app.use(`${process.env.API_PREFIX}/files`,fileRoutes);
  app.use(`${process.env.API_PREFIX}/paymentMethods`,paymentMethodRoutes);
  app.use(`${process.env.API_PREFIX}/orders`,orderRoutes);
}