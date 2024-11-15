class ResponseSuccess {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  send(res, headers = {}) {
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const response = {
      code: this.code,  
      message: this.message,
    };

    if (this.data !== null && this.data !== undefined) {
      response.data = this.data;
    }

    return res.status(this.code).json(response);
  }
}

module.exports = ResponseSuccess;
