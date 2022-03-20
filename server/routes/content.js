const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authorization');

const {
  addContent,
  updateContent,
  deleteContent
} = require('../controllers/content');

router.route('/')
  .post(authenticateUser, authorizePermissions('MANAGE_PAGES'), addContent)
  .patch(authenticateUser, authorizePermissions('MANAGE_PAGES'), updateContent)
  .delete(authenticateUser, authorizePermissions('MANAGE_PAGES'), deleteContent);

module.exports = router;
