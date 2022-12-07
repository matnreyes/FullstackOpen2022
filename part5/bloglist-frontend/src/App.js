import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'

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
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.login({ username, password })
      // keep user logged in
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      console.log(exception)
    }
  }

  const LogoutButton = () => (
    <button onClick={() => {
      setUser(null)
      return window.localStorage.removeItem('user')
    }}>
      Logout
    </button>
  )

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
          type='text'
          value={username}
          name='username'
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
          type='password'
          value={password}
          name='password'
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogDisplay = () => (
    <>
      <h2>blogs</h2>
      <p>Logged in as {user.username}</p>
      <LogoutButton/>
      {blogs.map(blog => 
        <Blog key={blog.id} blog={blog}/>
      )}
    </>
  )

  return (
    <div>
      {user === null ?
      loginForm() :
      blogDisplay()
      }
    </div>
  )
}

export default App
