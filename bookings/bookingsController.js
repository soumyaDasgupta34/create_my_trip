const bookingsService = require('./bookingsService');
const catchAsync = require('./../errorHandling/catchAsync');
const AppError = require('../errorHandling/appError');

exports.reserveSeat = catchAsync(async (req, res, next) => {
  const newBooking = await bookingsService.reserveSeat(req);
  if (!newBooking) {
    next(new AppError('Invalid seat number', 1003));
  } else {
    const { _id, __v, ...result } = newBooking._doc;
    res.status(201).json({
      status: 'success',
      statusCode: 201,
      data: {
        booking: result,
      },
    });
  }
});

exports.resetSeats = catchAsync(async (req, res, next) => {
  const { deletedCount } = await bookingsService.resetSeats();
  if (deletedCount > 0) {
    res.status(204).json({
      status: 'success',
      statusCode: 204,
      data: null,
    });
  } else {
    next(new AppError('No reservation currently exists', 1004));
  }
});
