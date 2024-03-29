const jwt = require('jsonwebtoken');
const AppError = require('../errorHandling/appError');
const catchAsync = require('./../errorHandling/catchAsync');
const User = require('./../users/userModel');

let users = new Map();

exports.protect = catchAsync(async (req, res, next) => {
  let user;
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('User not logged in', 401));
  }
  const { email } = jwt.verify(token, process.env.JWT_SECRET);
  const result = users.get(email);
  if (!result) {
    console.log('Not found in cache!');
    user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('User does not exist', 401));
    }
    users.set(`${user.email}`, `${user.role}`);
  } else {
    console.log('Found in cache');
  }
  req.user = user;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('User does not have access', 403));
    }
    next();
  };
};
