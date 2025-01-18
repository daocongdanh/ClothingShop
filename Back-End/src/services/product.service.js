const Product = require("../models/product.model");
const Category = require("../models/cart.model");
const FileService = require("../services/file.service");
const { ResourceNotFoundException, ConflictException } = require("../exceptions/global.exception");
const createSlug = require("../utils/slugUtil");

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

  static getAllProducts = async () => {
    return await Product.find().populate('categoryId');
  };

  static createProduct = async (req) => {
    const { name, description, price, discountedPrice, quantity, colors, sizes, categoryId, images } = req.body;

    if (name !== "" && name !== undefined) {
      const productExists = await Product.findOne({
        name: name,
      });
      if (productExists)
        throw new ConflictException("Tên sản phẩm đã tồn tại");
    }

    const categoryExists = await Category.findOne({
      _id: categoryId,
    });
    if (categoryExists)
      throw new ConflictException("Không tìm thấy danh mục sản phẩm");

    const slug = createSlug(name);

    const product = new Product({
      name: name,
      slug: slug,
      description: description,
      price: price,
      discountedPrice: discountedPrice,
      quantity: quantity,
      colors: colors,
      new: false,
      status: true,
      sizes: sizes,
      categoryId: categoryId,
      images: images
    });

    return await product.save();
  }

  static getProductById = async (req) =>{
    const { id } = req.params;

    const product = await Product.findOne({
      _id: id,
    }).populate('categoryId');

    if (!product)
      throw new ResourceNotFoundException(
        "Không tìm thấy sản phẩm theo Id: " + id
      );
      
    return product;
  }

  static deleteImageProduct = async (req) => {
    const { id } = req.params;
    var { image } = req.query;
    var check = 0;

    const product = await Product.findOne({
      _id: id,
    });

    if (!product)
      throw new ResourceNotFoundException(
        "Không tìm thấy sản phẩm theo Id: " + id
      );

    if(!image.startsWith("https")){
      const newImage = image.split("/").pop();
      image = newImage;
      check = 1;
    };

    const images = product.images.filter(item => item !== image);

    if(images.length === product.images.length)
      throw new ResourceNotFoundException(
        "Không tìm thấy ảnh: " + image
      );
      
    if(check === 1){
      FileService.deleteFile(image);
    }

    product.images = images;

    await product.save();

    return product;
  }

  static addImageToProduct = async (req) => {
    const { id } = req.params;
    const { image } = req.body;

    const product = await Product.findOne({
      _id: id,
    });

    if (!product)
      throw new ResourceNotFoundException(
        "Không tìm thấy sản phẩm theo Id: " + id
      );

    product.images.push(image);

    await product.save();
    return product;
  }

  static updateProduct = async (req) => {
    const { id } = req.params;
    const { name, description, price, discountedPrice, quantity, colors, sizes, categoryId, status } = req.body;

    const product = await Product.findOne({
      _id: id,
    }).populate('categoryId');

    if (!product)
      throw new ResourceNotFoundException(
        "Không tìm thấy sản phẩm theo Id: " + id
      );
    
    if(product.name !== name){
      const productExists = await Product.findOne({
        name: name,
      });
      if(productExists){
        throw new ConflictException("Tên sản phẩm đã tồn tại");
      }
    }

    const categoryExists = await Category.findOne({
      _id: categoryId,
    });
    if (categoryExists)
      throw new ConflictException("Không tìm thấy danh mục sản phẩm");

    const slug = createSlug(name);

    product.name = name;
    product.slug = slug;
    product.description = description;
    product.price = price;
    product.discountedPrice = discountedPrice;
    product.quantity = quantity;
    product.colors = colors;
    product.status = status;
    product.sizes = sizes;
    product.categoryId = categoryId;

    await product.save();
    return product;
  }

  static getProductsByCategory = async (req) => {
    const { categoryId } = req.params;

    const categoryExists = await Category.findOne({
      _id: categoryId,
    });
    if (categoryExists)
      throw new ConflictException("Không tìm thấy danh mục sản phẩm");

    const product = await Product.find({
      categoryId: categoryId
    }).populate('categoryId');

    return product;
  }
  
}

module.exports = ProductService;
