const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

/**
 * Compare date
 * @param {Date} firstDate Date object
 * @param {Date} secondDate Date object
 * @returns true if second date passed first one
 */
 const compareDates = (firstDate, secondDate) => {
  return firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)
    ? true
    : false;
}

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
  // Compare date and set changePassword for fronted
  const date = new Date;
  const expiryDateOfPassword = tokenUser.expiryDateOfPassword;
  tokenUser.changePassword = compareDates(expiryDateOfPassword, date);
  delete tokenUser.expiryDateOfPassword;

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
  // Set date now + 60days
  var months = new Date();
  months.setDate(months.getDate() + 60);
  user.expiryDateOfPassword = months;
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
