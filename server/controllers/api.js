// Models
const User = require('../models/User')
const Variables = require('../models/Variables')
const Permission = require('../models/Permission')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');

const getAllUsers = async (req, res) => {
  let Users = []

  // Check session
  if (!req.session.id) {
    throw new CustomError.UnauthenticatedError('Unauthenticated request')
  }

  Users = await User.find({ role: 'user' }).select('-password')
  // Users = await Permission.find({ role: 'user' })

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
    eventName,
    eventDate,
    expiryDate,
    permission
  } = req.body

  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }

  // Checking for event name and date
  if (!eventName || !eventDate) {
    throw new CustomError.BadRequestError('Please provide event name and date')
  }

  // Checking for a expiry date
  if (!expiryDate) {
    throw new CustomError.BadRequestError('Please provide expiry date')
  }

  // Checking for a permission
  if (!permission) {
    throw new CustomError.BadRequestError('Please provide permission')
  }

  // Check session
  if (!req.session.id) {
    throw new CustomError.UnauthenticatedError('Unauthenticated request')
  }

  // Fetch permission
  const PermissionDB = await Permission.findOne({ value: permission });

  // Create new object
  const newUser = new User();
  newUser.login = login;
  newUser.password = newUser.generateHash(password);
  newUser.event = eventName;
  newUser.permissionId = PermissionDB._id;
  newUser.dir = 0xfff.toString(16);

  const user = await User.create(newUser)

  res.status(StatusCodes.OK).send({ user });
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
