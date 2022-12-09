import { useState, useEffect } from 'react'
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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedIn = JSON.parse(window.localStorage.getItem('user'))
    if (loggedIn) {
      setUser(loggedIn)
      blogService.setToken(loggedIn.token)
    }
  }, [])

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
      <Togglable buttonLabel='new blog'>
        <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}/>
      </Togglable>
      <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog}/>
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
