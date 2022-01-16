const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
  value: {
    type: String,
    required: [true, 'Please provide permission'],
    maxlength: 50,
    minlength: 3
  }
});

module.exports = mongoose.model('Permission', PermissionSchema);
