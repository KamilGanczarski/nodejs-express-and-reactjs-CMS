const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');

const getAllUsers = async (req, res) => {
  let Users = []

  // Check session
  if (req.session.id) {
    Users = await User.find({ role: 'user' }).select('-password')
  }

  res.status(StatusCodes.OK).send({ Users });
}

const getSingleUserMe = (req, res) => {
  let newUser = {}

  // Get session data
  if (req.session.id) {
    const { userId: id, login } = req.session
    newUser = { id, login }
  }

  res.status(StatusCodes.OK).send(newUser);
}

const createUser = async (req, res) => {
  const {
    login,
    password,
    event_name,
    event_date,
    expiry_date,
    permission
  } = req.body

  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }

  // Checking for event name and date
  if (!event_name || !event_date) {
    throw new CustomError.BadRequestError('Please provide event name and date')
  }

  // Checking for a expiry date
  if (!expiry_date) {
    throw new CustomError.BadRequestError('Please provide expiry date')
  }

  // Checking for a permission
  if (!permission) {
    throw new CustomError.BadRequestError('Please provide permission')
  }

  // Create new object
  const newUser = new User();
  newUser.login = login;
  newUser.password = newUser.generateHash(password);
  newUser.event = event_name;

  res.status(StatusCodes.OK).send({});
}

const deleteUser = async (req, res) => {
  const { id : userId } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }

  await user.remove();
  res.status(StatusCodes.OK).send({ msg: 'Success ! Product removed.' });
}

const signup = async (req, res) => {
  const { login, password } = req.body

  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }

  const existingUser = await User.findOne({ 'login': login });

  // Check if user exists
  if (existingUser) {
    throw new CustomError.BadRequestError('That username is not available')
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
  getAllUsers,
  getSingleUserMe,
  createUser,
  deleteUser,
  signup,
}
