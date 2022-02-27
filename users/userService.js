const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('./../users/userModel');
const AppError = require('./../errorHandling/appError');

exports.logIn = async (req, res, next) => {
  const email = req.body.emailId;
  if (validator.isEmail(email)) {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('User does not exist', 401));
    }
    return jwt.sign({ email }, process.env.JWT_SECRET);
  }
};
