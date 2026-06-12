const express = require('express');
const {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
} = require('../controllers/menuController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getMenus);
router.get('/:id', getMenuById);
router.post('/', protect, authorizeRoles('admin', 'staff'), createMenu);
router.put('/:id', protect, authorizeRoles('admin', 'staff'), updateMenu);
router.delete('/:id', protect, authorizeRoles('admin'), deleteMenu);

module.exports = router;