const AppError = require('./appError');
exports.handleError = (err, req, res, next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'Error',
      error: err.message,
    });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'Validation Error',
      error: err.message,
    });
  } else if (err.code === 11000) {
    res.status(400).json({
      status: 'Error',
      error: 'Seat number already booked',
    });
  } else {
    res.status(500).json({
      status: 'Internal Server Error',
      error: err.message,
    });
  }
};
