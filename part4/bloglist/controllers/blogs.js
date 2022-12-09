/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { tokenExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { blogs: 0 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

blogsRouter.post('/', tokenExtractor, async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { title, author, url, likes } = req.body
  const user = await User.findById(req.user.id)
  const newBlog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', tokenExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() !== req.user.id) {
    return res.status(401).json({ error: 'user does not have permission' })
  }
  const user = await User.findById(req.user.id)
  user.blogs = user.blogs.filter((b) => b !== blog._id.toString())
  await user.save()

  blog.delete()
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = {
    title: req.body.title,
    author: req.body.author,
    likes: req.body.likes,
    url: req.body.url
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.status(200).json(updatedBlog)
})

module.exports = blogsRouter
