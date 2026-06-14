const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');

const normalizeUsername = (value) =>
  value
    ?.toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, '');

const buildUniqueUsername = async (baseUsername) => {
  const safeBaseUsername = normalizeUsername(baseUsername) || 'usuario';
  let candidate = safeBaseUsername;
  let suffix = 1;

  while (await User.findOne({ username: candidate })) {
    candidate = `${safeBaseUsername}${suffix}`;
    suffix += 1;
  }

  return candidate;
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, username } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('El usuario ya existe');
  }

  const requestedUsername = normalizeUsername(username);

  if (requestedUsername) {
    const usernameExists = await User.findOne({ username: requestedUsername });

    if (usernameExists) {
      res.status(400);
      throw new Error('El nombre de usuario ya existe');
    }
  }

  const finalUsername = requestedUsername || (await buildUniqueUsername(email?.split('@')[0]));

  const user = await User.create({
    name,
    email,
    username: finalUsername,
    password,
    phone,
    role: 'customer'
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    username: user.username,
    role: user.role,
    token: generateToken(user._id)
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, usuario, identifier, password } = req.body;
  const normalizedLogin = normalizeUsername(username || usuario || identifier);

  const query = [];

  if (email) {
    query.push({ email: email.trim().toLowerCase() });
  }

  if (normalizedLogin) {
    query.push({ username: normalizedLogin });
  }

  const user = query.length > 0 ? await User.findOne({ $or: query }).select('+password') : null;

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      token: generateToken(user._id)
    });
    return;
  }

  res.status(401);
  throw new Error('Credenciales invalidas');
});

const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  res.json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  user.name = req.body.name ?? user.name;
  user.email = req.body.email ?? user.email;
  user.phone = req.body.phone ?? user.phone;
  user.role = req.body.role ?? user.role;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    username: updatedUser.username,
    role: updatedUser.role
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('Usuario no encontrado');
  }

  await user.deleteOne();
  res.json({ message: 'Usuario eliminado' });
});

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};