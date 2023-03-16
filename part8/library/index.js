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
  Query: {
    bookCount: async () => Book.count(),
    authorCount: async () => Author.count(),
    allBooks: async () => Book.find({}).populate('author'),
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async (root) => Book.find({ author: root.name }).count()
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
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        throw new GraphQLError('Author not found', {
          extentions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author
          }
        })
      }
      author.born = args.setBornTo
      authors = authors.map(a => a.id === author.id ? author : a)
      return author
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