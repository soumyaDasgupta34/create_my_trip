const express = require('express');
const bookingsController = require('./bookingsController');
const authService = require('./../authentication/authenticationService');

const router = express.Router();

router
  .route('/reserve')
  .post(authService.protect, bookingsController.reserveSeat);
router
  .route('/reset')
  .delete(
    authService.protect,
    authService.restrictTo('admin'),
    bookingsController.resetSeats
  );

module.exports = router;
