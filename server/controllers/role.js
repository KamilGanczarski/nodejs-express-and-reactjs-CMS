// Models
const Role = require('../models/Role');

const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getRoles = async (req, res) => {
  const roles = await Role.find({});
  res.status(StatusCodes.OK).send({ roles });
}

const createRole = async (req, res) => {
  const { role } = req.body;
  CustomError.requireProvidedValues(role);

  // Create new date
  const newRole = new Role();
  newRole.value = role;

  // Create date in mongodb
  await Role.create(newRole);

  res.status(StatusCodes.OK).send({ msg: 'Success ! Role created.' });
}

const deleteRole = async (req, res) => {
  const { roleId } = req.body;
  CustomError.requireProvidedValues(roleId);

  // Find the role
  const role = await Role.findOne({ _id: roleId });

  // If doesn't exist
  if (!role) {
    throw new CustomError.NotFoundError(`No role with id: ${roleId}`);
  }

  // Remove
  await role.remove();
  res.status(StatusCodes.OK).send({ msg: 'Success ! Role removed.' });
}

module.exports = {
  getRoles,
  createRole,
  deleteRole
}
