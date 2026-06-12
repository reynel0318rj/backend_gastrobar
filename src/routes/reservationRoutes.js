const express = require('express');
const {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
} = require('../controllers/reservationController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, authorizeRoles('admin', 'staff'), getReservations);
router.get('/:id', protect, getReservationById);
router.post('/', protect, createReservation);
router.put('/:id', protect, authorizeRoles('admin', 'staff'), updateReservation);
router.delete('/:id', protect, authorizeRoles('admin', 'staff'), deleteReservation);

module.exports = router;