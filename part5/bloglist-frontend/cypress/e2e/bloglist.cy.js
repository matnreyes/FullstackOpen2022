describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  it('Account can be created and log in', function() {
    cy.get('#username-input')
      .type('testUser')

    cy.get('#password-input')
      .type('password')

    cy.get('#signup-button').click()
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'testUser', password: 'password', name: 'Test User'
      })
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('testUser')
      cy.get('#password-input').type('password')
      cy.get('#login-button').click()

      cy.contains('testUser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('testUsername')
      cy.get('#password-input').type('password1')
      cy.get('#login-button').click()

      cy.contains('invalid username or password').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})