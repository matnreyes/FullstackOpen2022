import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
 
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
      <h2>blogs</h2>
      <div>
        <p>Logged in as {user.username}</p>
        <button onClick={() => {
          setUser(null)
          return window.localStorage.removeItem('user')
        }}>Logout</button>
      </div>
    
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog}/>
      )}
      <BlogForm blogs={blogs} setBlogs={setBlogs} />
    </>
  )

  return (
    <div>
      {user === null ?
      <Login 
      username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        setUser={setUser}
      /> :
      blogDisplay()
      }
    </div>
  )
}

export default App
