const express = require('express')
require('dotenv').config()

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/', blogsRouter)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
