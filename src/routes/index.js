const express = require('express');
const userRoutes = require('./userRoutes');
const menuRoutes = require('./menuRoutes');
const reservationRoutes = require('./reservationRoutes');
const { protect } = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/userController');

const router = express.Router();

router.get('/me', protect, getProfile);
router.use('/users', userRoutes);
router.use('/menus', menuRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;