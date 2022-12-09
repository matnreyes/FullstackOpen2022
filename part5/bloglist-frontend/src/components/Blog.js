import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog}) => {
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
  }

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
      </div>
    </div>
  )
}

export default Blog