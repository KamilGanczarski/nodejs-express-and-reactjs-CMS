const db = require('../db/connect');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const { fetchAndUpdateNewDirectory } = require('./api/directory');
const {
  permissionByRole,
  convertPermissionNumberToArray
} = require('./api/permission');
const { generateHash } = require('../utils');

/**
 * Get user by id
 */
const getUser = async (req, res) => {
  const { id } = req.params;
  CustomError.requireProvidedValues(id);

  // Fetch user
  let user = await db.query(
      `SELECT
        users.id,
        users.login,
        users.event,
        users.passwordExpiryDate,
        users.permission,
        users.date,
        users.expiryDate,
        users.dir,
        (
          SELECT jsonb_agg(nested_roles)
          FROM (
            SELECT * FROM user_roles
              WHERE user_roles.id = users.role_id
          ) AS nested_roles
        ) AS roles,
        (
          SELECT jsonb_agg(nested_contact)
          FROM (
            SELECT * FROM contract WHERE contract.user_id = users.id
          ) AS nested_contact
        ) AS contact
      FROM users
      INNER JOIN user_roles ON (user_roles.id = users.role_id)
      INNER JOIN contract ON (contract.user_id = users.id)
      WHERE users.id = $1`,
      [id]
    )
    .then((result) => {
      if (result.length > 0) {
        return result[0];
      } else {
        throw new CustomError.BadRequestError(`No user with id: ${id}`);
      }
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(`No user with id: ${id}`);
    });

  user.permissions = await convertPermissionNumberToArray(user.permission);
  res.status(StatusCodes.OK).send({ user });
}

/**
 * Get users by rol or without it get all
 */
