const db = require('../db/connect');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const {
  generateHash,
  validPassword,
  createToken
} = require('../utils/jwt');
const fs = require('fs');

const { userQuery } = require('../utils/database');

const login = async (req, res) => {
  const { login, password } = req.body;

  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }

  // Find user
  const user = await db.query(
      userQuery({
        userCondition: 'WHERE users.login = $1', 
        password: true
      }),
      [login]
    )
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
  const { login, password } = req.body;

  // Check for login and password
  if (!login || !password) {
    throw new CustomError.BadRequestError('Please provide login and password')
  }
  const userId = req.user.userId;

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
      throw new CustomError.BadRequestError("Change has't been approved");
    });

  // Find user
  const newUser = await db.query(
      userQuery({ userCondition: 'WHERE users.id = $1' }),
      [userId]
    )
    .then((result) => result[0])
    .catch((err) => {
      throw new CustomError.UnauthenticatedError('Invalid Credentials');
    });

  // Set new token
  const token = await createToken(res, newUser);
  res.status(StatusCodes.OK).json({ token: `Bearer ${token}` });
}

const resetDB = async (req, res) => {
  const sql = fs
    .readFileSync('/var/www/html/all/nodejs-express-and-reactjs-CMS/server/db/migration/init_user.sql')
    .toString();
  const sql1 = fs
    .readFileSync('/var/www/html/all/nodejs-express-and-reactjs-CMS/server/db/migration/insert_data.sql')
    .toString();

  const result = await db.query(sql, [])
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`Database isn't set to default`);
    });

  const result1 = await db.query(sql1, [])
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`Database isn't set to default`);
    });

  res.status(StatusCodes.OK).send({ result, result1 });
}

module.exports = {
  login,
  logout,
  checkValidToken,
  changePassword,
  resetDB
}
