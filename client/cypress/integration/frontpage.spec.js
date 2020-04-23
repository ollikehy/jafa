describe('JAFA ', function () {
  beforeEach(function () {
    cy.request('POST', 'localhost/api/testing/reset')
    cy.visit('localhost')
  })
  it('frontpage can be opened', function () {
    cy.contains('Welcome to JAFA')
  })
  it('frontpage can be reached through header title', function () {
    cy.contains('Register').click()
    cy.get('#header-icon').click()
    cy.contains('Welcome to JAFA')
  })
})