const getAllUsers = async (req, res) => {
  const { role } = req.query;
  
  let roleQuery = '';
  let roleParams = [];
  if (role) {
    roleQuery = ` AND user_roles.value = $1`;
    roleParams.push(role);
  }

  // Fetch user
  let users = await db.query(
      `SELECT
          users.id,
          users.login,
          users.event,
          users.passwordExpiryDate,
          users.permission,
          users.date,
          users.expiryDate,
          users.dir,
          (
            SELECT jsonb_agg(nested_roles)
            FROM (
              SELECT * FROM user_roles
                WHERE user_roles.id = users.role_id ${roleQuery}
            ) AS nested_roles
          ) AS roles,
          (
            SELECT jsonb_agg(nested_contact)
            FROM (
              SELECT * FROM contract WHERE contract.user_id = users.id
            ) AS nested_contact
          ) AS contact
        FROM users
        INNER JOIN user_roles ON (user_roles.id = users.role_id) ${roleQuery}
        INNER JOIN contract ON (contract.user_id = users.id)`,
      roleParams
    )
    .then((users) => {
      if (users.length > 0) {
        return users;
      } else {
        throw new CustomError.BadRequestError(
          `No users with this role: ${role}`
        );
      }
    })
    .catch((err) => {
      throw new CustomError.BadRequestError(`No users with this role: ${role}`);
    });
  
  for (const user of users) {
    user.permissions = await convertPermissionNumberToArray(user.permission);
  }

  res.status(StatusCodes.OK).send({ users });
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
  await db.query(`SELECT * FROM users WHERE login = $1`, [login])
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(
        'Already created user with this username'
      );
    });

  // Fetch role
  const roleRecord = await db.query(
      `SELECT * FROM user_roles WHERE value = $1`,
      [role]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No role with '${role}' name`);
    });

  // Create new user
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dir  = await fetchAndUpdateNewDirectory();

  let queryParams = [
    login,                        // login
    event,                        // event
    generateHash(password),       // password
    yesterday,                    // passwordExpiryDate
    permissionByRole(role),       // permission
    dir,                          // dir
    date ? new Date(date.replace(' ', 'T')) : null,             // date
    expiryDate ? new Date(expiryDate.replace(' ', 'T')) : null, // expiryDate
    roleRecord[0].id              // role_id
  ];

  const newUserId = await db.query(
    `INSERT INTO users (
      login,
      event,
      password,
      passwordExpiryDate,
      permission,
      dir,
      date,
      expiryDate,
      role_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
    queryParams
  )
  .then((result) => result)
  .catch((err) => {
    throw new CustomError.BadRequestError('User with this login aleady exists');
  });

  // Insert new contract
  queryParams = [ parseInt(newUserId[0].id), false, '', 0, 0, 0 ];

  await db.query(
    `INSERT INTO contract (
      user_id,
      contract,
      pdf,
      price,
      advance,
      howMuchPaid
    ) VALUES ($1, $2, $3, $4, $5, $6)`,
    queryParams
  )
  .then((result) => result)
  .catch((err) => {
    throw new CustomError.BadRequestError("New contact hasn't been created");
  });

  res.status(StatusCodes.OK).send({ id: newUserId[0].id });
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
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.NotFoundError(`No user with id: ${userId}`);
    });

  // If doesn't exist
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }

  let updateQuery = `UPDATE users SET`;
  let updateParamsSigns = '';
  let updateParams = [];

  const addToQuery = (field, count) => {
    return `${count > 1 ? ',' : ''} ${field} = $${count}`;
  }

  // Set new values
  if (login) {
    updateQuery += addToQuery('login', updateParams.length + 1);
    updateParams.push(login);
  }

  if (event) {
    updateQuery += addToQuery('event', updateParams.length + 1);
    updateParams.push(event);
  }

  // Check if password is set
  if (newPassword) {
    let hashPassword = generateHash(newPassword);
    updateQuery += addToQuery('password', updateParams.length + 1);
    updateParams.push(hashPassword);
  }


  if (req.user.userId !== user.id) {
    // Update role
    if (role) {
      // Find the role
      const roleRecord = await db.query(
          `SELECT * FROM user_roles WHERE value = $1`,
          [role]
        )
        .then((result) => result[0])
        .catch((err) => {
          throw new CustomError.BadRequestError(`No role with id: ${id}`);
        });

      // Check role
      if (!roleRecord) {
        throw new CustomError.BadRequestError(`No role with '${role}' name`);
      }

      // Set new values
      updateQuery += addToQuery('role_id', updateParams.length + 1);
      updateParams.push(roleRecord.id);
    }

    // Update calendar
    if (date) {
      updateQuery += addToQuery('date', updateParams.length + 1);
      updateParams.push(new Date(date.replace(' ', 'T')));
    }
    if (expiryDate) {
      updateQuery += addToQuery('expiryDate', updateParams.length + 1);
      updateParams.push(new Date(expiryDate.replace(' ', 'T')));
    }
  }

  updateParams.push(userId);
  updateQuery += ` WHERE id = $${updateParams.length};`;

  // Update user
  await db.query(updateQuery, updateParams)
    .then((result) => result)
    .catch((err) => {
      console.log(err)
      throw new CustomError.BadRequestError(`Changes hasn't been pproved`);
    });

  res.status(StatusCodes.OK).send({ msg: `You've updated the user` });
}

/**
 * Delete user
 */
const deleteUser = async (req, res) => {
  const { id } = req.body;
  CustomError.requireProvidedValues(id);

  // Find user with this login
  await db.query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => { 
      if (!result.length) {
        throw new CustomError.NotFoundError(`No user with id: ${id}`);
      }
      return result;
    })
    .catch((err) => {
      throw new CustomError.NotFoundError(`No user with id: ${id}`);
    });

  // Remove contact
  await db.query(`DELETE FROM contract WHERE user_id = $1`, [id])
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.NotFoundError(
        `Contract hasn't been deleted with id: ${id}`
      );
    });

  // Remove user
  await db.query(`DELETE FROM users WHERE id = $1`, [id])
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.NotFoundError(
        `User hasn't been deleted with id: ${id}`
      );
    });

  res.status(StatusCodes.OK).send({ msg: 'Success ! User removed.' });
}

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
}
