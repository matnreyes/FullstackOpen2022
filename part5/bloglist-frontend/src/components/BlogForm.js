import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.postBlog({ title, author, url})
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification('Blog succesfully added')
    } catch (exception) {
      setNotification(`error: ${exception.response.data.error}`)
    }
  }

  const formStyle = {
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 2,
    padding: 8,
    width: '20%',
}
  return (
    <div style={formStyle}>
      <h3>add blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title: 
          <input 
            type='text'
            name='title'
            value= {title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input 
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input 
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>submit</button> 
      </form>
    </div>
  )
}

export default BlogForm