const express = require('express');
const router = express.Router();
const {
  loginToDB,
  logout
} = require('../controllers/auth');

router.route('/login').post(loginToDB);
router.route('/logout').get(logout);

module.exports = router;
