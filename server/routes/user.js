const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authorization');

const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/user');

// Get all users
router.route('/')
  .get(authenticateUser, authorizePermissions('VIEW_USER'), getAllUsers)
  // Specyfic user
  .post(authenticateUser, authorizePermissions('ADD_USER'), createUser)
  .patch(authenticateUser, authorizePermissions('MANAGE_USER'), updateUser)
  .delete(authenticateUser, authorizePermissions('MANAGE_USER'), deleteUser);

router.route('/:id')
  .get(authenticateUser, authorizePermissions('VIEW_USER'), getUser);

// Get users with specific permission -- use sort in params
// router.route('/:permission')
//   .get(authenticateUser, authorizePermissions('admin'), getAllUsers);

module.exports = router;
