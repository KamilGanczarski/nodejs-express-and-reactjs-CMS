const express = require('express');
const router = express.Router();
const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getPermissions
} = require('../controllers/api/user');

const { authorizePermission } = require('../middleware/authorization')

// Fetch user by id
router.route('/user/:id')
  .get(authorizePermission('admin'), getUser)

// Get all users
router.route('/users')
  .get(authorizePermission('admin'), getAllUsers);

// Get users with specific permission
router.route('/users/:permission')
  .get(authorizePermission('admin'), getAllUsers);

router.route('/user')
  .post(authorizePermission('admin'), createUser)
  .patch(authorizePermission('admin'), updateUser)
  .delete(authorizePermission('admin'), deleteUser);

router.route('/permissions')
  .get(authorizePermission('admin'), getPermissions);

module.exports = router;
