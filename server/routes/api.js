const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getSingleUserMe,
  createUser,
  deleteUser,
  signup
} = require('../controllers/api');

router.route('/users').get(getAllUsers);

router.route('/current-user').get(getSingleUserMe)

router.route('/user')
  .post(createUser)
  .delete(deleteUser);

router.route('/signup').post(signup);

module.exports = router;
