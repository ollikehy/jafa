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