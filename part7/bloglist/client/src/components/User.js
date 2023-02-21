const User = ({ user }) => {
  console.log(user)
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li> )}
      </ul>
    </div>
  )
}

export default User