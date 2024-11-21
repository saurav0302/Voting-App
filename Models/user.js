const mongoose = require('mongoose');

// Create the schema for the user
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: [18, 'Age must be at least 18']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{10}$/, 'Please enter a valid mobile number'],
  },
  address: {
    type: String,
    required: true,
  },
  addharCardNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{12}$/, 'Please enter a valid Aadhar card number'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password should be at least 6 characters long'],
  },
  role: {
    type: String,
    enum: ['voter', 'admin'],
    default: 'voter',
  },
  isVoted: {
    type: Boolean,
    default: false,
  }
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
