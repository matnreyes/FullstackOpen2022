const _ = require('lodash')

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
  const works = _.groupBy(blogs, 'author')
  const authors = Object.keys(works)
  const maxBlogs = Math.max(null, ...(authors.map((author) => works[author].length)))

  return {
    author: authors.find((author) => works[author].length === maxBlogs),
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  const works = _.groupBy(blogs, 'author')
  const authors = Object.keys(works)
  const authorLikes = authors.map((author) => ({
    author,
    likes: works[author].reduce((sum, blog) => blog.likes + sum, 0)
  }))

  return (authorLikes.sort((a, b) => b - a))[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
