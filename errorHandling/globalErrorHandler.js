const AppError = require('./appError');
exports.handleError = (err, req, res, next) => {
  if (err instanceof AppError) {
    res
      .status([400, 401, 403].includes(err.statusCode) ? err.statusCode : 400)
      .json({
        status: 'Error',
        errorCode: err.statusCode,
        error: err.message,
      });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'Validation Error',
      erroCode: 1001,
      error: err.message,
    });
  } else if (err.code === 11000) {
    res.status(400).json({
      status: 'Error',
      errorCode: 1002,
      error: 'Seat number already booked',
    });
  } else {
    res.status(500).json({
      status: 'Internal Server Error',
      errorCode: 500,
      error: err.message,
    });
  }
};
