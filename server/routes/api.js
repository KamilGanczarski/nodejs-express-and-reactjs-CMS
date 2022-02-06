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

const { authorizePermissions } = require('../middleware/authorization');

// Fetch user by id
router.route('/user/:id')
  .get(authorizePermissions('admin'), getUser)

// Get all users
router.route('/users')
  .get(authorizePermissions('admin'), getAllUsers);

// Get users with specific permission
router.route('/users/:permission')
  .get(authorizePermissions('admin'), getAllUsers);

router.route('/user')
  .post(authorizePermissions('admin'), createUser)
  .patch(authorizePermissions('admin'), updateUser)
  .delete(authorizePermissions('admin'), deleteUser);

router.route('/permissions')
  .get(authorizePermissions('admin'), getPermissions);

module.exports = router;
