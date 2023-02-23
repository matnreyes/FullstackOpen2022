import { useNotificationDispatch } from '../StateContext'
import { useField, useLogin } from '../hooks'
import { useMutation } from 'react-query'
import { sendUser } from '../requests/userRequests'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useLogin()
  const userMutation = useMutation(sendUser)
  const { resetValue: resetUsername, ...username } = useField('text')
  const { resetValue: resetPassword, ...password } = useField('password')
  const navigate = useNavigate()

  const notificationDispatch = useNotificationDispatch()

  const setErrorNotification = (error) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `error ${error.response.data.error}`
    })
  }

  const handleLogin = (event) => {
    event.preventDefault()
    const userInfo = {
      username: username.value,
      password: password.value
    }

    userMutation.mutate(
      { url: '/api/login', user: userInfo },
      {
        onSuccess: (userSession) => {
          login(userSession)
          notificationDispatch({
            type: 'SET_NOTIFICATION',
            payload: `${username.value} logged in`
          })
          navigate('/')
        },
        onError: (e) => setErrorNotification(e)
      }
    )
  }

  const handleNewUser = async (event) => {
    event.preventDefault()
    const userInfo = {
      username: username.value,
      password: password.value
    }
    userMutation.mutate(
      { url: '/api/users', user: userInfo },
      {
        onSuccess: () => {
          notificationDispatch({
            type: 'SET_NOTIFICATION',
            payload: `${username.value} has been added`
          })
          resetUsername()
          resetPassword()
        },
        onError: (e) => setErrorNotification(e)
      }
    )
  }

  return (
    <div className="grid">

      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <h2 className="card-title justify-center">log in to application</h2>
        <form className="card-body"
          onSubmit={(event) =>
            event.nativeEvent.submitter.value === 'login'
              ? handleLogin(event)
              : handleNewUser(event)
          }
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input {...username} placeholder="username" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input {...password} placeholder="password" className="input input-bordered" />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" value="login">Login</button>
          </div>
          <div className="form-control">
            <button className="btn btn-primary" value="signup">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
