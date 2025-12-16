const Booking = require('../models/Booking');

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('clientId', 'name email')
      .populate('roomId', 'roomName')
      .populate('instructorId', 'name specialty');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single booking
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('clientId', 'name email')
      .populate('roomId', 'roomName')
      .populate('instructorId', 'name specialty');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create booking
exports.createBooking = async (req, res) => {
  const booking = new Booking({
    clientId: req.body.clientId,
    roomId: req.body.roomId,
    instructorId: req.body.instructorId,
    date: req.body.date,
    time: req.body.time,
  });

  try {
    const newBooking = await booking.save();
    const populatedBooking = await Booking.findById(newBooking._id)
      .populate('clientId', 'name email')
      .populate('roomId', 'roomName')
      .populate('instructorId', 'name specialty');
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.clientId = req.body.clientId || booking.clientId;
    booking.roomId = req.body.roomId || booking.roomId;
    booking.instructorId = req.body.instructorId || booking.instructorId;
    booking.date = req.body.date || booking.date;
    booking.time = req.body.time || booking.time;

    const updatedBooking = await booking.save();
    const populatedBooking = await Booking.findById(updatedBooking._id)
      .populate('clientId', 'name email')
      .populate('roomId', 'roomName')
      .populate('instructorId', 'name specialty');
    res.json(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
