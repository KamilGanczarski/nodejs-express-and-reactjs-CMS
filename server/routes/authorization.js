const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  checkValidToken
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

module.exports = router;
