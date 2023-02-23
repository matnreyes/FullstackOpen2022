import { useMutation, useQueryClient } from 'react-query'
import { deleteBlog, likeBlog } from '../requests/blogRequests'
import { useNotificationDispatch, useUserValue } from '../StateContext'
import BlogForm from './BlogForm'
import { Link, useNavigate } from 'react-router-dom'
import Comments from './Comments'

export const Blog = ({ blog }) => {
  const navigate = useNavigate()

  if (!blog) {
    setTimeout(() => {
      navigate('/')
    }, 5000)
    console.log('error')
    return (
      <div>
        <h2> blog does not exist </h2>{' '}
      </div>
    )
  }

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
        navigate('/')
      },
      onError: (exception) => {
        setNotification({
          type: 'SET_NOTIFICATION',
          payload: `error: ${exception.response.data.error}`
        })
      }
    })
  }

  const handleLike = () => {
    likeMutation.mutate(blog, {
      onSuccess: (updatedBlog) => {
        const blogs = queryClient.getQueryData('blogs')
        queryClient.setQueryData(
          'blogs',
          blogs
            .map((b) =>
              b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b
            )
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

  const deleteButton = () => {
    return (
      <button className="btn btn-error" onClick={() => handleDelete(blog)}>delete</button>
    )
  }

  return (
    <div className="flex flex-col w-full border-opacity-50">
      <div className='cardContainer flex min-w-full'>
        <div className="card-body">
          <h1 className="card-title">{blog.title} by {blog.author}</h1>
          <div>
            <a href={blog.url} className="link link-primary" rel="noopener">
              {blog.url}
            </a>
            <p>added by {blog.user.username}</p>
            <p>likes: {blog.likes}</p>
            <div className="card-actions justify-start">
              <button className="btn btn-success" id="like-button" onClick={handleLike}>
                like
              </button>
              {user.username === blog.user.username && deleteButton()}
            </div>
          </div>
        </div>
      </div>
      <div className="divider">Comments</div>
      <Comments blogId={blog.id} comments={blog.comments} />
    </div>
  )
}

export const Blogs = ({ blogs }) => {
  return (
    <div>
      <BlogForm />
      <div className="grid">
        {blogs.map((blog) => (
          <div className="cardContainerNeutral shadow-2xl" key={blog.id}>
            <Link to={`/blogs/${blog.id}`} key={blog.id} className="centeredCard btn-ghost">
              <h2 className="card-title">{blog.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
