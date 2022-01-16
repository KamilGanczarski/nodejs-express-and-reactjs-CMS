const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: [true, 'Please provide login'],
    maxlength: 50,
    minlength: 3,
    unique: true
  },
  event: {
    type: String,
    required: [true, 'Please provide event'],
    maxlength: 50,
    minlength: 3
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6
  },
  dir: {
    type: String,
    required: [true, 'Please provide directory'],
    minlength: 1
  },
  permissionId: {
    type: mongoose.Types.ObjectId,
    ref: 'Permission',
    required: [true, 'Please provide permission'],
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
