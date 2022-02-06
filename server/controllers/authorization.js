const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

const login = async (req, res) => {
  const { login, password } = req.body
  
  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }

  // Find user
  const user = await User.findOne({ login: login })
    .populate({ path: 'permission' })
    .populate({ path: 'date' })

  // Check if user exists
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  // Check password
  if (!user.validPassword(password)) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  const tokenUser = createTokenUser(user);
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
  res.status(StatusCodes.OK).json({ msg: "You're logged in" });
}

module.exports = {
  login,
  logout,
  checkValidToken
}
