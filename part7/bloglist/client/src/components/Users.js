import { useQuery } from 'react-query'
import { fetchUsers } from '../requests/userRequests'
const Users = () => {
  const result = useQuery('users', fetchUsers, {
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div> loading users... </div>
  }

  const users = result.data

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users