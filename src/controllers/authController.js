// src/controllers/authController.js
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

// القيم الثابتة
const FIXED_EMAIL = 'Info@visualart-iraq.com';
const FIXED_PASSWORD = 'Alfarabi@$25Visualart@iraq';
const FIXED_NAME = 'Admin';
const FIXED_ROLE = 'admin';
const JWT_SECRET = 'mysecretkey';

// دالة لتوليد التوكن
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

// REGISTER
const register = asyncHandler(async (req, res) => {
  res.status(201).json({
    _id: '1',
    name: FIXED_NAME,
    email: FIXED_EMAIL,
    role: FIXED_ROLE,
    token: generateToken('1'),
  });
});

// LOGIN
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
    return res.json({
      _id: '1',
      name: FIXED_NAME,
      email: FIXED_EMAIL,
      role: FIXED_ROLE,
      token: generateToken('1'),
    });
  }

  res.status(401);
  throw new Error('Invalid credentials');
});

// ME
const me = asyncHandler(async (req, res) => {
  res.json({
    _id: '1',
    name: FIXED_NAME,
    email: FIXED_EMAIL,
    role: FIXED_ROLE,
  });
});

// صدّرهم كلهم بشكل صحيح
export { register, login, me };
