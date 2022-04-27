const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authorization');

const {
  uploadFile,
  removeFile
} = require('../controllers/file');

router.route('/')
  .post(authenticateUser, authorizePermissions('MANAGE_PAGES'), uploadFile)
  .delete(authenticateUser, authorizePermissions('MANAGE_PAGES'), removeFile);

module.exports = router;
