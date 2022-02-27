const AppError = require('../errorHandling/appError');
const bookingsController = require('../bookings/bookingsController');
const catchAsync = require('./../errorHandling/catchAsync');
const bookingsService = require('../bookings/bookingsService');
const { expect } = require('@jest/globals');

const newBookings = [
  {
    toObject: () => ({
      _id: '6219a37dd9a20e1f944b1dca',
      passengerAge: 23,
      passengerName: 'Soumya Dasgupta',
      passengerPhone: 903289882,
      seatNumber: 29,
      __v: 0,
    }),
  },
];

const mockRequest = {
  body: {
    passengerAge: '23',
    passengerName: 'Soumya Dasgupta',
    passengerPhone: '903289882',
    seatNumber: '29',
  },
};

let mockResponse;
const statusFn = jest.fn(() => mockResponse);
const jsonFn = jest.fn(() => mockResponse);

mockResponse = {
  status: statusFn,
  json: jsonFn,
};
const next = jest.fn(() => {});

describe('Booking Controller', () => {
  describe('Reserve Seat', () => {
    it('Happy Scenario', async () => {
      jest
        .spyOn(bookingsService, 'reserveSeat')
        .mockResolvedValueOnce(newBookings);
      await bookingsController.reserveSeat(mockRequest, mockResponse, next);
      expect(statusFn).toBeCalledWith(201);
      expect(jsonFn).toBeCalledWith({
        status: 'success',
        statusCode: 201,
        data: {
          booking: {
            passengerAge: 23,
            passengerName: 'Soumya Dasgupta',
            passengerPhone: 903289882,
            seatNumber: 29,
          },
        },
      });
    });
    it('Invalid Seat number', async () => {
      jest
        .spyOn(bookingsService, 'reserveSeat')
        .mockResolvedValueOnce(undefined);
      await bookingsController.reserveSeat(mockRequest, mockResponse, next);
      expect(next).toBeCalledWith(new AppError('Invalid seat number', 1003));
    });
  });
  describe('Reset Seat', () => {
    it('Happy Scenario', async () => {
      jest
        .spyOn(bookingsService, 'resetSeats')
        .mockResolvedValueOnce({ deletedCount: 2 });
      await bookingsController.resetSeats(mockRequest, mockResponse, next);
      expect(statusFn).toBeCalledWith(204);
      expect(jsonFn).toBeCalledWith({
        status: 'success',
        statusCode: 204,
        data: null,
      });
    });
    it('Error Scenario', async () => {
      jest
        .spyOn(bookingsService, 'resetSeats')
        .mockResolvedValueOnce({ deletedCount: 0 });
      await bookingsController.resetSeats(mockRequest, mockResponse, next);
      expect(next).toBeCalledWith(
        new AppError('No reservation currently exists', 1004)
      );
    });
  });
});
