const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const currentUser = (req, res) => {
  let newUser = {}

  // Get session data
  if (req.session.id) {
    const { userId: id, login } = req.session
    newUser = { id, login }
  }

  res.status(StatusCodes.OK).send(newUser);
}

const signup = async (req, res) => {
  const { login, password } = req.body

  // Check for login and password
  if (!login || !password) {
    throw new BadRequestError('Please provide login and password')
  }

  const existingUser = await User.findOne({ 'login': login });

  // Check if user exists
  if (existingUser) {
    throw new BadRequestError('That username is not available')
  }

  const newUser = new User();
  newUser.login = login;
  newUser.password = newUser.generateHash(password);

  const user = await newUser.save();

  const responseUser = {
    id: user._id,
    login: user.login
  }

  res.status(StatusCodes.OK).send(responseUser);
}

module.exports = {
  currentUser,
  signup
}
