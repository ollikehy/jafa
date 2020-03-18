const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  weightExercise: {
    type: Boolean
  },
  distanceExercise: {
    type: Boolean
  },
  timedExercise: {
    type: Boolean
  },
  accepted: {
    type: Boolean,
  }
})

module.exports = mongoose.model('Exercise', schema)