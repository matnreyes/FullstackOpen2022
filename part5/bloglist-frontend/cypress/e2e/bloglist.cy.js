describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {

  })
})