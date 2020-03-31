describe('JAFA ', function() {
  it('frontpage can be opened', function() {
    cy.visit('localhost')
    cy.contains('Welcome to JAFA')
  })
})