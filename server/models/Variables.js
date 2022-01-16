const mongoose = require('mongoose');

const VariablesSchema = mongoose.Schema({
  property: {
    type: String,
    required: [true, 'Please provide variable\'s name'],
    maxlength: 50,
    minlength: 3,
    unique: true
  },
  value: {
    type: String
  }
})

module.exports = mongoose.model('Variables', VariablesSchema);
