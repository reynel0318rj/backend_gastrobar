const Menu = require('../models/Menu');
const asyncHandler = require('../utils/asyncHandler');

const getMenus = asyncHandler(async (req, res) => {
  const menus = await Menu.find({});
  res.json(menus);
});

const getMenuById = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    res.status(404);
    throw new Error('Menu no encontrado');
  }

  res.json(menu);
});

const createMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.create(req.body);
  res.status(201).json(menu);
});

const updateMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    res.status(404);
    throw new Error('Menu no encontrado');
  }

  const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json(updatedMenu);
});

const deleteMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (!menu) {
    res.status(404);
    throw new Error('Menu no encontrado');
  }

  await menu.deleteOne();
  res.json({ message: 'Menu eliminado' });
});

module.exports = {
  getMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
};