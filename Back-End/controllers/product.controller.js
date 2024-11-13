const Product = require("../models/product.model");

const filterProduct = async (req, res) => {
  try {
    const { category, filter, sort } = req.query;
    let aggregate = [
      {
        $lookup:{
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      }
    ];

    if(category !== undefined && category !== ""){
      if(category === 'bo-suu-tap-moi'){
        aggregate.push(
          {
            $match: {
              'new': true
            }
          }
        )
      }
      else{
        aggregate.push(
          {
            $match: {
              'category.slug': category
            }
          }
        )
      }
    }

    var params = [];
    // : -> equal
    // > -> greater than
    // < -> less than
    // ~ -> include
    var pattern = /(.*)(:|>|<|~)(.*)/;
    if(filter !== undefined && filter !== ''){
      params = filter.split(";").map(item => {
        var arr = pattern.exec(item);
        return {
          key: arr[1],
          operation: arr[2],
          value: arr[3] 
        }
      });
    }

    params.forEach(item => {
      let key = item.key;
      let operation = item.operation;
      let value = item.value;

      if(operation === '>'){
        aggregate.push(
          {
            $match: {
              [key]: { $gt: parseInt(value) }
            }
          }
        )
      }
      else if(operation === '<'){
        aggregate.push(
          {
            $match: {
              [key]: { $lt: parseInt(value) }
            }
          }
        )
      }
      else if(operation === '~'){
        aggregate.push(
          {
            $match: {
              [key]: { $all: value.split(",") }
            }
          }
        )
      }
      else if(operation === ':'){
        aggregate.push(
          {
            $match: {
              [key]: { $eq: value }
            }
          }
        )
      }
    })


    if(sort !== undefined && sort !== ''){
      var arr = pattern.exec(sort);
      var key = arr[1];
      var value = arr[3];

      aggregate.push(
        {
          $sort: {
            [key]: value === 'asc' ? 1 : -1
          }
        }
      )
    }

    var totalItem = (await Product.aggregate(aggregate)).length;

    var page = parseInt(req.query.page || 0);
    page = page > 0 ? page - 1 : page;

    var limit = parseInt(req.query.limit || 10);

    const totalPage = Math.ceil(totalItem / limit);
    const skipCount = page * limit;

    aggregate.push(
      {
        $skip: skipCount
      }
    )

    aggregate.push(
      {
        $limit: limit
      }
    )
    
    const products = await Product.aggregate(aggregate);
    return res.status(200).json({
      code: 200,
      message: "Lấy danh sách sản phẩm theo các tiêu chí thành công",
      data: {
        page: page + 1,
        limit: limit,
        totalPage: totalPage,
        totalItem: totalItem,
        result: products
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.find({
      slug: slug
    });

    return res.status(200).json({
      code: 200,
      message: "Lấy sản phẩm theo slug thành công",
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi",
      error: error.message
    });
  }
}

module.exports = {
  filterProduct,
  getProductBySlug
}