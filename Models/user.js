const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// // Middleware which provides moongoose
userSchema.pre('save',async function (next) {
  this.updatedAt = Date.now();
  const user = this;

  // hash the password only if it has been  modified or(it is new) 
  if(!user.isModified('password')) return next();
  
  try {
      // hash salt
      const salt = await bcrypt.genSalt(10);

      // hash password
      const hasedpassword = await bcrypt.hash(user.password, salt);

      // override the plaintext to password 
      user.password =  hasedpassword;
      next();


  } catch (error) {
      return next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
      // use becrypt to compare 
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
  } catch (error) {
      throw error;
  }
}

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
