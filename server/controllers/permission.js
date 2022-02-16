// Models
const Permission = require('../models/Permission');
const User = require('../models/User');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { attachCookiesToResponse, createTokenUser } = require('../utils');
const {
  fetchPermissionValue,
  checkPermission
} = require('./api/permission');

const getAllPermissions = async (req, res) => {
  const permissions = await Permission.find({});
  res.status(StatusCodes.OK).send({ permissions });
}

const updatePermission = async (req, res) => {
  const { name, value, deleteValue, description } = req.body;
  CustomError.requireProvidedValues(name, value, deleteValue, description);

  // Create new permission
  const newPermission = new Permission();
  newPermission.name = name;
  newPermission.value = value;
  newPermission.deleteValue = deleteValue;
  newPermission.description = description;

  // Create permission in mongodb
  await Permission.create(newPermission);

  res.status(StatusCodes.OK).send({ msg: "You've added new permission" });
}

const managePermissionToUser = async (req, res) => {
  const {
    userId,
    addPermission,
    deletePermission
  } = req.body;
  CustomError.requireProvidedValues(userId);

  // Find the user
  const user = await User.findOne({ _id: userId });
  
  // If doesn't exist
  if (!user) {
    throw new CustomError.BadRequestError(`No user with id: ${userId}`);
  }

  // Add permission
  for await (const element of addPermission) {
    if (!await checkPermission(user, element)) {
      let value =  await fetchPermissionValue(element);
      user.permission = user.permission | value;
    }
  }

  // Delete permission
  for await (const element of deletePermission) {
    if (await checkPermission(user, element)) {
      let value =  await fetchPermissionValue(element, 'deleteValue');
      user.permission = user.permission & (~value);
    }
  }

  await user.save();

  const tokenUser = createTokenUser(user);
  const token = attachCookiesToResponse({ res, user: { ...tokenUser } });
  res.status(StatusCodes.OK).json({ token: `Bearer ${token}` });
}

const deletePermission = async (req, res) => {
  const { id } = req.body;
  CustomError.requireProvidedValues(id);

  // Find the permission
  const permission = await Permission.findOne({ _id: id });

  // If doesn't exist
  if (!permission) {
    throw new CustomError.NotFoundError(`No permission with id: ${id}`);
  }

  await permission.remove();
  res.status(StatusCodes.OK).send({ msg: "You've deleted this permission" });
}

module.exports = {
  getAllPermissions,
  updatePermission,
  managePermissionToUser,
  deletePermission
}
