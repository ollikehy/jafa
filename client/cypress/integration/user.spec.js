describe('Userprofile functions ', function () {
  beforeEach(function () {
    cy.request('POST', 'localhost/api/testing/reset')
    cy.request('POST', 'localhost/api/register', {username: 'testuser', password: 'testpassword'})
    cy.clearLocalStorage()
    cy.login({username: 'testuser', password: 'testpassword'})
    cy.visit('localhost')
  })
  it('User can visit its homepage', function() {
    cy.contains('Profile').click()
    cy.contains('Your profile')
    cy.get('.userprofile-profile')
  })
  it('User can update its information', function() {
    cy.visit('localhost/profile')
    cy.contains('Edit your information').click()
    cy.get('#height').type(180)
    cy.get('#weight').type(80)
    cy.get('#profileSubmit').click()
    cy.contains('User updated succesfully')
    cy.contains('24.69')
  })
})