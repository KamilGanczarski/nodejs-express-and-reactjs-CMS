// Models
const Permission = require('../models/Permission');
const User = require('../models/User');

const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');
const {
  fetchPermissionPosition,
  checkPermission
} = require('./api/permission');

const getAllPermissions = async (req, res) => {
  const Permissions = await Permission.find({});
  res.status(StatusCodes.OK).send({ Permissions });
}

const updatePermission = async (req, res) => {
  const { name, description } = req.body;
  CustomError.requireProvidedValues(name, description);

  // Create new permission
  const newPermission = new Permission();
  newPermission.name = name;
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
  CustomError.requireProvidedValues(userId, addPermission, deletePermission);

  // Find the user
  const user = await User.findOne({ _id: userId });
  
  // If doesn't exist
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }

  // Add permission
  for await (const element of addPermission) {
    if (!await checkPermission(user, element)) {
      let index =  await fetchPermissionPosition(element);
      user.permission = user.permission | index;
    }
  }

  // Delete permission
  for await (const element of deletePermission) {
    if (await checkPermission(user, element)) {
      let index =  await fetchPermissionPosition(element);
      user.permission = user.permission & (~index);
    }
  }

  await user.save();
  res.status(StatusCodes.OK).send({ msg: "New permissions has been approved" });
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
