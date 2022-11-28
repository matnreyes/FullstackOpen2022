const blogsRouter = require('express').Router()
const { models } = require('mongoose')
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res, next) => {
  Blog.find({})
    .then((blogs) => {
      res.json(blogs)
    })
    .catch((error) => next(error))
})

blogsRouter.post('/', (req, res, next) => {
  const { body } = req

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog.save()
    .then((returnedBlog) => {
      res.json(returnedBlog)
    })
    .catch((error) => next(error))
})

module.exports = blogsRouter