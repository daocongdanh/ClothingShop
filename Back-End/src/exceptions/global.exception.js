const StatusCode = require("../utils/httpStatusCode");

class CustomException extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ResourceNotFoundException extends CustomException {
  constructor(message){
    super(message, StatusCode.NOT_FOUND)
  }
}

class ConflictException extends CustomException {
  constructor(message){
    super(message, StatusCode.CONFLICT)
  }
}

class UnauthorizedException extends CustomException {
  constructor(message){
    super(message, StatusCode.UNAUTHORIZED)
  }
}

class AccessDeniedException extends CustomException {
  constructor(message){
    super(message, StatusCode.FORBIDDEN)
  }
}

module.exports = {
  ResourceNotFoundException,
  ConflictException,
  UnauthorizedException,
  AccessDeniedException
}