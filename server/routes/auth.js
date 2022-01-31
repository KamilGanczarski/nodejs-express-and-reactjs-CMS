const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  checkSession
} = require('../controllers/auth');

// Login
router.route('/login')
  .post(login);

// Logout
router.route('/logout')
  .get(logout);

// Check login
router.route('/check-session')
  .get(checkSession);

module.exports = router;
