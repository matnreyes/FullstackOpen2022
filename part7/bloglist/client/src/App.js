import Notification from './components/Notification'
import Login from './components/Login'
import Blogs from './components/Blog'
import Users from './components/Users'
import { useNotificationValue } from './StateContext'
import { useQueries } from 'react-query'
import { fetchBlogs } from './requests/blogRequests'
import { useLogin } from './hooks'
import { Routes, Route, useMatch, Navigate } from 'react-router-dom'
import { fetchUsers } from './requests/userRequests'
import User from './components/User'

const App = () => {
  const notification = useNotificationValue()
  const { user, logout } = useLogin()
  const match = useMatch('/users/:id')

  const [ blogsQuery, usersQuery ] = useQueries([
    {
      queryKey: 'blogs',
      queryFn: fetchBlogs
    },
    {
      queryKey: 'users',
      queryFn: fetchUsers
    }
  ])

  if (blogsQuery.isLoading || usersQuery.isLoading) {
    return <div>loading...</div>
  }

  const blogs = blogsQuery.data
  const users = usersQuery.data

  const selectedUser = match
    ? users.find(u => u.id === match.params.id)
    : null

  return (

    <div>
      {notification ? <Notification /> : ''}
      <h1>blogs</h1>
      {user.username
        ? <em> {user.username} logged in <button onClick={logout}>logout</button></em>
        : ''
      }
      <Routes>
        <Route path="/" element={user.username ? <Blogs blogs={blogs}/> : <Navigate replace to="/login" />} />
        <Route path="/login/" element={<Login />}/>
        <Route path="/users/" element={<Users />} />
        <Route path="/users/:id" element={<User user={selectedUser}/>} />
      </Routes>
    </div>
  )
}

export default App
