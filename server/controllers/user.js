// Models
const User = require('../models/User');
const Role = require('../models/Role');
const Calendar = require('../models/Calendar');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const { fetchAndUpdateNewDirectory } = require('./api/directory');
const { permissionByRole } = require('./api/permission');

/**
 * Get user by id
 */
const getUser = async (req, res) => {
  const { id } = req.params;
  CustomError.requireProvidedValues(id);

  await User.findOne({ _id: id })
    .populate({ path: 'role' })
    .populate({ path: 'date' })
    .select('-password')
    .then((user) => {
      res.status(StatusCodes.OK).send({ user });
    // There is no user with this id
    }).catch(function (err) {
      throw new CustomError.BadRequestError('No user found');
    });
}

/**
 * Get users by rol or without it get all
 */
const getAllUsers = async (req, res) => {
  const { role } = req.query;

  await User.find({})
    .populate({ path: 'role' })
    .populate({ path: 'date' })
    .select('-password')
    .exec((err, users) => {
      if (role) {
        users = users.filter((user) => user.role.value === role);
      }
      res.status(StatusCodes.OK).send({ users });
    });
}

/**
 * Create user
 */
const createUser = async (req, res) => {
  const {
    login,
    password,
    role,
    event,
    date,
    expiryDate
  } = req.body;
  CustomError.requireProvidedValues(login, password, role, event);

  // Find user with this login
  const alreadySubmitted = await User.findOne({ login: login });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already created user with this username'
    );
  }

  // Create new date
  const newDate = new Calendar();
  newDate.date = date ? date : '';
  newDate.expiryDate = expiryDate ? expiryDate : '';
  newDate.contract = false;
  newDate.pdf = '';
  newDate.price = '';
  newDate.advance = '';
  newDate.howMuchPaid = '';

  // Create date
  const CalendarDB = await Calendar.create(newDate);

  // Fetch role
  const roleRecord = await Role.findOne({ value: role });
  
  // Check role
  if (!roleRecord) {
    throw new CustomError.BadRequestError(
      `No role with '${role}' name`
    );
  }

  // Create new user
  const newUser = new User();
  newUser.login = login;
  newUser.password = newUser.generateHash(password);
  newUser.event = event;
  newUser.changePassword = true;
  newUser.dir = await fetchAndUpdateNewDirectory();
  newUser.role = roleRecord._id;
  newUser.permission = permissionByRole(role);
  newUser.date = CalendarDB._id;

  await User.create(newUser);

  res.status(StatusCodes.OK).send({ newUser });
}

/**
 * Update user
 */
const updateUser = async (req, res) => {
  const {
    userId,
    login,
    event,
    changePassword,
    password,
    newPassword,
    role,
    date,
    expiryDate
  } = req.body;
  CustomError.requireProvidedValues(userId);

  // Check for password to make changes
  if (!password) {
    throw new CustomError.BadRequestError(
      'Please provide password to make changes'
    );
  }

  // Find the user
  const newUser = await User.findOne({ _id: userId });
  
  // If doesn't exist
  if (!newUser) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }

  // Set new values
  if (login) {
    newUser.login = login;
  }

  if (event) {
    newUser.event = event;
  }

  if (changePassword) {
    newUser.changePassword = changePassword;
  }

  // Check if password is set
  if (newPassword) {
    newUser.password = newUser.generateHash(newPassword);
  }

  if (req.user.userId !== newUser.id) {
    // Update role
    if (role) {
      // Fetch role
      const roleRecord = await Role.findOne({ value: role });
      
      // Check role
      if (!roleRecord) {
        throw new CustomError.BadRequestError(`No role with '${role}' name`);
      }
      newUser.role = roleRecord._id;
    }

    // Update calendar
    if (date || expiryDate) {
      // Fetch calendar
      const newCalendar = await Calendar.findOne({ _id: newUser.date });

      // Check calendar
      if (!newCalendar) {
        throw new CustomError.BadRequestError(`No connection to calendar`);
      }
    
      // Set new values
      newCalendar.date = date ? date : '';
      newCalendar.expiryDate = expiryDate ? expiryDate : '';
      await newCalendar.save();
    }
  }

  await newUser.save();
  res.status(StatusCodes.OK).send({ msg: `You've updated the user` });
}

/**
 * Delete user
 */
const deleteUser = async (req, res) => {
  const { id } = req.body;
  CustomError.requireProvidedValues(id);

  // Find the user
  const user = await User.findOne({ _id: id });

  // If doesn't exist
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${id}`);
  }

  // Remove
  await user.remove();
  res.status(StatusCodes.OK).send({ msg: 'Success ! User removed.' });
}

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
}
