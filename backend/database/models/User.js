const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
},
  {timestamps: true}//When created?
);

module.exports = User = mongoose.model('user', UserSchema);