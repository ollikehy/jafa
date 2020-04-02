const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = Schema({
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  exercises: [{
    exercise: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true
    },
    sets: {
      type: Number
    },
    repetitions: {
      type: Number
    },
    weight: {
      type: Number
    },
    distance: {
      type: Number
    },
    time: {
      type: Number
    }
  }],
})

workoutSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()

    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Workout', workoutSchema)