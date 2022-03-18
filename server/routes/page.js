const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authorization');

const {
  getAllPages
} = require('../controllers/page');

router.route('/')
  .get(authenticateUser, authorizePermissions('MANAGE_USER'), getAllPages);

module.exports = router;
