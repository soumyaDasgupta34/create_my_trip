const { expect, jest } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const { describe } = require('yargs');
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
      authenticationService.protect(
        mockRequest,
        { response: 'Response' },
        next
      );
      expect(next).toBeCalled();
    });
  });
  describe('Restrict to endpoint', () => {
    test('Happy Scenario', () => {
      mockRequest.user.role = 'admin';
    });
  });
});
