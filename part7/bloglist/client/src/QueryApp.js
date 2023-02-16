import Notification from './components/Notification'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import { useNotificationValue } from './NotificationContext'
import { useQuery } from 'react-query'
import { fetchBlogs } from './requests/blogRequests'
import { useLogin } from './hooks'

const App = () => {
  const notification = useNotificationValue()
  const { user } = useLogin()

  const result = useQuery('blogs', fetchBlogs, {
    refetchOnWindowFocus: false
  })
  if (result.isLoading) {
    return <div> loading... </div>
  }
  const blogs = result.data.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {notification ? <Notification /> : ''}
      {blogs.map((blog, i) => (
        <Blog blog={blog} key={i}/>
      ))}
      <BlogForm />
      {!user.username &&  <Login /> }
    </div>
  )
}

export default App
