const { expect } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const userService = require('../users/userService');
const User = require('../users/userModel');
const AppError = require('../errorHandling/appError');

const mockRequest = {
  body: {
    emailId: 'admin@createmytrip.com',
  },
};
const next = jest.fn(() => {});

describe('User Service test', () => {
  describe('Log in test', () => {
    afterAll(() => {
      jest.clearAllMocks();
    });
    test('Happy Scenario', async () => {
      jest.spyOn(jwt, 'sign').mockReturnValueOnce('token');
      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true);
      jest.spyOn(User, 'findOne').mockResolvedValueOnce('token');
      const token = await userService.logIn(mockRequest, {}, next);
      expect(token).toBe('token');
    });
    test('Invalid email Id', async () => {
      jest.spyOn(jwt, 'sign').mockReturnValueOnce('token');
      jest.spyOn(User, 'findOne').mockResolvedValueOnce('token');
      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
      const token = await userService.logIn(mockRequest, {}, next);
      expect(token).toBe(undefined);
    });
    test('User does not exist', async () => {
      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true);
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(undefined);
      const token = await userService.logIn(mockRequest, {}, next);
      expect(next).toBeCalledWith(new AppError('User does not exist', 401));
    });
  });
});
