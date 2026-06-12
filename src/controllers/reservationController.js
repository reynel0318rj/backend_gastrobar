const Reservation = require('../models/Reservation');
const asyncHandler = require('../utils/asyncHandler');

const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({}).populate('user', 'name email role');
  res.json(reservations);
});

const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id).populate('user', 'name email role');

  if (!reservation) {
    res.status(404);
    throw new Error('Reserva no encontrada');
  }

  res.json(reservation);
});

const createReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.create({
    user: req.user._id,
    reservationDate: req.body.reservationDate,
    guests: req.body.guests,
    contactPhone: req.body.contactPhone,
    notes: req.body.notes,
    status: req.body.status
  });

  res.status(201).json(reservation);
});

const updateReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    res.status(404);
    throw new Error('Reserva no encontrada');
  }

  const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json(updatedReservation);
});

const deleteReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) {
    res.status(404);
    throw new Error('Reserva no encontrada');
  }

  await reservation.deleteOne();
  res.json({ message: 'Reserva eliminada' });
});

module.exports = {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
};