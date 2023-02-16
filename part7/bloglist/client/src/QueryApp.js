import Notification from './components/Notification'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import { useNotificationValue } from './NotificationContext'
import { useQuery } from 'react-query'
import { fetchBlogs } from './requests'
import { useState } from 'react'

const App = () => {
  const [user, setUser] = useState('')
  const notification = useNotificationValue()

  const result = useQuery('blogs', fetchBlogs)
  if (result.isLoading) {
    return <div> loading... </div>
  }
  const blogs = result.data.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {notification ? <Notification /> : ''}
      {blogs.map((blog, i) => (
        <Blog blog={blog} key={i} user={user}/>
      ))}
      <BlogForm />
      {user ? '' : <Login setUser={setUser}/>}
    </div>
  )
}

export default App
