const mongoose = require('mongoose');

// Create the schema for the candidate
const candidateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  party: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: [18, 'Age must be at least 18']
  },
  votes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the 'User' model
      required: true
    },
    votedAt: {
      type: Date,
      default: Date.now
    }
  }],
  voteCount: {
    type: Number,
    default: 0,
    min: [0, 'Vote count cannot be negative']
  }
});

// Create the model from the schema
const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
