const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
  authorizeToPage
} = require('../middleware/authorization');

const {
  getAllComponents,
  addComponent,
  deleteComponent
} = require('../controllers/component');

router.route('/')
  .get(authorizeToPage, getAllComponents)
  .post(authenticateUser, authorizePermissions('MANAGE_PAGES'), addComponent)
  .delete(authenticateUser, authorizePermissions('MANAGE_PAGES'), deleteComponent);

module.exports = router;
