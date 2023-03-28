const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authorization');

const {
  uploadFile,
  deleteFile
} = require('../controllers/file');

router.route('/')
  .post(authenticateUser, authorizePermissions('MANAGE_PAGES'), uploadFile)
  .delete(authenticateUser, authorizePermissions('MANAGE_PAGES'), deleteFile);

module.exports = router;
