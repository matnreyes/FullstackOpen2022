const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
mongoose.set('strictQuery', false)
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('Connecting to ', MONGODB_URI)
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.log(error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Book { 
    title: String!
    published: Int!
    author: Author!
    id: ID!,
    genres: [String!]!
  }
  
  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

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
    allAuthors: async () => Author.find({})
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      console.log(author)
      if (author) {
        const book = new Book({ ...args, author: author })
        return book.save()
      }
      const newAuthor = new Author({ name: args.author })
      await newAuthor.save()
      const book = new Book({ ...args, author: newAuthor })
      return book.save()
    },
    editAuthor: async (root, args) => {
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

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})