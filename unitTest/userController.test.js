const { expect } = require('@jest/globals');
const userController = require('../users/userController');
const userService = require('../users/userService');
const AppError = require('../errorHandling/appError');

let mockResponse;
const statusFn = jest.fn(() => mockResponse);
const jsonFn = jest.fn(() => mockResponse);

mockResponse = {
  status: statusFn,
  json: jsonFn,
};
const mockRequest = {
  body: {
    emailId: 'admin@createmytrip.com',
  },
};
const next = jest.fn(() => {});

describe('User Controller Test', () => {
  describe('Log in', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(userService, 'logIn').mockResolvedValue('token');
      await userController.login(
        mockRequest,
        mockResponse,
        jest.fn(() => {})
      );
      expect(statusFn).toBeCalledWith(200);
      expect(jsonFn).toBeCalledWith({ token: 'token' });
    });
    test('Invalid Email Id', async () => {
      jest.spyOn(userService, 'logIn').mockResolvedValue(undefined);
      await userController.login(mockRequest, mockResponse, next);
      expect(next).toBeCalledWith(new AppError('Invalid emailId', 1000));
    });
  });
});
