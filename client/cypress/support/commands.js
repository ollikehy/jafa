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

Cypress.Commands.add('addExercises', () => {
  const exercises = [
    {name: 'Running', distanceExercise: true, accepted: true},
    {name: 'Squat', weightExercise: true, accepted: true},
    {name: 'Planking', timedExercise: true, accepted: true}
  ]
  const token = JSON.parse(localStorage.loggedUser).token
  exercises.forEach(exercise => cy.request({
    method: 'POST',
    url: 'localhost/api/exercise',
    headers: {'Authorization': 'bearer ' + token},
    body: exercise
  })
  )
})