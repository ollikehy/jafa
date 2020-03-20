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

schema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()

    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Exercise', schema)