const CustomError = require('../errors');
const { isTokenValid } = require('../utils');
// const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  // Check cookies
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }

  try {
    const payload = isTokenValid({ token });
    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload.user.userId,
      login: payload.user.login,
      permission: payload.user.permission
    }
    
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
}

const authorizePermissions = (...permissions) => {
  return (req, res, next) => {
    if (!permissions.includes(req.user.permission)) {
      throw new CustomError.UnauthenticatedError(
        'Unauthorized to access this route'
      )
    }
    next();
  }
}

module.exports = {
  authenticateUser,
  authorizePermissions
}
