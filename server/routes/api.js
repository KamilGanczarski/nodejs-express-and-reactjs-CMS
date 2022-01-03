const express = require('express')
const router = express.Router()
const {
  currentUser,
  signup
} = require('../controllers/api')

router.route('/current_user').get(currentUser)
router.route('/signup').post(signup)

module.exports = router
