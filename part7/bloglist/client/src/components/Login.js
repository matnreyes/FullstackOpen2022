import { useNotificationDispatch } from '../StateContext'
import { useField, useLogin } from '../hooks'
import {  useMutation } from 'react-query'
import { sendUser } from '../requests/userRequests'


const Login = () => {
  const { login } = useLogin()
  const userMutation = useMutation(sendUser)
  const username = useField('text')
  const password = useField('password')

  const notificationDispatch = useNotificationDispatch()

  const setErrorNotification = (error) => {
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: `error ${error.response.data.error}` })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    const userInfo = {
      username: username.value,
      password: password.value
    }

    userMutation.mutate({ url: '/api/login', user: userInfo }, {
      onSuccess: (userSession) => {
        console.log(userSession)
        login(userSession)
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: `${username.value} logged in` })
      },
      onError: (e) => setErrorNotification(e)
    })
  }

  const handleNewUser = async (event) => {
    event.preventDefault()
    const userInfo = {
      username: username.value,
      password: password.value
    }
    userMutation.mutate({ url: '/api/users', user: userInfo }, {
      onSuccess: () => {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: `${username.value} has been added` })
      },
      onError: (e) => setErrorNotification(e)
    })
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
