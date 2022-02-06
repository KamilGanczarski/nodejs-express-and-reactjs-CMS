// Models
const User = require('../../models/User');
const Permission = require('../../models/Permission');
const Calendar = require('../../models/Calendar');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../../errors');

const { fetchAndUpdateNewDirectory } = require('./directory');

/**
 * Get user bu id
 */
const getUser = async (req, res) => {
  const { id } = req.params;

  await User.findOne({ _id: id })
    .populate({ path: 'permission' })
    .populate({ path: 'date' })
    .select('-password')
    .then((user) => {
      let resUser = Object.assign(user, {
        asd: 'sda'
        // loggedUser: user._id === req.session._id
      });

      res.status(StatusCodes.OK).send({ resUser });
    // There is no user with this id
    }).catch(function (err) {
      throw new CustomError.BadRequestError('No user found');
    });
}

/**
 * Get users by permission or no permission get all
 */
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

/**
 * Create user
 */
const createUser = async (req, res) => {
  const {
    login,
    password,
    permission,
    event,
    date,
    expiryDate
  } = req.body;

  // Check for login and password
  if (!login || !password || !permission || !event) {
    throw new CustomError.BadRequestError('Please provide all values');
  }

  // Find user with this login
  const alreadySubmitted = await User.findOne({ login: login });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already submitted review for this product'
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

  // Fetch permission
  const PermissionDB = await Permission.findOne({ value: permission });
  
  // Check permission
  if (!PermissionDB) {
    throw new CustomError.BadRequestError(
      `No permission with '${permission}' name`
    );
  }

  // Create new user
  const newUser = new User();
  newUser.login = login;
  newUser.password = newUser.generateHash(password);
  newUser.event = event;
  newUser.dir = await fetchAndUpdateNewDirectory();
  newUser.permission = PermissionDB._id;
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
    password,
    permission,
    event,
    date,
    expiryDate
  } = req.body;

  // Find the user
  const newUser = await User.findOne({ _id: userId });
  
  // If doesn't exist
  if (!newUser) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }

  // Check for password to make changes
  if (!password) {
    throw new CustomError.BadRequestError('Please provide password to make changes');
  }

  // Check for login and password
  if (!login || !password || !permission || !event) {
    throw new CustomError.BadRequestError('Please provide all values');
  }

  // Fetch permission
  const PermissionDB = await Permission.findOne({ value: permission });
  
  // Check permission
  if (!PermissionDB) {
    throw new CustomError.BadRequestError(
      `No permission with '${permission}' name`
    );
  }

  // Set new values
  newUser.login = login;
  newUser.event = event;

  // Check if password is set
  if (password) {
    newUser.password = newUser.generateHash(password);
  }

  if (req.session.userId !== newUser.id) {
    newUser.permission = PermissionDB._id;

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

  await newUser.save();

  res.status(StatusCodes.OK).send({ msg: `You've updated the user` });
}

/**
 * Delete user
 */
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

const getPermissions = async (req, res) => {
  const Permissions = await Permission.find({});
  res.status(StatusCodes.OK).send({ Permissions });
}

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getPermissions
}
