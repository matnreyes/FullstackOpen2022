/* eslint-disable no-undef */
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const resolvers = {
  Author: {
    bookCount: async (root) => Book.find({ author: root.id }).count()
  },
  Query: {
    bookCount: async () => Book.count(),
    authorCount: async () => Author.count(),
    allBooks: async (root, args) => { 
      const books = await Book.find({}).populate('author')
      if (Object.keys(args).length === 0) {
        return books
      }

      if (Object.keys(args).length === 1) {
        if (args.author) {
          return books.filter(b => b.author.name === args.author)
        }
        if (args.genre) {
          return books.filter(b => b.genres.includes(args.genre))
        }
      }

      return books.filter(b => b.genres.includes(args.genre) && b.author.name === args.author)
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Mutation: {
    createUser: async (root, args) => {
      const findUser = await User.findOne({ username: args.username})
      if (findUser) {
        throw new GraphQLError('Username must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidargs: args.username
          }
        })
      }

      const user = new User({ ...args })
      return user.save()
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw new GraphQLError('Invalid login')
      }

      const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET)

      return { value: token }
    },
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('User must sign in')
      }
      try {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          const book = new Book({ ...args, author: author })
          return book.save()
        }
        const newAuthor = new Author({ name: args.author })
        await newAuthor.save()
        const book = new Book({ ...args, author: newAuthor })
        return book.save()
      } catch (error) {
        throw new GraphQLError('Invalid input', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidargs: args.name,
            error
          }
        })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('User must be signed in')
      }

      const author = await Author
        .findOne({ name: args.name })
        .catch((error) => {
          throw new GraphQLError('No author found', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidargs: args.name,
              error
            }
          })
        })
      author.born = args.setBornTo
      return author.save()
    }
  }
}

module.exports = resolvers