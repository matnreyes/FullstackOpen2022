import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog , user, handleDelete, sortBlogs }) => {
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
    sortBlogs(blog)

  }

  const deleteButton = () => (
    <button onClick={() => handleDelete(blog)}>delete</button>
  )

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
        {user === blog.user.username && deleteButton()}
      </div>
    </div>
  )
}

Blog.propTypes =  {
  blog: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  sortBlogs: PropTypes.func.isRequired
}

export default Blog