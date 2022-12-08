import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(null)

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

    const blogObject = {
      title: '',
      author: '',
      url: ''
    }
    setNewBlog(blogObject)
  }, [])

  const blogObject = {
    title: '',
    author: '',
    url: ''
  }
  
  const BlogForm = () => (
    <>
      <form>
        title: 
        <input
          type='text'
          value={blogObject.title}
          onChange={({ target }) => {
            blogObject.title = target.value
            return blogObject.title
          }}
          name='title'
        />
        author: 
        <input
          type='text'
          value={blogObject.author}
          onChange={({ target }) => {
            blogObject.author = target.value
            return blogObject.author
          }}
          name='author'
        />
        url:
        <input
          type='text'
          value={blogObject.url}
          onChange={({ target }) => {
            blogObject.url = target.value
            return blogObject.url
          }}
          name='url'
        />
      </form>
    </>
  )

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
      <BlogForm />
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
