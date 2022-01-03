const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const loginToDB = async (req, res) => {
  const { login, password } = req.body
  
  // Check for login and password
  if (!login || !password) {
    throw new BadRequestError('Please provide login and password')
  }

  // Find user
  const user = await User.findOne({ 'login': login });

  // Check if user exists
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  // Check password
  if (!user.validPassword(password)) {
    console.log('WRONG PASSWORD. ABORTING')
    throw new UnauthenticatedError('Invalid Credentials')
  }

  // Set user for response and session
  const resUser = {
    id: user._id,
    login: user.login
  }

  // Session data
  req.session.userId = resUser.id;
  req.session.login = resUser.login;

  res.status(StatusCodes.OK).json({ user: resUser })
}

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}

module.exports = {
  loginToDB,
  logout
}
