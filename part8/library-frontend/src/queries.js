import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`

export const ALL_BOOKS = gql`
query ($genre: String) {
  allBooks (genre: $genre) {
    title
    published
    id
    author {
      name
    }
    genres
  }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    id
    born
    name
    bookCount
  }
}
`

export const LOGIN = gql`
mutation Mutation($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const FAVORITE_GENRE = gql`
query {
  me {
    favoriteGenre
  }
}
`