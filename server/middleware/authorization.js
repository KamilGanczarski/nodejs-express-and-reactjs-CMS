const CustomError = require('../errors');

const authorizePermission = (...permissions) => {
  return (req, res, next) => {
    if (!permissions.includes(req.session.permission)) {
      throw new CustomError.UnauthenticatedError(
        'Unauthorized to access this route'
      )
    }
    next();
  }
}

module.exports = {
  authorizePermission
}
