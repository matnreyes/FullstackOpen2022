import { useQueries } from 'react-query'
import { Routes, Route, useMatch, Navigate, useNavigate } from 'react-router-dom'
import { useNotificationValue } from './StateContext'
import Notification from './components/Notification'
import { fetchBlogs } from './requests/blogRequests'
import { fetchUsers } from './requests/userRequests'
import { useLogin } from './hooks'
import Login from './components/Login'
import { Blog, Blogs } from './components/Blog'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const notification = useNotificationValue()
  const navigate = useNavigate()
  const { user, logout } = useLogin()
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  const [ blogsQuery, usersQuery ] = useQueries([
    {
      queryKey: 'blogs',
      queryFn: fetchBlogs,
      refetchOnWindowFocus: false
    },
    {
      queryKey: 'users',
      queryFn: fetchUsers,
      refetchOnWindowFocus: false
    }
  ])

  if (blogsQuery.isLoading || usersQuery.isLoading) {
    return <div>loading...</div>
  }

  const blogs = blogsQuery.data
  const users = usersQuery.data

  const selectedUser = userMatch
    ? users.find(u => u.id === userMatch.params.id)
    : null

  const selectedBlog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null


  const handleLogout = () => {
    navigate('/login')
    logout()
  }

  return (

    <div>
      {notification ? <Notification /> : ''}
      <h1>blogs</h1>
      {user.username
        ? <em> {user.username} logged in <button onClick={handleLogout}>logout</button></em>
        : ''
      }
      <Routes>
        <Route path="/" element={user.username ? <Blogs blogs={blogs}/> : <Navigate replace to="/login" />} />
        <Route path="/login/" element={<Login />}/>
        <Route path="/users/" element={<Users />} />
        <Route path="/users/:id" element={<User user={selectedUser}/>} />
        <Route path="/blogs/:id" element={<Blog blog={selectedBlog} />} />
      </Routes>
    </div>
  )
}

export default App
