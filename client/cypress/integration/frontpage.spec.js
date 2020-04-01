describe('JAFA ', function () {
  beforeEach(function () {
    cy.request('POST', 'localhost/api/testing/reset')
  })
  it('frontpage can be opened', function () {
    cy.visit('localhost')
    cy.contains('Welcome to JAFA')
  })
  it('frontpage can be reached through header title', function () {
    cy.visit('localhost')
    cy.contains('Register').click()
    cy.contains('Just Another Fitness App').click()
    cy.contains('Welcome to JAFA')
  })
})