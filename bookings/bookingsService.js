const Bookings = require('./bookingsModel');

exports.reserveSeat = async (req) => {
  const seatNumber = req.body.seatNumber;
  let session;
  if (seatNumber >= 1 && seatNumber <= 40) {
    try {
      session = await Bookings.db.startSession();
      session.startTransaction();
      const newBooking = Bookings.create([req.body], { session });
      session.commitTransaction();
      return newBooking;
    } catch (error) {
      console.log(error);
    } finally {
      session.endSession();
    }
  }
};

exports.resetSeats = async () => {
  return Bookings.deleteMany();
};
