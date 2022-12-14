import userService from '../services/users'

const Login = ({ username, password, setUsername, setPassword, setUser, setNotification }) => {
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))

      setUsername('')
      setPassword('')
      setUser(user)
      setNotification(`${user.username} logged in`)
    } catch (exception) {
      setNotification(`error: ${exception.response.data.error}`)
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login