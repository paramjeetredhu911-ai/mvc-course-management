class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Marks errors as predictable operational events

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
