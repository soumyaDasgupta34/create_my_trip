const { expect } = require('@jest/globals');
const catchAsync = require('../errorHandling/catchAsync');

describe('Catch Async', () => {
  test('Happy Scenario', () => {
    const testFn = jest.fn(async () => {});
    const mockRequest = {};
    const mockResponse = {};
    const nextFn = jest.fn();
    const fn = catchAsync(testFn)(mockRequest, mockResponse, nextFn);
    expect(testFn).toBeCalledWith(mockRequest, mockResponse, nextFn);
  });
  test('Error Scenario', async () => {
    const err = new Error();
    const testFn = jest.fn(async () => {
      throw err;
    });
    const mockRequest = {};
    const mockResponse = {};
    const nextFn = jest.fn();
    const fn = await catchAsync(testFn)(mockRequest, mockResponse, nextFn);
    expect(testFn).toBeCalledWith(mockRequest, mockResponse, nextFn);
    expect(nextFn).toBeCalledWith(err);
  });
});
