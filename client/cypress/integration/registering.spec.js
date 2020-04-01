describe('Registration ', function () {
  beforeEach(function () {
    cy.request('POST', 'localhost/api/testing/reset')
    cy.clearLocalStorage()
    cy.visit('localhost')
  })
  it('Registration page can be visited', function () {
    cy.contains('Register').click()
  })
  it('User can register for JAFA', function () {
    cy.contains('Register').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('#confirmPass').type('testpassword')
    cy.get('#registerButton').click()
    cy.contains('Welcome to JAFA')
    cy.contains('Registration succesful!')
  })
  it('User is notified if username is taken', function() {
    cy.request('POST', 'localhost/api/register', {username: 'testuser', password: 'testpassword'})
    cy.visit('localhost/register')
    cy.get('#username').type('testuser')
    cy.get('#password').type('randompassword')
    cy.get('#confirmPass').type('randompassword')
    cy.get('#registerButton').click()
    cy.contains('Username is already taken')
  })
})