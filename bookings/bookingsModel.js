const mongoose = require('mongoose');
const bookingsSchema = new mongoose.Schema({
  seatNumber: {
    type: Number,
    unique: true,
    min: 1,
    max: 40,
    required: [true, 'Seat Number is missing'],
  },
  passengerPhone: { type: Number, required: [true, 'Phone Number is missing'] },
  passengerName: {
    type: String,
    trim: true,
    required: [true, 'Name is missing'],
  },
  passengerAge: { type: Number, required: [true, 'Age is missing'] },
});

const Bookings = mongoose.model('Bookings', bookingsSchema);
module.exports = Bookings;
