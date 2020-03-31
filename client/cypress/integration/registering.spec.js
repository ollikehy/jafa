describe('Registration ', function () {
  beforeEach(function () {
    cy.request('POST', 'localhost/api/testing/reset')
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
})