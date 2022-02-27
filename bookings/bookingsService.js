const Bookings = require('./bookingsModel');

exports.reserveSeat = async (req) => {
  const seatNumber = req.body.seatNumber;
  if (seatNumber >= 1 && seatNumber <= 40) {
    const newBooking = Bookings.create(req.body);
    return newBooking;
  }
};

exports.resetSeats = async () => {
  return Bookings.deleteMany();
};
