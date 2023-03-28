const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authorization');

const {
  getAllPermissions,
  updatePermission,
  managePermissionToUser,
  deletePermission
} = require('../controllers/permission');

router.route('/')
  .get(authenticateUser, authorizePermissions('MANAGE_USER'), getAllPermissions)
  .post(authenticateUser, authorizePermissions('MANAGE_USER'), updatePermission)
  .patch(authenticateUser, authorizePermissions('MANAGE_USER'), managePermissionToUser)
  .delete(authenticateUser, authorizePermissions('MANAGE_USER'), deletePermission);

module.exports = router;
