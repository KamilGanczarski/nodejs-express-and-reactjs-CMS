const db = require('../db/connect');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  generateHash,
  validPassword,
  createToken
} = require('../utils');

const login = async (req, res) => {
  const { login, password } = req.body;

  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }

  // Find user
  const user = await db.query(
      `SELECT
        users.id,
        users.login,
        users.event,
        users.password,
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
      WHERE users.login = $1`,
      [login])
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    });

  // Check password
  if (!validPassword(password, user.password)) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  // Set new token
  const token = await createToken(res, user);
  res.status(StatusCodes.OK).json({ token: `Bearer ${token}` });
}

const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000)
  });
  res.status(StatusCodes.OK).json({ msg: "You're logged out" });
}

const checkValidToken = (req, res) => {
  res.status(StatusCodes.OK).json({ token: req.headers.authorization });
}

const changePassword = async (req, res) => {
  const { userId, login, password } = req.body;

  // Check for login and password
  if (!userId || !login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }

  // Find user
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId])
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    });

  // Check if user exists
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials');
  }

  // Check the same password
  if (validPassword(password, user.password)) {
    throw new CustomError.UnauthenticatedError(
      'The same password, you should make up a new one'
    );
  }

  // Set date now + 60days
  var months = new Date();
  months.setDate(months.getDate() + 60);
  await db.query(
      `UPDATE users SET password = $1, passwordExpiryDate = $2 WHERE id = $3`,
      [generateHash(password), months, userId]
    )
    .then((result) => result)
    .catch((err) => {
      console.log(err)
      throw new CustomError.BadRequestError("Change has't been approved");
    });

  // Find user
  const newUser = await db.query(
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
      [userId]
    )
    .then((result) => result[0].row_to_json)
    .catch((err) => {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    });

  // Set new token
  const token = await createToken(res, newUser);
  res.status(StatusCodes.OK).json({ token: `Bearer ${token}` });
}

module.exports = {
  login,
  logout,
  checkValidToken,
  changePassword
}
