import { Link } from 'react-router-dom'

const User = ({ user }) => {
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-5xl text-primary">{user.username}</h2>
      <h3 className="font-bold text-3xl text-secondary">added blogs</h3>
      <ul className="grid">
        {user.blogs.map((blog) => (
          <div key={blog.id} className="cardContainer">
            <Link to={`/blogs/${blog.id}`} className="card-body btn-ghost">
              <div className="card-title">
                {blog.title}
              </div>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default User
