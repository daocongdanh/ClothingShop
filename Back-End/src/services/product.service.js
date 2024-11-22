const Product = require("../models/product.model");
const { ResourceNotFoundException } = require("../exceptions/global.exception");

class ProductService {
  static filterProduct = async (req) => {
    const { category, filter, sort } = req.query;
    let aggregate = [
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
    ];

    if (category !== undefined && category !== "") {
      if (category === "bo-suu-tap-moi") {
        aggregate.push({
          $match: {
            new: true,
          },
        });
      } else {
        aggregate.push({
          $match: {
            "category.slug": category,
          },
        });
      }
    }

    var params = [];
    // : -> equal
    // > -> greater than
    // < -> less than
    // ~ -> include
    var pattern = /(.*)(:|>|<|~)(.*)/;
    if (filter !== undefined && filter !== "") {
      params = filter.split(";").map((item) => {
        var arr = pattern.exec(item);
        return {
          key: arr[1],
          operation: arr[2],
          value: arr[3],
        };
      });
    }

    params.forEach((item) => {
      let key = item.key;
      let operation = item.operation;
      let value = item.value;

      if (operation === ">") {
        aggregate.push({
          $match: {
            [key]: { $gt: parseInt(value) },
          },
        });
      } else if (operation === "<") {
        aggregate.push({
          $match: {
            [key]: { $lt: parseInt(value) },
          },
        });
      } else if (operation === "~") {
        aggregate.push({
          $match: {
            [key]: { $all: value.split(",") },
          },
        });
      } else if (operation === ":") {
        aggregate.push({
          $match: {
            [key]: { $regex: value, $options: "i" },
          },
        });
      }
    });

    if (sort !== undefined && sort !== "") {
      var arr = pattern.exec(sort);
      var key = arr[1];
      var value = arr[3];

      aggregate.push({
        $sort: {
          [key]: value === "asc" ? 1 : -1,
        },
      });
    }

    var totalItem = (await Product.aggregate(aggregate)).length;

    var page = parseInt(req.query.page || 0);
    page = page > 0 ? page - 1 : page;

    var limit = parseInt(req.query.limit || 10);

    const totalPage = Math.ceil(totalItem / limit);
    const skipCount = page * limit;

    aggregate.push({
      $skip: skipCount,
    });

    aggregate.push({
      $limit: limit,
    });

    const products = await Product.aggregate(aggregate);

    const data = {
      page: page + 1,
      limit: limit,
      totalPage: totalPage,
      totalItem: totalItem,
      result: products,
    };
    return data;
  };

  static getProductBySlug = async (req) => {
    const { slug } = req.params;
    const product = await Product.findOne({
      slug: slug,
    });

    if (!product)
      throw new ResourceNotFoundException("Không tìm thấy sản phẩm");

    return product;
  };

  static getAllProductsNew = async () => {
    const products = await Product.find({
      new: true,
    }).limit(5);
    return products;
  };

  static getTop5Product = async (req) => {
    const { slug } = req.params;

    const product = await Product.findOne({
      slug: slug,
    });

    if(!product)
      throw new ResourceNotFoundException("Không tìm thấy sản phẩm");

    const products = await Product.find({
      slug: { $ne: slug },
      categoryId: product.categoryId,
    }).limit(5);

    return products;
  };
}

module.exports = ProductService;
