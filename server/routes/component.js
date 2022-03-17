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
  .get(authenticateUser, authorizePermissions('MANAGE_USER'), getAllComponents)
  .post(authenticateUser, authorizePermissions('MANAGE_USER'), createComponent)
  .delete(authenticateUser, authorizePermissions('MANAGE_USER'), deleteComponent);
 
module.exports = router;
