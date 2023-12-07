const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is a required field'],
    minLength: [2, 'Name must be at least two chracters long']
  },
  email: {
    type: String,
    required: [true, 'Email is a required field'],
    minLength: [10, 'Email is too short']
  },
  password: {
    type: String,
    required: [true, 'The password is a required field'],
    minLength:[8, 'The password must be at least 10 characters']
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