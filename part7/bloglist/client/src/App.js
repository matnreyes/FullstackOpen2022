import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import {
  useNotificationDispatch,
  useNotificationValue
} from './NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const setNotification = useNotificationDispatch()

  useEffect(() => {
    const loggedIn = JSON.parse(window.localStorage.getItem('user'))
    if (loggedIn) {
      setUser(loggedIn)
      blogService.setToken(loggedIn.token)
    }

    const fetchBlogs = async () => {
      const returnedBlogs = await blogService.getAll()
      returnedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(returnedBlogs)
    }

    fetchBlogs()
  }, [])

  const handleDelete = async (blog) => {
    try {
      if (window.confirm(`Delete blog: '${blog.title}'?`)) {
        await blogService.deleteBlog(blog.id)
        const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
        setBlogs(updatedBlogs)
        setNotification({
          type: 'SET_NOTIFICATION',
          payload: `Succesfully deleted ${blog.title}`
        })
      }
    } catch (exception) {
      console.log(exception)
      setNotification({
        type: 'SET_NOTIFICATION',
        payload: `error: ${exception.response.data.error}`
      })
    }
  }

  const blogFormRef = useRef()

  const sortBlogs = (blog) => {
    const updatedBlogs = blogs.map((b) => (b === blog.id ? blog : b))
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const blogDisplay = () => (
    <>
      <h1>blogs</h1>
      <div>
        <p>
          Logged in as {user.username}
          <button
            onClick={() => {
              setUser(null)
              return window.localStorage.removeItem('user')
            }}
          >
            Logout
          </button>
        </p>
      </div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm blogs={blogs} setBlogs={setBlogs} blogFormRef={blogFormRef} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user.username}
            handleDelete={handleDelete}
            sortBlogs={sortBlogs}
          />
        ))}
      </div>
    </>
  )

  return (
    <div>
      {useNotificationValue() !== null && <Notification />}
      {user === null ? (
        <Login
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
        />
      ) : (
        blogDisplay()
      )}
    </div>
  )
}

export default App
