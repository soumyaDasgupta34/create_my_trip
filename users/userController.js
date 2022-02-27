const userLogin = require('./userService');
const catchAsync = require('./../errorHandling/catchAsync');
const AppError = require('./../errorHandling/appError');

exports.login = catchAsync(async (req, res, next) => {
  const token = await userLogin.logIn(req);
  if (!token) {
    next(new AppError('Invalid emailId', 1000));
  } else {
    res.status(200).json({
      token,
    });
  }
});
