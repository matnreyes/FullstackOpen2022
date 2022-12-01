const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/api/blogs', (req, res, next) => {
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
