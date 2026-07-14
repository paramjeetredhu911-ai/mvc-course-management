const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  // Triggers an AppError instances configuration
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};
