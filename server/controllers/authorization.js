const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const login = async (req, res) => {
  const { login, password } = req.body;

  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }

  // Find user
  const user = await User.findOne({ login: login })
    .populate({ path: 'role' })
    .populate({ path: 'date' });

  // Check if user exists
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  // Check password
  if (!user.validPassword(password)) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  let tokenUser = createTokenUser(user);
  // Delete role to change password after login
  if (user.changePassword) {
    delete tokenUser.role;
  }
  const token = attachCookiesToResponse({ res, user: { ...tokenUser } });
  res.status(StatusCodes.OK).json({ token: `Bearer ${token}` });
}

const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000)
  });
  res.status(StatusCodes.OK).json({ msg: "You're logged out" });
}

const checkValidToken = (req, res) => {
  res.status(StatusCodes.OK).json({ token: req.headers.authorization });
}

const changePassword = async (req, res) => {
  const { login, password } = req.body;

  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }

  // Find user
  const user = await User.findOne({ _id: req.user.userId })
    .populate({ path: 'role' })
    .populate({ path: 'date' });

  // Check if user exists
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  // Check the same password
  if (user.validPassword(password)) {
    throw new CustomError.UnauthenticatedError(
      'The same password, you should make up a new one'
    );
  }

  user.password = user.generateHash(password);
  user.changePassword = false;
  await user.save();

  const tokenUser = createTokenUser(user);
  const token = attachCookiesToResponse({ res, user: { ...tokenUser } });
  res.status(StatusCodes.OK).json({ token: `Bearer ${token}` });
}

module.exports = {
  login,
  logout,
  checkValidToken,
  changePassword
}
