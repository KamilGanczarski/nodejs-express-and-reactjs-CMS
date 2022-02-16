const Permission = require('../../models/Permission');

const rolesWithPermissions = [
  { role: 'admin', permission: 7 },
  { role: 'cooperator', permission: 3 },
  { role: 'customer', permission: 0 }
];

/**
 * Fetch permission
 * @param {*} permission Permission from Permission table in mongodb
 * @returns Return permission value
 */
const fetchPermissionValue = async (permission, valueType = 'value') => {
  // Find permission id
  const Permissions = await Permission.find({ name: permission });

  // If no permission like provided
  if (!Permissions) {
    return 0;
  }

  if (valueType === 'deleteValue') {
    return Permissions[0].deleteValue;
  } else {
    return Permissions[0].value;
  }
}

/**
 * Check if user has specyfic permission
 * @param {Object} user Contain permission number
 * @param {String} permission Permission from Permission table in mongodb
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

module.exports = {
  fetchPermissionValue,
  checkPermission,
  permissionByRole
}
