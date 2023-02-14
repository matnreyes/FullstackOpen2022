import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

const BlogForm = ({ blogs, setBlogs, blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const setNotification = useNotificationDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.postBlog({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification({
        type: 'SET_NOTIFICATION',
        payload: 'Blog succesfully added'
      })
    } catch (exception) {
      setNotification({
        type: 'SET_NOTIFICATION',
        payload: `error: ${exception.response.data.error}`
      })
    }
  }

  const formStyle = {
    backgroundColor: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 2,
    padding: 8,
    width: 200
  }
  return (
    <div style={formStyle}>
      <h3>add blog</h3>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <br />
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <br />
          <input
            type="text"
            name="author"
            placeholder="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <br />
          <input
            type="text"
            name="url"
            placeholder="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogFormRef: PropTypes.object.isRequired
}

export default BlogForm
