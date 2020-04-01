describe('Exercises ', function () {
  beforeEach(function () {
    cy.request('POST', 'localhost/api/testing/reset')
    cy.request('POST', 'localhost/api/register', {username: 'testuser', password: 'testpassword'})
    cy.clearLocalStorage()
    cy.login({username: 'testuser', password: 'testpassword'})
    cy.visit('localhost')
  })
  it('Non logged users can visit exercises page', function () {
    cy.contains('Logout').click()
    cy.contains('Exercises').click()
    cy.contains('List of exercises')
  })
  it('Logged users can suggest exercises', function () {
    cy.visit('localhost/exercise')
    cy.contains('Add a new exercise').click()
    cy.contains('Suggest a new exercise type')
    cy.get('#name').type('Running')
    cy.get('#distance').click()
    cy.get('#submitExercise').click()
    cy.contains('Exercise Running suggested succesfully')
  })
  it('Admin users can add exercises', function () {
    cy.admin({username: 'testuser'})
    cy.contains('Logout').click()
    cy.login({username: 'testuser', password: 'testpassword'})
    cy.visit('localhost/exercise/new')
    cy.contains('Add a new exercise type')
    cy.get('#name').type('Dumbell curl')
    cy.get('#weight').click()
    cy.get('#submitExercise').click()
    cy.contains('Exercise Dumbell curl added succesfully')
    cy.visit('localhost/exercise')
    cy.contains('Dumbell curl')
  })
  it('Users can search for exercises', function () {
    cy.admin({username: 'testuser'})
    cy.addExercises()
    cy.visit('localhost/exercise')
    cy.contains('Squat')
    cy.get('#search').type('pla')
    cy.contains('Planking')
    cy.contains('Squat').should('not.exist')
  })
})