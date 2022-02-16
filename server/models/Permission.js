const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
    unique: true
  },
  value: {
    type: Number,
    required: [true, 'Please provide value'],
    minlength: 1,
    unique: true
  },
  deleteValue: {
    type: Number,
    required: [true, 'Please provide delete value'],
    minlength: 1,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    maxlength: 50,
    minlength: 3,
    unique: true
  }
});

module.exports = mongoose.model('Permission', PermissionSchema);
