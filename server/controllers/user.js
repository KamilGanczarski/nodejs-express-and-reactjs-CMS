const db = require('../db/connect');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// Api
const { fetchAndUpdateNewDirectory } = require('./api/directory');
const {
  permissionByRole,
  convertPermissionNumberToArray
} = require('./api/permission');
const { fetchUserById } = require('./api/user');

// Utils
const { generateHash } = require('../utils/jwt');
const {
  userQuery,
  operatorsMap,
  filterUserOptions,
  setFilterQuery,
  sortUserOptions,
  setSortQuery,
  setPagination
} = require('../utils/database');

const addToQuery = (field, count) => {
  return `${count > 1 ? ',' : ''} ${field} = $${count}`;
}

/**
 * Get user by id
 */
const getUser = async (req, res) => {
  const { id } = req.params;
  CustomError.requireProvidedValues(id);

  // Fetch user
  let user = await fetchUserById(id);
  user.permissions = await convertPermissionNumberToArray(user.permission);
  res.status(StatusCodes.OK).send({ user });
}

/**
 * Get users by rol or without it get all
 */
const getAllUsers = async (req, res) => {
  const { perPage, page, sort, filter } = req.query;

  // Set default rows per page
  const perPageReq = perPage ? parseInt(perPage) : 10;
  const pageReq = page ? parseInt(page) : 0;
  const pagination = setPagination(perPageReq, pageReq);

  let query = {
    filter: {
      users: '',
      user_roles: '',
      contract: ''
    },
    sort: '',
    params: []
  };

  // Filter
  if (filter) {
    const numericFiltersReq = filter.split(",");
    query = setFilterQuery(
      numericFiltersReq,
      operatorsMap,
      filterUserOptions,
      query
    );
  }

  // Sort
  if (sort) {
    const sortReq = sort.split(",");
    query = setSortQuery(sortReq, sortUserOptions, query);
  }

  // Fetch user
  let users = await db.query(
      userQuery({
        userCondition: query.filter.users,
        roleCondition: query.filter.user_roles,
        contractCondition: query.filter.contract,
        sort: query.sort,
        pagination: pagination
      }),
      query.params
    )
    .then((users) => users)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No users with this role: ${page}`);
    });

  for (const user of users) {
    user.permissions = await convertPermissionNumberToArray(user.permission);
  }

  const tableCount = await db.query("SELECT COUNT(*) FROM Users;", [])
    .then(users => users)
    .catch(err => {
      throw new CustomError.BadRequestError('No users');
    });

  res.status(StatusCodes.OK).send({
    users, // Main data
    tableCount: tableCount[0].count, // Count of rows in users table
    // TableCount devided by rows per page
    pages: Math.ceil(tableCount[0].count / perPageReq),
    currentPage: pageReq // Current page
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
    expiryDate,
    contract,
    price,
    advance,
    howMuchPaid
  } = req.body;
  CustomError.requireProvidedValues(login, password, role, event, expiryDate);

  // Find user with this login
  const alreadyCreated = await db.query(
      `SELECT
        (
          SELECT jsonb_agg(nested_users)
          FROM (
            SELECT sum(users.id) FROM users WHERE users.login = $1
          ) AS nested_users
        ) AS users_sum,
        (
          SELECT jsonb_agg(nested_pages)
          FROM (
            SELECT sum(pages.id) FROM pages WHERE pages.name = $1
          ) AS nested_pages
        ) AS pages_sum
      FROM users;`,
      [login]
    )
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(
        'Already created user with this login'
      );
    });

  if (alreadyCreated[0].users_sum.sum > 0 || alreadyCreated[0].pages_sum.sum > 0) {
    throw new CustomError.BadRequestError(
      'Already created user with this login'
    );
  }

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

  // date
  const dateChecked = date ? new Date(date.replace(' ', 'T')) : null;
  // expiryDate
  const expiryDateChecked = expiryDate ? new Date(expiryDate.replace(' ', 'T')) : null;

  let queryParams = [
    login,                  // login
    event,                  // event
    generateHash(password), // password
    yesterday,              // passwordExpiryDate
    permissionByRole(role), // permission
    dir,                    // dir
    dateChecked,            // date
    expiryDateChecked,      // expiryDate
    roleRecord[0].id        // role_id
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

  const contractValue = contract ? contract : false;
  const priceValue = price ? price : 0;
  const advanceValue = advance ? advance : 0;
  const howMuchPaidValue = howMuchPaid ? howMuchPaid : 0;

  // Insert new contract
  queryParams = [
    contractValue,
    priceValue,
    advanceValue,
    howMuchPaidValue,
    parseInt(newUserId[0].id)
  ];

  await db.query(
    `INSERT INTO contract (
      contract,
      price,
      advance,
      howMuchPaid,
      user_id
    ) VALUES ($1, $2, $3, $4, $5)`,
    queryParams
  )
  .then((result) => result)
  .catch((err) => {
    console.log(err)
    throw new CustomError.BadRequestError("New contract hasn't been created");
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

  // Set new values
  if (login) {
    updateParams.push(login);
    updateQuery += addToQuery('login', updateParams.length);
  }

  if (event) {
    updateParams.push(event);
    updateQuery += addToQuery('event', updateParams.length);
  }

  // Check if password is set
  if (newPassword) {
    let hashPassword = generateHash(newPassword);
    updateParams.push(hashPassword);
    updateQuery += addToQuery('password', updateParams.length);
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
      updateParams.push(roleRecord.id);
      updateQuery += addToQuery('role_id', updateParams.length);
    }

    // Update calendar
    if (date) {
      updateParams.push(new Date(date.replace(' ', 'T')));
      updateQuery += addToQuery('date', updateParams.length);
    }
    if (expiryDate) {
      updateParams.push(new Date(expiryDate.replace(' ', 'T')));
      updateQuery += addToQuery('expiryDate', updateParams.length);
    }
  }

  updateParams.push(userId);
  updateQuery += ` WHERE id = $${updateParams.length};`;

  // Update user
  await db.query(updateQuery, updateParams)
    .then((result) => result)
    .catch((err) => {
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

  // Remove contract
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
