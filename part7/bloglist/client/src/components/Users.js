import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  console.log(Link, users)
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th>rank</th>
            <th>users</th>
            <th>blogs written</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) =>
            <tr key={index}>
              <th>{index}</th>
              <td>
                <div className="font-bold">
                  {user.username}
                </div>
              </td>
              <td>
                <div className="font-bold">
                  {user.blogs.length}
                </div>
              </td>
              <td>
                <Link className="btn btn-info" to={`/users/${user.id}`}>See all blogs</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
