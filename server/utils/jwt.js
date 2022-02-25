const jwt = require('jsonwebtoken');
const createTokenUser = require('./createTokenUser');
const {
  convertPermissionNumberToArray
} = require('../controllers/api/permission');
const { compareDates } = require('./date/index')

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
}

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: { user } });
  
  const oneDay = 86400000;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true
  });

  return token;
}

/**
 * Create new token
 * @param {*} user User object get from db
 * @returns String token
 */
const createToken = async (res, user) => {
  let tokenUser = createTokenUser(user);

  tokenUser.permissions = await convertPermissionNumberToArray(
    tokenUser.permission
  );

  // Convert timestamp from pgsql to js date
  const passwordExpiryDate = new Date(tokenUser.passwordExpiryDate);
  tokenUser.changePassword = compareDates(passwordExpiryDate, new Date);
  return attachCookiesToResponse({ res, user: { ...tokenUser } });
}

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createToken
}
