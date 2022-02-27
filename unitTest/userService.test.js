const { expect } = require('@jest/globals');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const userService = require('../users/userService');
const mockRequest = {
  body: {
    emailId: 'admin@createmytrip.com',
  },
};
describe('User Service test', () => {
  describe('Log in test', () => {
    test('Happy Scenario', async () => {
      jest.spyOn(jwt, 'sign').mockReturnValueOnce('token');
      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(true);
      const token = await userService.logIn(mockRequest);
      expect(token).toBe('token');
    });
    test('Invalid email Id', async () => {
      jest.spyOn(jwt, 'sign').mockReturnValueOnce('token');
      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
      const token = await userService.logIn(mockRequest);
      expect(token).toBe(undefined);
    });
  });
});
