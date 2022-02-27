const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require('./users/userRouter');
const bookingsRouter = require('./bookings/bookingsRouter');
const globalErrorHandler = require('./errorHandling/globalErrorHandler');
const AppError = require('./errorHandling/appError');

app.use(cors());
app.use(express.json());

app.use('/login', userRouter);
app.use('/seat', bookingsRouter);
app.use('/coverage', express.static('./coverage/lcov-report'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler.handleError);

module.exports = app;
