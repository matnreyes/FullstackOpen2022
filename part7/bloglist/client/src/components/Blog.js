import { useMutation, useQueryClient } from 'react-query'
import { deleteBlog, likeBlog } from '../requests/blogRequests'
import { useNotificationDispatch, useUserValue } from '../StateContext'
import BlogForm from './BlogForm'
import { useNavigate, Link } from 'react-router-dom'

export const Blog = ({ blog }) => {
  const navigate = useNavigate()
  const user = useUserValue()

  const setNotification = useNotificationDispatch()
  const queryClient = useQueryClient()
  const deleteMutation = useMutation(deleteBlog)
  const likeMutation = useMutation(likeBlog)

  const handleDelete = () => {
    if (!window.confirm(`Delete ${blog.title}?`)) {
      return
    }

    deleteMutation.mutate(blog.id, {
      onSuccess: () => {
        const blogs = queryClient.getQueryData('blogs')
        queryClient.setQueryData(
          'blogs',
          blogs.filter((n) => n.id !== blog.id)
        )
        setNotification({ type: 'SET_NOTIFICATION', payload: 'Deleted blog' })
      },
      onError: (exception) => {
        setNotification({
          type: 'SET_NOTIFICATION',
          payload: `error: ${exception.response.data.error}`
        })
      }
    })
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    width: 500,
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    likeMutation.mutate(blog, {
      onSuccess: (updatedBlog) => {
        const blogs = queryClient.getQueryData('blogs')
        queryClient.setQueryData(
          'blogs',
          blogs
            .map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
            .sort((a, b) => b.likes - a.likes)
        )
        setNotification({
          type: 'SET_NOTIFICATION',
          payload: `Liked ${blog.title}`
        })
      },
      onError: () => {
        setNotification({ type: 'SET_NOTIFICATION', payload: 'Error occurred' })
      }
    })
  }

  const deleteButton = () => (
    <button onClick={() => handleDelete(blog)}>delete</button>
  )

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={() => navigate(`/blogs/${blog.id}`)}>open</button>
      <div className="moreInfo">
        {blog.url}
        <br />
        likes: {blog.likes}
        <button id="like-button" onClick={handleLike}>
          like
        </button>
        <br />
        added by {blog.user.name}
        <br />
        {user.username === blog.user.username && deleteButton()}
      </div>
    </div>
  )
}

export const Blogs = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    width: 500,
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <BlogForm />
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
