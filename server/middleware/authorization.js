const CustomError = require('../errors');

// Utils
const { isTokenValid } = require('../utils/jwt');
const { pagePermission } = require('../utils/permission');

const { checkPermission } = require('../controllers/api/permission');

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
      permission: payload.user.permission,
      role: payload.user.role,
      changePassword: payload.user.changePassword
    }
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication invalid');
  }
}

const authorizePermissions = (permission) => {
  return async (req, res, next) => {
    if (!await checkPermission(req.user, permission)) {
      throw new CustomError.UnauthenticatedError(
        'Unauthorized to access this route'
      )
    }
    next();
  }
}

// Check permission to access to page
const authorizeToPage = async (req, res, next) => {
  // Allow for user with permission to manage pages
  if (authorizePermissions('MANAGE_PAGES')) {
    next();
  // Allow if user has specyfic permission
  } else if (await pagePermission(req.query.page)) {
    next();
  } else {
    throw new CustomError.UnauthenticatedError(
      'Unauthorized to access this route'
    )
  }
}

module.exports = {
  authenticateUser,
  authorizePermissions,
  authorizeToPage
}
