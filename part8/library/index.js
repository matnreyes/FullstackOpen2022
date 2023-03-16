const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
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
    author: String!
    id: ID!,
    genres: [String]!
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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.genre && !args.author) {
        return books
      }

      if (args.genre && !args.author) {
        return books.filter(b => b.genres.includes(args.genre))
      }

      if (args.author && !args.genre) {
        return books.filter(b => b.author === args.author)
      }
    

      const filteredAuthor = books.filter(b => b.author === args.author)
      const filteredGenre = filteredAuthor.filter(b => b.genres.includes(args.genre))
      return filteredGenre
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => (books.filter(b => b.author === root.name)).length
  },
  Mutation: {
    addBook: (root, args) => {
      if (args.title <= 1 || args.author <= 1) {
        throw new GraphQLError('Value must be longer than 1')
      }
      const book = { ...args, id: uuid()}
      if (!authors.find(a => a.name === book.author)) {
        const author = { name: book.author, id: uuid()}
        authors = authors.concat(author)
      }
      books = books.concat(book)
      return book
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