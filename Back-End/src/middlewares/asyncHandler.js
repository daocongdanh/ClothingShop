const ResponseError = require("../responses/success.response");

const asyncHandler = (fn) => {// Tham số là 1 hàm async
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (erorr) {
      var code = erorr.code || 400;
      var message = erorr.message;
      return res.status(code).json(new ResponseError(code, message));
    }
  };
};

module.exports = asyncHandler;
