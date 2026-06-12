const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    reservationDate: {
      type: Date,
      required: [true, 'La fecha de reserva es obligatoria']
    },
    guests: {
      type: Number,
      required: [true, 'El numero de invitados es obligatorio'],
      min: 1
    },
    contactPhone: {
      type: String,
      required: [true, 'El telefono de contacto es obligatorio'],
      trim: true
    },
    notes: {
      type: String,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);