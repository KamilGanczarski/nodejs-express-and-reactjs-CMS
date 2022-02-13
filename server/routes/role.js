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
  .get(authenticateUser, authorizePermissions('MANAGE_USER'), getRoles)
  .post(authenticateUser, authorizePermissions('MANAGE_USER'), createRole)
  .delete(authenticateUser, authorizePermissions('MANAGE_USER'), deleteRole);

module.exports = router;
