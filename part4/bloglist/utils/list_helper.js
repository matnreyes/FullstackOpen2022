const logger = require('./logger')
const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item

  return (blogs.map((blog) => blog.likes)).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.sort((a, b) => b.likes - a.likes)

  return favorite[0] || null
}

const mostBlogs = (blogs) => {
  const authors = []
  for (let i = 0; i < blogs.length; i++) {
    if (!authors[blogs[i].author]) {
      authors[blogs[i].author] = 1
    } else {
      authors[blogs[i].author] += 1
    }
  }

  const sortedAuthors = authors.sort((a, b) => b[1] - a[1])
  logger.info(sortedAuthors)

  return authors.sort((a, b) => b - a)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
