import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'
import { deleteBlog } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'


const Blog = ({ blog, user }) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const setNotification = useNotificationDispatch()
  const queryClient = useQueryClient()
  const deleteMutation = useMutation(deleteBlog)

  const handleDelete = () => {
    if (!window.confirm(`Delete ${blog.title}?`)) {
      return
    }

    deleteMutation.mutate(blog.id, {
      onSuccess: () => {
        const blogs = queryClient.getQueryData('blogs')
        queryClient.setQueryData('blogs', blogs.filter(n => n.id !== blog.id))
      },
      onError: (exception) => {
        setNotification({ type: 'SET_NOTIFICATION', payload: `error: ${exception.response.data.error}` })
      }
    })
  }

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

  const deleteButton = () => (
    <button onClick={() => handleDelete(blog)}>delete</button>
  )

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={toggleExpand}>{expanded ? 'close' : 'expand'}</button>
      <div style={showWhenExpanded} className="moreInfo">
        {blog.url}
        <br />
        likes: {likes}
        <button id="like-button" onClick={handleLike}>
          like
        </button>
        <br />
        added by: {blog.user.username}
        <br />
        {user.username === blog.user.username && deleteButton()}
      </div>
    </div>
  )
}

export default Blog
