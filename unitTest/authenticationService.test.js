const { expect } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const AppError = require('../errorHandling/appError');
const authenticationService = require('../authentication/authenticationService');
const catchAsync = require('../errorHandling/catchAsync');
const User = require('../users/userModel');

const mockRequest = {
  body: {
    passengerAge: '23',
    passengerName: 'Soumya Dasgupta',
    passengerPhone: '903289882',
    seatNumber: '29',
  },
  headers: { authorization: 'Bearer Jwtsfsafsa' },
};
describe('Authentication Service Test', () => {
  describe('Protect endpoint', () => {
    const next = jest.fn(() => {
      mockRequest;
    });
    test('Happy Scenario', async () => {
      jest.spyOn(jwt, 'verify').mockReturnValueOnce({ email: 'user' });
      jest.spyOn(User, 'findOne').mockResolvedValueOnce({ user: 'user' });
      await authenticationService.protect(
        mockRequest,
        { response: 'Response' },
        next
      );
      expect(next).toBeCalled();
    });
    test('User not logged in', async () => {
      mockRequest.headers.authorization = 'toekn';
      await authenticationService.protect(
        mockRequest,
        { response: 'Response' },
        next
      );
      expect(next).toBeCalledWith(new AppError('User not logged in', 401));
    });
    test('User does not exist', async () => {
      mockRequest.headers.authorization = 'Bearer Jwtsfsafsa';
      jest.spyOn(jwt, 'verify').mockReturnValueOnce({ email: 'user' });
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);
      await authenticationService.protect(
        mockRequest,
        { response: 'Response' },
        next
      );
      expect(next).toBeCalledWith(new AppError('User does not exist', 401));
    });
  });
  describe('Restrict to endpoint', () => {
    const next = jest.fn(() => {
      mockRequest;
    });
    test('Happy Scenario', () => {
      mockRequest.user.role = 'admin';
      authenticationService.restrictTo('admin')(
        mockRequest,
        { response: 'Response' },
        next
      );
      expect(next).toBeCalled();
    });
  });
});
