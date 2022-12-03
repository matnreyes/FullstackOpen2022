/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { blogs: 0 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const user = await User.find({})
  const newBlog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user[0]._id
  })

  const author = await User.findById(newBlog.user.toString())
  author.blogs = author.blogs.concat(newBlog._id)
  await author.save()

  const savedBlog = await newBlog.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)

  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedBlog)
})

module.exports = blogsRouter
