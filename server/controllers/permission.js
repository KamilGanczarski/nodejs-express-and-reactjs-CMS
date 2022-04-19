const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const {
  fetchPermissionValue,
  checkPermission
} = require('./api/permission');

// Utils
const { attachCookiesToResponse, createTokenUser } = require('../utils/jwt');
const { userQuery } = require('../utils/database');

const getAllPermissions = async (req, res) => {
  const permissions = await db.query(`SELECT * FROM permissions`, [])
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No permissions`);
    });

  res.status(StatusCodes.OK).send({ permissions });
}

const updatePermission = async (req, res) => {
  const { name, value, deleteValue, description } = req.body;
  CustomError.requireProvidedValues(name, value, deleteValue, description);

  // Insert permission
  await db.query(
      `INSERT INTO permissions (name, value, deleteValue, description) VALUES
        ($1, $2, $3, $4)`,
      [name, value, deleteValue, description]
    )
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.BadRequestError("New permission hasn't been added");
    });

  res.status(StatusCodes.OK).send({ msg: "You've added new permission" });
}

const managePermissionToUser = async (req, res) => {
  const {
    userId,
    addPermission,
    deletePermission
  } = req.body;
  CustomError.requireProvidedValues(userId);

  // Find user
  const user = await db.query(
      userQuery({ userCondition: 'WHERE users.id = $1' }),
      [userId]
    )
    .then((users) => {
      if (users.length > 0) {
        return users[0];
      } else {
        throw new CustomError.BadRequestError(`No user with id: ${role}`);
      }
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(`No user with id: ${userId}`);
    });

  let permission = user.permission;

  // Add permission
  for await (const element of addPermission) {
    if (!await checkPermission(user, element)) {
      let value =  await fetchPermissionValue(element);
      permission = permission | value;
    }
  }

  // Remove permission
  for await (const element of deletePermission) {
    if (await checkPermission(user, element)) {
      let value =  await fetchPermissionValue(element, 'deleteValue');
      permission = permission & (~value);
    }
  }

  // Update permission
  await db.query(
      'UPDATE users SET permission = $1 WHERE id = $2',
      [permission, userId]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError("Permission hasn't been changed");
    });

  res.status(StatusCodes.OK).json({ msg: "You've updated user's permission" });
}

const deletePermission = async (req, res) => {
  const { id } = req.body;
  CustomError.requireProvidedValues(id);

  // Find the permission
  await db.query('SELECT * FROM permissions WHERE id = $1', [id])
    .then((result) => {
      if (result.length === 0) {
        throw new CustomError.BadRequestError(`No permission with id: ${id}`);
      }
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(`No permission with id: ${id}`);
    });


  // Delete permission
  await db.query('DELETE FROM permissions WHERE id = $1', [id])
    .then((result) => {
      res.status(StatusCodes.OK).send({
        msg: "You've deleted this permission"
      });
    })
    .catch((err) => {
      throw new CustomError.BadRequestError("Permission has't been deleted");
    });
}

module.exports = {
  getAllPermissions,
  updatePermission,
  managePermissionToUser,
  deletePermission
}
