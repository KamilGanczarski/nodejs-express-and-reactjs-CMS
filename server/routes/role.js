const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authorization');

const {
  getRoles,
  createRole,
  deleteRole
} = require('../controllers/role');

router.route('/')
  .get(authenticateUser, authorizePermissions('admin'), getRoles)
  .post(authenticateUser, authorizePermissions('admin'), createRole)
  .delete(authenticateUser, authorizePermissions('admin'), deleteRole);

module.exports = router;
