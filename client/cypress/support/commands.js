Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', 'localhost/api/login', {
    username: username, password: password
  }).then((response) => {
    const user = {
      token: response.body.token,
      username: response.body.username,
      admin: response.body.admin
    }
    localStorage.setItem('loggedUser', JSON.stringify(user))
    cy.visit('localhost')
  })
})

Cypress.Commands.add('admin', ({username}) => {
  cy.request('POST', 'localhost/api/register/admin', {username: username, pass: 'testadminpassword'})
})

const exercises = [
  {name: 'Running', distanceExercise: true, accepted: true},
  {name: 'Squat', weightExercise: true, accepted: true},
  {name: 'Planking', timedExercise: true, accepted: true}
]

Cypress.Commands.add('addExercises', () => {
  const token = JSON.parse(localStorage.loggedUser).token
  exercises.forEach(exercise => cy.request({
    method: 'POST',
    url: 'localhost/api/exercise',
    headers: {'Authorization': 'bearer ' + token},
    body: exercise
  })
  )
})

Cypress.Commands.add('addWorkouts', () => {
  const token = JSON.parse(localStorage.loggedUser).token
  const username = JSON.parse(localStorage.loggedUser).username
  cy.request({method: 'GET', url: 'localhost/api/exercise', body: {username: username}})
    .then((response) => {
      const exercises = response.body
      const workouts = [
        {
          username: username,
          date: '2000-10-10',
          exercises: [{
            name: exercises[0].name,
            exercise: exercises[0].id,
            distance: '10000'
          }]
        },
        {
          username: username,
          date: '2001-09-11',
          exercises: [{
            name: exercises[1].name,
            exercise: exercises[1].id,
            sets: '3',
            repetitions: '10',
            weight: '20'
          }]
        }]
      workouts.forEach(workout => cy.request({
        method: 'POST',
        url: 'localhost/api/workout',
        headers: {'Authorization': 'bearer ' + token},
        body: {exercises: workout.exercises, date: workout.date, username: workout.username}
      }))
    })
})