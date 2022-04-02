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
  deleteComponent,
  changeComponentsOrder
} = require('../controllers/component');

router.route('/')
  .get(authorizeToPage, getAllComponents)
  .post(authenticateUser, authorizePermissions('MANAGE_PAGES'), addComponent)
  .delete(authenticateUser, authorizePermissions('MANAGE_PAGES'), deleteComponent);

router.route('/change-order')
  .patch(authenticateUser, authorizePermissions('MANAGE_PAGES'), changeComponentsOrder);

module.exports = router;
