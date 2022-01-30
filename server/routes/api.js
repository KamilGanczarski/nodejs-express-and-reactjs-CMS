const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  checkSession,
  fetchUser,
  createUser,
  deleteUser,
  signup
} = require('../controllers/api');

// Get all users
router.route('/users')
  .get(getAllUsers);

// Get users with specific permission
router.route('/users/:permission')
  .get(getAllUsers);

// Check login
router.route('/check-session')
  .get(checkSession);

router.route('/user/:id')
  .get(fetchUser)

router.route('/user')
  .post(createUser)
  .delete(deleteUser);

router.route('/signup')
  .post(signup);

module.exports = router;
