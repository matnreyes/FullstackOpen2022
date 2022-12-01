const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/api/blogs', async (req, res) => {
  const newBlog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  })

  const savedBlog = await newBlog.save()

  res.status(201).json(savedBlog)
})

module.exports = blogsRouter
