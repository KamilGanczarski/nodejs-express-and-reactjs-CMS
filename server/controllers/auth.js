const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const login = async (req, res) => {
  const { login, password } = req.body
  
  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }

  // Find user
  const currentUser = await User.findOne({ login: login })
    .populate({ path: 'permission' })
    .populate({ path: 'date' })

  // Check if user exists
  if (!currentUser) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  // Check password
  if (!currentUser.validPassword(password)) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  // Set user for response and session
  const resUser = {
    id: currentUser._id,
    login: currentUser.login,
    permission: currentUser.permission.value
  }

  // Session data
  req.session.userId = currentUser.id;
  req.session.login = currentUser.login;
  req.session.permission = currentUser.permission.value;

  res.status(StatusCodes.OK).json({ user: resUser })
}

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
}

const checkSession = (req, res) => {
  // If session isn't set
  if (!req.session.login) {
    throw new CustomError.BadRequestError('No logged user');
  }

  const { userId: id, login } = req.session;
  let currentUser = { id, login };
  res.status(StatusCodes.OK).send(currentUser);
}

module.exports = {
  login,
  logout,
  checkSession
}
