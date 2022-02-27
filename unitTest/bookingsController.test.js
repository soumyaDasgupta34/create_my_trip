const AppError = require('../errorHandling/appError');
const bookingsController = require('../bookings/bookingsController');
const catchAsync = require('./../errorHandling/catchAsync');
const bookingsService = require('../bookings/bookingsService');
const { expect } = require('@jest/globals');

const req = {
  body: {
    passengerAge: '23',
    passengerName: 'Soumya Dasgupta',
    passengerPhone: '903289882',
    seatNumber: '29',
  },
};

const bookings = {
  _id: '6219a37dd9a20e1f944b1dca',
  passengerAge: 23,
  passengerName: 'Soumya Dasgupta',
  passengerPhone: 903289882,
  seatNumber: 29,
  __v: 0,
};

// const mockRequest = () => {
//   return {
//     body: {
//       passengerAge: '23',
//       passengerName: 'Soumya Dasgupta',
//       passengerPhone: '903289882',
//       seatNumber: '29',
//     },
//   };
// };

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

describe('Booking Controller', () => {
  describe('Reserve Seat', () => {
    it('Happy Scenario', async () => {
      const booking = jest
        .spyOn(bookingsService, 'reserveSeat')
        .mockResolvedValueOnce(bookings);
      await bookingsController.reserveSeat(
        mockRequest,
        mockResponse,
        jest.fn(() => {})
      );
      expect(statusFn).toBeCalledWith(201);
      expect(jsonFn).toBeCalledWith({
        status: 'success',
        data: {
          booking,
        },
      });
    });
  });
});
