const express = require('express');
const router = express.Router();

const {
  authenticateUser,
  authorizePermissions
} = require('../middleware/authorization');

const {
  getAllComponents,
  createComponent,
  deleteComponent
} = require('../controllers/component');

router.route('/')
  .get(getAllComponents)
  .post(authenticateUser, authorizePermissions('MANAGE_PAGES'), createComponent)
  .delete(authenticateUser, authorizePermissions('MANAGE_PAGES'), deleteComponent);

router.route('/hero-content')
  .post(authenticateUser, authorizePermissions('MANAGE_PAGES'), createComponent)

module.exports = router;
