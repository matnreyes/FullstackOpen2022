import { useMutation, useQueryClient } from 'react-query'
import { deleteBlog, likeBlog } from '../requests/blogRequests'
import { useNotificationDispatch, useUserValue } from '../StateContext'
import { useToggle } from '../hooks'
import BlogForm from './BlogForm'

const Blog = ({ blog }) => {
  const [expanded, toggleExpand] = useToggle()
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

  const showWhenExpanded = { display: expanded ? '' : 'none' }

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
      <button onClick={toggleExpand}>{expanded ? 'close' : 'expand'}</button>
      <div style={showWhenExpanded} className="moreInfo">
        {blog.url}
        <br />
        likes: {blog.likes}
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

const Blogs = ({ blogs }) => {
  return (
    <div>
      <BlogForm />
      <div>
        {blogs.map((blog, index) => (
          <Blog blog={blog} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Blogs
