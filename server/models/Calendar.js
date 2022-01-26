const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: ''
  },
  expiryDate: {
    type: Date,
    default: ''
  },
  contract: {
    type: Boolean,
    default: false
  },
  pdf: {
    type: String,
    maxlength: 50
  },
  price: {
    type: String,
    maxlength: 50
  },
  advance: {
    type: String,
    maxlength: 50
  },
  howMuchPaid: {
    type: String,
    maxlength: 50
  }
});

module.exports = mongoose.model('Calendar', CalendarSchema);
