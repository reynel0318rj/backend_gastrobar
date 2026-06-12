const express = require('express');
const userRoutes = require('./userRoutes');
const menuRoutes = require('./menuRoutes');
const reservationRoutes = require('./reservationRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/menus', menuRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;