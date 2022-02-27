const jwt = require('jsonwebtoken');
const validator = require('validator');

exports.logIn = async (req) => {
  const email = req.body.emailId;
  if (validator.isEmail(email)) {
    return jwt.sign({ email }, process.env.JWT_SECRET);
  }
};
