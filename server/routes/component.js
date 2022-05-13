const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions,
  authorizeToPage
} = require('../middleware/authorization');

const {
  getAllComponents,
  toggleComponent,
  changeComponentsOrder
} = require('../controllers/component');

router.route('/')
  .get(authorizeToPage, getAllComponents)
  .patch(authenticateUser, authorizePermissions('MANAGE_PAGES'), toggleComponent);

router.route('/change-order')
  .patch(authenticateUser, authorizePermissions('MANAGE_PAGES'), changeComponentsOrder);

module.exports = router;
