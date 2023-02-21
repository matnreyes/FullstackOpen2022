import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks'

const NavBar = ({ username }) => {
  const { logout } = useLogin()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
    logout()
  }

  const navBarStyle = {
    backgroundColor: 'grey',
    borderRadius: 3,
    color: 'white',
    padding: 10
  }

  const buttonStyle = {
    padding: 5,
    margin: 5,
    borderRadius: 4,
    background: 'lightBlue',
    borderStyle: 'solid',
    borderColor: 'navy',
    color: 'black'
  }

  return (
    <div style={navBarStyle}>
      <Link to="/" style={buttonStyle}>blogs</Link>
      <Link to="/users" style={buttonStyle}>users</Link>
      { username && <em>{username} logged in <button onClick={handleLogout} style={buttonStyle}>logout</button></em> }
    </div>
  )
}

export default NavBar