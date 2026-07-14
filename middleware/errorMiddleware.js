module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Handle specific Mongoose database issues cleanly
  if (err.name === 'ValidationError') {
    err.statusCode = 400;
    err.status = 'fail';
  }
  if (err.code === 11000) {
    err.statusCode = 409;
    err.status = 'fail';
    err.message = 'Duplicate key value field entered.';
  }

  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message || 'Internal Server Error'
  });
};
