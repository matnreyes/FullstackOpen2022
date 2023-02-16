import userService from '../services/users'
import { useNotificationDispatch } from '../NotificationContext'
import { useField } from '../hooks'
import { setToken } from '../requests'

const Login = ({ setUser }) => {
  const username = useField('text')
  const password = useField('password')


  const notificationDispatch = useNotificationDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.login({ username: username.value, password: password.value })
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setToken(user.token)
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `${user.username} logged in`
      })
    } catch (exception) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `error: ${exception.response.data.error}`
      })
    }
  }

  const handleNewUser = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.newUser({ username: username.value, password: password.value })
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `${user.username} has been created`
      })
    } catch (exception) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `error: ${exception.data.error}`
      })
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
          <input {...username}/>
        </div>
        <div>
          password
          <input {...password}/>
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
