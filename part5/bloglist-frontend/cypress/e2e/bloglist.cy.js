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

  describe('When logged in', function() {
    beforeEach(function() {
      const user = {
        username: 'testUser',
        password: 'password',
        name: 'Test User'
      }

      cy.signup(user)

      cy.login(user)
      cy.visit('http://localhost:3000')
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.contains('title').type('Test blog')
      cy.contains('author').type('Brian Griffin')
      cy.contains('url').type('fakeblog.com')
      cy.contains('submit').click()

      cy.contains('Blog succesfully added').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Test blog by Brian Griffin')
    })
  })
})