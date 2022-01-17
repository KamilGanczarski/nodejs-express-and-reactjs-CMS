const express = require('express');
const router = express.Router();
const {
  login,
  logout
} = require('../controllers/auth');

// Login
router.route('/login').post(login);

// Logout
router.route('/logout').get(logout);

module.exports = router;
