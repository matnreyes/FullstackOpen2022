import userService from '../services/users'
import blogService from '../services/blogs'
import { useNotificationDispatch } from '../NotificationContext'

const Login = ({
  username,
  password,
  setUsername,
  setPassword,
  setUser
}) => {
  const notificationDispatch = useNotificationDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))

      setUsername('')
      setPassword('')
      setUser(user)
      blogService.setToken(user.token)
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `${user.username} logged in` })
    } catch (exception) {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `error: ${exception.response.data.error}` })
    }
  }

  const handleNewUser = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.newUser({ username, password })
      setUsername('')
      setPassword('')
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `${user.username} has been created` })
    } catch (exception) {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `error: ${exception.data.error}` })
    }
  }
  return (
    <div>
      <h2>log in to application</h2>
      <form
        onSubmit={(event) =>
          event.nativeEvent.submitter.value === 'login'
            ? handleLogin(event)
            : handleNewUser(event)
        }
      >
        <div>
          username
          <input
            id="username-input"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit" value="login">
          login
        </button>
        <button id="signup-button" type="submit" value="newuser">
          create account
        </button>
      </form>
    </div>
  )
}

export default Login
