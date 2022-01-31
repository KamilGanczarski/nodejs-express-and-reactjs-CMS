// Models
const User = require('../models/User');
const Permission = require('../models/Permission');
const Calendar = require('../models/Calendar');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const { fetchAndUpdateNewDirectory } = require('./api/directory');

const getUser = async (req, res) => {
  const { id } = req.params;

  await User.findOne({ _id: id })
    .populate({ path: 'permission' })
    .populate({ path: 'date' })
    .select('-password')
    .then((user) => {
      res.status(StatusCodes.OK).send({ user });
    // There is no user with this id
    }).catch(function (err) {
      throw new CustomError.BadRequestError('No user found');
    });
}

const getAllUsers = async (req, res) => {
  const { permission } = req.params;

  if (permission) {
    await User.find({ role: 'user' })
      .populate({ path: 'permission' })
      .populate({ path: 'date' })
      .select('-password')
      .exec((err, users) => {
        users = users.filter((user) => user.permission.value === permission);
        res.status(StatusCodes.OK).send({ users });
      })
  } else {
    let Users = await User.find({ role: 'user' })
      .populate({ path: 'permission' })
      .populate({ path: 'date' })
      .select('-password');
  
    res.status(StatusCodes.OK).send({ Users });
  }
}

const createUser = async (req, res) => {
  const {
    login,
    password,
    eventName,
    eventDate,
    expiryDate,
    permission
  } = req.body;

  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password');
  }

  // Checking for a permission
  if (!permission) {
    throw new CustomError.BadRequestError('Please provide permission');
  }

  // Find user with this login
  const alreadySubmitted = await User.findOne({ login: login });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already submitted review for this product'
    );
  }

  // Checking for event name and date
  if (!eventName || !eventDate) {
    throw new CustomError.BadRequestError('Please provide event name or date');
  }

  // Checking for a expiry date
  if (!expiryDate) {
    throw new CustomError.BadRequestError('Please provide expiry date');
  }

  // Create new date
  const newDate = new Calendar();
  newDate.date = eventDate;
  newDate.expiryDate = expiryDate;
  newDate.contract = false;
  newDate.pdf = '';
  newDate.price = '';
  newDate.advance = '';
  newDate.howMuchPaid = '';

  // Create date
  const CalendarDB = await Calendar.create(newDate);

  // Fetch permission
  const PermissionDB = await Permission.findOne({ value: permission });

  // Create new user
  const newUser = new User();
  newUser.login = login;
  newUser.password = newUser.generateHash(password);
  newUser.event = eventName;
  newUser.dir = await fetchAndUpdateNewDirectory();
  newUser.permission = PermissionDB._id;
  newUser.date = CalendarDB._id;

  await User.create(newUser);

  res.status(StatusCodes.OK).send({ newUser });
}

const updateUser = async (req, res) => {
  const { userId } = req.body;
  res.status(StatusCodes.OK).send({ msg: `You've updated the user` });
}

const deleteUser = async (req, res) => {
  const { userId } = req.body;

  // Find the user
  const user = await User.findOne({ _id: userId });

  // If doesn't exist
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }

  // Remove
  await user.remove();
  res.status(StatusCodes.OK).send({ msg: 'Success ! Product removed.' });
}

const signup = async (req, res) => {
  const { login, password } = req.body

  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password');
  }

  const existingUser = await User.findOne({ 'login': login });

  // Check if user exists
  if (existingUser) {
    throw new CustomError.BadRequestError('That username is not available');
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
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  signup
}
