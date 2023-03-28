const db = require('../../db/connect');

const rolesWithPermissions = [
  { role: 'admin', permission: 7 },
  { role: 'cooperator', permission: 3 },
  { role: 'customer', permission: 0 }
];

/**
 * Fetch permission
 * @param {*} permission Permission from Permission table in db
 * @returns Return permission value
 */
const fetchPermissionValue = async (permission, valueType = 'value') => {
  // Find permission id
  const Permissions = await db.query(
      `SELECT * FROM permissions WHERE name = $1`,
      [permission]
    )
    .then((result) => result)
    .catch((err) => []);

  // If no permission like provided
  if (!Permissions) {
    return 0;
  }

  if (valueType === 'deleteValue') {
    return Permissions[0].deletevalue;
  } else {
    return Permissions[0].value;
  }
}

/**
 * Check if user has specyfic permission
 * @param {Object} user Contain permission number
 * @param {String} permission Permission from Permission table in db
 * @returns 1 if User has permission or 0 if hasn't
 */
const checkPermission = async (user, permission) => {
  const value = await fetchPermissionValue(permission);

  // If no permission like provided
  if (value === 0) {
    return 0;
  }

  // Compare two numbers and check result is the same as enter value
  return parseInt(value & user.permission) === value;
}

/**
 * Search permission number
 * @param {String} role Role from Role table in mongodb
 * @returns Number of permission or 0 if role doesn't exist
 */
const permissionByRole = (role) => {
  const roleWithPermission = rolesWithPermissions.find(element => 
    element.role === role
  );

  // If role doesn't exist
  if (!roleWithPermission) {
    return 0;
  }

  return roleWithPermission.permission;
}

/**
 * Convert permission value to array of permisssions
 * @param {number} number Permission value 
 * @returns Array of permissions which user possess
 */
const convertPermissionNumberToArray = async (number) => {
  // Fetch permissions
  const permissions = await db.query('SELECT * FROM permissions', [])
    .then((result) => result)
    .catch((err) => {
      throw new CustomError.BadRequestError(`No permission with id: ${id}`);
    });

  // Add only permission which user possess
  let result = [];
  permissions.forEach(permission => {
    if (number & 2**permission.value === 2**permission.value) {
      result.push(permission.name);
    }
  });

  return result;
}

module.exports = {
  fetchPermissionValue,
  checkPermission,
  permissionByRole,
  convertPermissionNumberToArray
}
