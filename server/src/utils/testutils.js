const bcrypt = require('bcryptjs')
const Exercise = require('../models/Exercise')

const users = [
  {username: 'johnnydoe', password: 'password123'},
  {username: 'usr', password: 'short'},
  {username: 'johndoe', password: 'hunter2345', admin: true},
  {username: 'admintest', pass: 'hackerman'}
]

const cryptPassword = async (user) => {
  const hashed = await bcrypt.hash(user.password, 10)
  return {username: user.username, password: hashed, admin: user.admin ? true : false}
}

const initialExercises = [
  {name: 'Dumbell curl', weightExercise: true, accepted: true},
  {name: 'Running', distanceExercise: true, accepted: true},
  {name: 'Squat', weightExercise: true, accepted: true},
  {name: 'Pull up', weightExercise: true, accepted: false},
  {name: 'Bench press', weightExercise: true, accepted: false}
]

const initializeExercises = async () => {
  await initialExercises.forEach(async (e) => {
    await new Exercise(e).save()
  })
}

const exercisesInDb = async () => {
  const exercises = await Exercise.find()
  return exercises
}

const newWorkout = async () => {
  const exercises = await exercisesInDb()
  const workout = {
    username: users[0].username,
    date: new Date(),
    exercises: [
      {
        name: exercises[1].name,
        exercise: exercises[1]._id,
        sets: '3',
        repetitions: '10',
        weight: '20'
      },
      {
        name: exercises[0].name,
        exercise: exercises[0]._id,
        distance: '10000'
      }
    ]
  }
  return workout
}

module.exports = {
  users,
  cryptPassword,
  initialExercises,
  initializeExercises,
  exercisesInDb,
  newWorkout
}