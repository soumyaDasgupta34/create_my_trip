const AppError = require('./appError');
exports.handleError = (err, req, res, next) => {
  if (err instanceof AppError) {
    res
      .status([400, 401, 403].includes(err.statusCode) ? err.statusCode : 400)
      .json({
        status: 'Error',
        statusCode: err.statusCode,
        error: err.message,
      });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({
      status: 'Validation Error',
      statusCode: 1001,
      error: err.message,
    });
  } else if (err.code === 11000) {
    res.status(400).json({
      status: 'Error',
      statusCode: 1002,
      error: 'Seat number already booked',
    });
  } else {
    res.status(500).json({
      status: 'Internal Server Error',
      statusCode: 500,
      error: err.message,
    });
  }
};
