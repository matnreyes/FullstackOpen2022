describe('Blog app', function() {
  beforeEach(function() {
    cy.cleanup()
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
      cy.cleanup()
      cy.signup({ username: 'testUser', password: 'password', name: 'Test User' })
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
      cy.cleanup()
      const otherUser = {
        username: 'testUser1',
        password: 'password',
        name: 'Test User 1'
      }
      cy.signup(otherUser)
      cy.login(otherUser)

      const otherBlog = {
        title: 'Other Blog',
        author: 'Other Author',
        url: 'otherurl.com'
      }
      cy.addBlog(otherBlog)

      const user = {
        username: 'testUser',
        password: 'password',
        name: 'Test User'
      }

      cy.signup(user)
      cy.login(user)

      const blog = {
        title: 'Test blog',
        author: 'Test Author',
        url: 'testurl.com'
      }
      cy.addBlog(blog)

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

    it('user can like blog', function() {
      cy.contains('Test blog')
        .should('contain', 'likes: 0')
        .as('theBlog')

      cy.get('@theBlog')
        .contains('expand')
        .click()

      cy.get('@theBlog')
        .contains('like')
        .click()

      cy.contains('likes: 1')
    })

    describe('user can delete', function() {
      it('blog they wrote', function() {
        cy.contains('Test blog')
          .contains('expand')
          .click()

        cy.contains('delete')
          .click()

        cy.contains('Succesfully deleted Test blog')
          .should('have.css', 'color', 'rgb(0, 128, 0)')
      })

      it('user can only delete blog they posted', function() {
        cy.contains('expand')
          .click()

        cy.contains('Other Blog')
          .should('not.contain', 'delete')
      })
    })
  })

  describe('Blogs', function() {
    beforeEach(function() {
      const blogs = [
        {
          title: 'blog0',
          author: 'test author',
          url: 'testurl3',
          likes: 33
        },
        {
          title: 'blog1',
          author: 'test author',
          url: 'testurl4',
          likes: 200
        },
        {
          title: 'blog2',
          author: 'test author',
          url: 'testurl3',
          likes: 13
        },
        {
          title: 'blog3',
          author: 'test author',
          url: 'testurl3',
          likes: 13
        }
      ]

      const user = {
        username: 'testUser',
        password: 'password',
        name: 'Test User'
      }

      cy.signup(user)
      cy.login(user)
      blogs.forEach(blog => {
        cy.addBlog(blog)
      })
      cy.visit('http://localhost:3000')
    })

    it('are ordered by descending likes', function() {
      cy.get('.blog').eq(0).should('contain', 'blog1')
      cy.get('.blog').eq(1).should('contain', 'blog0')
      cy.get('.blog').eq(2).should('contain', 'blog2')
      cy.get('.blog').eq(3).as('lastBlog')

      cy.get('@lastBlog')
        .should('contain', 'blog3')
        .contains('expand').click()
      cy.get('@lastBlog').contains('like').click()

      cy.get('.blog').eq(2).should('contain', 'blog3')
      cy.get('.blog').eq(3).should('contain', 'blog2')
    })
  })
})