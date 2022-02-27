const { expect } = require('@jest/globals');
const bookingsService = require('./../bookings/bookingsService');
const Bookings = require('./../bookings/bookingsModel');

const req = {
  body: {
    passengerAge: '23',
    passengerName: 'Soumya Dasgupta',
    passengerPhone: '903289882',
    seatNumber: '29',
  },
};

const booking = {
  _id: '6219a37dd9a20e1f944b1dca',
  passengerAge: 23,
  passengerName: 'Soumya Dasgupta',
  passengerPhone: 903289882,
  seatNumber: 29,
  __v: 0,
};

describe('Book Service', () => {
  describe('Reserve Seat', () => {
    it('Happy Scenario. Seat number between 1 and 40', async () => {
      jest.spyOn(Bookings, 'create').mockReturnValueOnce(booking);
      expect.assertions(1);
      const data = await bookingsService.reserveSeat(req);
      expect(data).toEqual(booking);
    });
    it('Error Scenario. Seat number outside range', async () => {
      expect.assertions(1);
      req.body.seatNumber = 299;
      const data = await bookingsService.reserveSeat(req);
      expect(data).toEqual(undefined);
    });
  });
  describe('Reset Seat', () => {
    test('Delete all bookings', async () => {
      jest.spyOn(Bookings, 'deleteMany').mockReturnValueOnce({ req: 'test' });
      expect.assertions(1);
      const data = await bookingsService.resetSeats();
      expect(data).toEqual({ req: 'test' });
    });
  });
});
