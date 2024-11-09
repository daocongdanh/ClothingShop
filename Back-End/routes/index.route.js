const productRoutes = require("./product.route");
const categoryRoutes = require("./category.route");

module.exports = (app) => {
  app.use(`${process.env.API_PREFIX}/products`, productRoutes);
  app.use(`${process.env.API_PREFIX}/categories`, categoryRoutes);
}