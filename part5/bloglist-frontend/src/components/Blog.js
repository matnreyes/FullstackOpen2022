import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog , user, setNotification, setBlogs, blogs }) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    width: 500,
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpand = () => {
    setExpanded(!expanded)
  }

  const handleLike = () => {
    blog.likes += 1
    setLikes(blog.likes)
    blogService.updateBlog(blog)
    const newBlogs = blogs.map(n => n.id === blog.id ? blog : n)
    setBlogs(newBlogs.sort((a, b) => b.likes = a.likes))
  }

  const deleteButton = () => { 
    const handleDelete = async () => {
      try {
        if(window.confirm(`Delete blog: '${blog.title}'?`)) {
          await blogService.deleteBlog(blog.id)
          setNotification(`Succesfully deleted ${blog.title}`)
        }
      } catch (exception) {
        setNotification(`error: ${exception.response.data.error}`)
      }
    }
    return (
      <button onClick={handleDelete}>delete</button>
  )}

  return (
    <div style={blogStyle}>
      "{blog.title}" by {blog.author}
      <button onClick={toggleExpand}>{expanded ? 'close' : 'expand'}</button>
      <div style={showWhenExpanded}>
        {blog.url}
        <br/>
        likes: {likes}
        <button onClick={handleLike}>like</button>
        <br/>
        added by: {blog.user.username}
        <br/>
        {user === blog.user.username && deleteButton() }
      </div>
    </div>
  )
}

export default Blog