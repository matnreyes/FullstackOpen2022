import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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
      if(window.confirm(`Delete blog: '${blog.title}'?`)) {
        await blogService.deleteBlog(blog.id)
        const updatedBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(updatedBlogs)
        setNotification(`Succesfully deleted ${blog.title}`)
      }
    } catch (exception) {
      setNotification(`error: ${exception.response.data.error}`)
    }
  }

  const blogFormRef = useRef()

  const sortBlogs = (blog) => {
    const updatedBlogs = blogs.map(b => b === blog.id ? blog : b)
    setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
  }

  const blogDisplay = () => (
    <>
      <h1>blogs</h1>
      <div>
        <p>Logged in as {user.username} 
          <button onClick={() => {
            setUser(null)
            return window.localStorage.removeItem('user')
          }}>Logout</button>
        </p>
      </div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} blogFormRef={blogFormRef}/>
      </Togglable>
      <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} user={user.username} handleDelete={handleDelete} sortBlogs={sortBlogs}/>
        )}
      </div>
    </>
  )

  return (
    <div>
       {notification !== null && 
        <Notification notification={notification} setNotification={setNotification}/>
      }
      {user === null ?
      <Login 
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        setUser={setUser}
        setNotification={setNotification}
      /> :
      blogDisplay()
      }
    </div>
  )
}

export default App
