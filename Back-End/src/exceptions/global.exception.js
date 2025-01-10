const StatusCode = require("../utils/httpStatusCode");

class CustomException extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

class Exception extends CustomException {
  constructor(message){
    super(message, StatusCode.INTERNAL_SERVER_ERROR)
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

class BadRequestException extends CustomException {
  constructor(message){
    super(message, StatusCode.BAD_REQUEST)
  }
}

class DeletionException extends CustomException {
  constructor(message){
    super(message, StatusCode.BAD_REQUEST)
  }
}

module.exports = {
  ResourceNotFoundException,
  Exception,
  ConflictException,
  UnauthorizedException,
  AccessDeniedException,
  BadRequestException,
  DeletionException
}