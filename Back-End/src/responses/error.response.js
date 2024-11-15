class ResponseError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  send(res, headers = {}) {
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    
    return res.status(this.status).json(this);
  }
}

module.exports = ResponseError;