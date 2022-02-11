const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
  value: {
    type: String,
    unique: true,
    required: [true, 'Please provide role'],
    maxlength: 50,
    minlength: 3
  }
});

module.exports = mongoose.model('Role', RoleSchema);
