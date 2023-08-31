const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is a required field']
  },
  email: {
    type: String,
    required: [true, 'Email is a required field']
  },
  password: {
    type: String,
    required: [true, 'The password is a required field']
  },
  username: {
    type: String,
    required: [true, 'The username is a required field']
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
},
  {timestamps: true}
);

module.exports = User = mongoose.model('user', UserSchema);