import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks'

const NavBar = ({ username }) => {
  const { logout } = useLogin()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
    logout()
  }

  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          blogslist
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/users">
              users
            </Link>
          </li>
          {username
            ? (
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost normal-case">{username}</label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-primary">
                  <li><a>Posts</a></li>
                  <li><a onClick={handleLogout}>logout</a></li>
                </ul>
              </div>
            )
            : (
              <li>
                <Link to="/login">
                  login
                </Link>
              </li>
            )
          }
        </ul>
      </div>
    </div>
  )
}

export default NavBar
