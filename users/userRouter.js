const express = require('express');
const userController = require('./userController');

const router = express.Router();

router.route('').post(userController.login);

module.exports = router;
