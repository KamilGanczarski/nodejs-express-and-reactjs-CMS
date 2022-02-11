const Permission = require('../../models/Permission');

const rolesWithPermissions = [
  { role: 'admin', permission: 7 },
  { role: 'cooperator', permission: 3 },
  { role: 'customer', permission: 0 }
];

/**
 * Fetch permission and convert to 2^n n - position from 0 
 * @param {*} permission Permission from Permission table in mongodb
 * @returns Return 2^n
 */
const fetchPermissionPosition = async (permission) => {
  // Find permission id
  const Permissions = await Permission.find({});
  const permissionId = Permissions.findIndex((element, id) =>
    element.name === permission
  );

  // If no permission like provided
  if (permissionId === -1) {
    return 0;
  }

  // Convert number to  binary to 1 in n-th position 
  return 2 ** permissionId;
}

/**
 * Check if user has specyfic permission
 * @param {Object} user Contain permission number
 * @param {String} permission Permission from Permission table in mongodb
 * @returns 1 if User has permission or 0 if hasn't
 */
const checkPermission = async (user, permission) => {
  const index = await fetchPermissionPosition(permission);

  // If no permission like provided
  if (index === 0) {
    return 0;
  }

  return index & user.permission;
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
  fetchPermissionPosition,
  checkPermission,
  permissionByRole
}
