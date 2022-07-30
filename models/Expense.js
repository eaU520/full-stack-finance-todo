const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date_due: {
    type: Date
  },
  urgency: {
    type: String,
    required: true,
    default: "High" 
  },
  funded: {
    type: Boolean,
    default: "No"
  }
});

module.exports = Expense = mongoose.model('expense', ExpenseSchema);