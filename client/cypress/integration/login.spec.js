describe('Logging in ', function () {
  beforeEach(function () {
    cy.request('POST', 'localhost/api/testing/reset')
    cy.request('POST', 'localhost/api/register', {username: 'testuser', password: 'testpassword'})
    cy.clearLocalStorage()
    cy.visit('localhost')
  })
  it('User can login to the site', function () {
    cy.contains('Login').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpassword')
    cy.get('#loginButton').click()
    cy.contains('Welcome to JAFA')
  })
  it('User can logout from the site', function () {
    cy.login({username: 'testuser', password: 'testpassword'})
    cy.contains('Logout').click()
  })
  it('User is notified if username or password is wrong', function() {
    cy.visit('localhost/login')
    cy.get('#username').type('testuser')
    cy.get('#password').type('wrongpassword')
    cy.get('#loginButton').click()
    cy.contains('Wrong username or password')
  })
})