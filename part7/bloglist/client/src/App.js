import Notification from './components/Notification'
import Login from './components/Login'
import Blogs from './components/Blog'
import Users from './components/Users'
import { useNotificationValue } from './StateContext'
import { useQuery } from 'react-query'
import { fetchBlogs } from './requests/blogRequests'
import { useLogin } from './hooks'
import { Routes, Route } from 'react-router-dom'

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
      <Routes>
        <Route path="/" element={<Blogs blogs={blogs}/>} />
        <Route path="/login/" element={user && <Login />}/>
        <Route path="/users/" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
