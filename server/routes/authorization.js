const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  checkValidToken,
  changePassword,
  resetDB
} = require('../controllers/authorization');
const { authenticateUser } = require('../middleware/authorization');

// Login
router.route('/login')
  .post(login);

// Logout
router.route('/logout')
  .get(logout);

// Check login
router.route('/check-token')
  .get(authenticateUser, checkValidToken);

// Change password
router.route('/change-password')
  .post(authenticateUser, changePassword);

// Change password
router.route('/reset-database')
  .post(authenticateUser, resetDB);

module.exports = router;
