const db = require('../db/connect');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getRoles = async (req, res) => {
  // Fetch roles
  await db.query(`SELECT * FROM user_roles`, [])
    .then((roles) => {
      res.status(StatusCodes.OK).send({ roles });
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(`No role with id: ${id}`);
    });
}

const createRole = async (req, res) => {
  const { role } = req.body;
  CustomError.requireProvidedValues(role);

  // Insert role
  await db.query(`INSERT INTO user_roles (value) VALUES ($1)`, [role])
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.BadRequestError("New role hasn't been added");
    });

  res.status(StatusCodes.OK).send({ msg: 'Success ! Role created.' });
}

const deleteRole = async (req, res) => {
  const { roleId } = req.body;
  CustomError.requireProvidedValues(roleId);

  // Find the role
  await db.query(
      `SELECT * FROM user_roles WHERE id = $1`,
      [roleId]
    )
    .then((result) => {
      if (result.length === 0) {
        throw new CustomError.BadRequestError(`No role with id: ${roleId}`);
      }
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(`No role with id: ${roleId}`);
    });

  // Remove the role
  await db.query(`DELETE FROM user_roles WHERE id = $1`, [roleId])
    .then((result) => {
      res.status(StatusCodes.OK).send({ msg: 'Success ! Role removed.' });
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(`No role with id: ${roleId}`);
    });
}

module.exports = {
  getRoles,
  createRole,
  deleteRole
}
